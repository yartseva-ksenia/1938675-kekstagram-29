import {getMockedPhotos} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = getMockedPhotos();

const pictureListFragment = document.createDocumentFragment();

pictures.forEach(({description, comments, likes, url}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');
  imageElement.src = url;
  imageElement.alt = description;

  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureListFragment.appendChild(pictureElement);
});

pictureList.appendChild(pictureListFragment);
