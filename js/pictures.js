import {getMockedPhotos} from './data.js';

const pictureList = document.querySelector('.pictures');//нашла элемент, в который надо вставить фото
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');//нашла шаблон для фото

const pictures = getMockedPhotos();

const pictureListFragment = document.createDocumentFragment();

pictures.forEach(({description, comments, likes, url}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__img').src = url;
  pictureList.appendChild(pictureElement);
});

pictureList.appendChild(pictureListFragment);
