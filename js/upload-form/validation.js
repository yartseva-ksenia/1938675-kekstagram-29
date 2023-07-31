import { form } from './form-elements.js';
import { showErrorMessage, showSuccessMessage } from './success-error-messages.js';

const hashtagRegex = /^#(?![\s])[a-z0-9а-яё]{2,19}$/i;

export const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

let hashtagsError = '';

const validateHashtags = (value) => {
  const hashtags = value.trim().toLocaleLowerCase().split(' ');

  // Проверка на количество хэштегов
  if (hashtags.length > 5) {
    hashtagsError = 'Превышено количество хэш-тегов';
    return false;
  }

  // Проверка на уникальность хэштегов
  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    hashtagsError = 'Хэш-теги повторяются';
    return false;
  }

  return hashtags.every((hashtag) => {
    if (!hashtagRegex.test(hashtag)) {
      hashtagsError = 'Введен невалидный хэш-тег';
      return false;
    }

    return true;
  });
};

pristine.addValidator(form.hashtags, validateHashtags, () => hashtagsError);

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(
        'https://29.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ).then(() => {
        onSuccess();
        showSuccessMessage();
      }).catch(() => {
        showErrorMessage();
      });
    }
  });
};

export {setUserFormSubmit};
