import images from './gallery-items.js';

const refs = {
  containerGallery: document.querySelector('.js-gallery'),
  backdrop: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  originalImage: document.querySelector('.lightbox__image'),
  buttonClose: document.querySelector('[data-action="close-lightbox"]'),
  buttonPrev: document.querySelector('[data-action="prev-image"]'),
  buttonNext: document.querySelector('[data-action="next-image"]'),
};

function createGalleryMarkup(images) {
  return images
    .map(image => {
      return `
         <li class="gallery__item">
           <a
             class="gallery__link"
             href="${image.original}"
           >
           <img id="${images.indexOf(image)}"
             class="gallery__image"
             src="${image.preview}"
             data-source="${image.original}"
             alt="${image.description}"
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
  window.addEventListener('keydown', onNextKeyPressCloseSlider);
  window.addEventListener('keydown', onPrevKeyPressCloseSlider);
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  evt.preventDefault();
  refs.backdrop.classList.add('is-open');
  refs.originalImage.id = evt.target.id;
  refs.originalImage.setAttribute('src', evt.target.dataset.source);
  refs.originalImage.setAttribute('alt', evt.target.alt);
}

refs.containerGallery.addEventListener('click', onGalleryImageClickOpenSlider);

function onGalleryImageClickCloseSlider(evt) {
  window.removeEventListener('keydown', onEscKeyPressCloseSlider);
  window.removeEventListener('keydown', onNextKeyPressCloseSlider);
  window.removeEventListener('keydown', onPrevKeyPressCloseSlider);
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

const imagesGallery = document.querySelectorAll('.gallery__image');

function onButtonNextClick(evt) {
  const currentImage = Number(refs.originalImage.id);
  if (
    refs.originalImage.id >= 0 &&
    refs.originalImage.id < imagesGallery.length - 1
  ) {
    refs.originalImage.setAttribute(
      'src',
      imagesGallery[currentImage + 1].dataset.source,
    );
    refs.originalImage.id = currentImage + 1;
    refs.originalImage.setAttribute('alt', imagesGallery[currentImage + 1].alt);
  } else {
    refs.originalImage.setAttribute('src', imagesGallery[0].dataset.source);
    refs.originalImage.id = 0;
    refs.originalImage.setAttribute('alt', imagesGallery[0].alt);
  }
}
refs.buttonNext.addEventListener('click', onButtonNextClick);

function onNextKeyPressCloseSlider(evt) {
  if (evt.code === 'ArrowRight') {
    onButtonNextClick();
  }
}

function onButtonPrevClick(evt) {
  const currentImage = Number(refs.originalImage.id);
  if (
    refs.originalImage.id > 0 &&
    refs.originalImage.id <= imagesGallery.length - 1
  ) {
    refs.originalImage.setAttribute(
      'src',
      imagesGallery[currentImage - 1].dataset.source,
    );
    refs.originalImage.id = currentImage - 1;
    refs.originalImage.setAttribute('alt', imagesGallery[currentImage - 1].alt);
  } else {
    refs.originalImage.setAttribute(
      'src',
      imagesGallery[imagesGallery.length - 1].dataset.source,
    );
    refs.originalImage.id = imagesGallery.length - 1;
    refs.originalImage.setAttribute(
      'alt',
      imagesGallery[imagesGallery.length - 1].alt,
    );
  }
}
refs.buttonPrev.addEventListener('click', onButtonPrevClick);

function onPrevKeyPressCloseSlider(evt) {
  if (evt.code === 'ArrowLeft') {
    onButtonPrevClick();
  }
}
