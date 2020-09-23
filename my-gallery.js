import refs from './gallery-items.js';

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

const containerGalleryEl = document.querySelector('.js-gallery');
const galleryMarkupEl = createGalleryMarkup(refs);
containerGalleryEl.insertAdjacentHTML('beforeend', galleryMarkupEl);

function onGalleryImageClick(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  evt.target.closest('.gallery__link').setAttribute('href', '#');
  backdropEl.classList.add('is-open');
  originalImageEl.setAttribute('src', evt.target.dataset.source);
  originalImageEl.setAttribute('alt', evt.target.getAttribute('alt'));
}

const originalImageEl = document.querySelector('.lightbox__image');
const backdropEl = document.querySelector('.js-lightbox');
containerGalleryEl.addEventListener('click', onGalleryImageClick);
