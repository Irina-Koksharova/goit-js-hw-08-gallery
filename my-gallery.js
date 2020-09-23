import refs from './gallery-items.js';

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
         <li class="gallery__item">
           <a
             class="gallery__link"
             href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
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

const galleryMarkup = createGalleryMarkup(refs);
const containerGallery = document.querySelector('.js-gallery');
containerGallery.insertAdjacentHTML('beforeend', galleryMarkup);
