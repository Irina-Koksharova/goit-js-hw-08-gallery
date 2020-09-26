import images from './gallery-items.js';

const refs = {
  containerGallery: document.querySelector('.js-gallery'),
  backdrop: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  originalImage: document.querySelector('.lightbox__image'),
  buttonClose: document.querySelector('[data-action="close-lightbox"]'),
};

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
         <li class="gallery__item">
           <a
             class="gallery__link"
             href="${original}"
           >
           <img
             class="gallery__image"
             src="${preview}"
             data-source="${original}"
             alt="${description}"
           />
           </a>
         </li>
        `;
    })
    .join('');
}
const galleryMarkup = createGalleryMarkup(images);
refs.containerGallery.insertAdjacentHTML('beforeend', galleryMarkup);

function onGalleryImageClickOpenSlider(evt) {
  window.addEventListener('keydown', onEscKeyPressCloseSlider);
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  evt.preventDefault();
  refs.backdrop.classList.add('is-open');
  refs.originalImage.setAttribute('src', evt.target.dataset.source);
  refs.originalImage.setAttribute('alt', evt.target.getAttribute('alt'));
}
refs.containerGallery.addEventListener('click', onGalleryImageClickOpenSlider);

function onGalleryImageClickCloseSlider(evt) {
  window.removeEventListener('keydown', onEscKeyPressCloseSlider);
  refs.backdrop.classList.remove('is-open');
  refs.originalImage.setAttribute('src', '');
  refs.originalImage.setAttribute('alt', '');
}
refs.buttonClose.addEventListener('click', onGalleryImageClickCloseSlider);

function onBackdropClickCloseSlider(evt) {
  if (evt.target === refs.overlay) {
    onGalleryImageClickCloseSlider();
  }
}
refs.backdrop.addEventListener('click', onBackdropClickCloseSlider);

function onEscKeyPressCloseSlider(evt) {
  if (evt.code === 'Escape') {
    onGalleryImageClickCloseSlider();
  }
}
