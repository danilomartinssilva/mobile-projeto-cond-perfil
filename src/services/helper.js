import {parseISO, differenceInYears} from 'date-fns';
import {parseDate} from '../components/DatePicker';
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const getProfile = (profile) => {
  return !!profile.data && profile.data.roles.length
    ? profile.data.roles[0].name
    : '';
};

export const funInitial = (string) =>
  string
    .split(' ')
    .slice(0, 2)
    .map((letter) => letter.charAt(0))
    .join('')
    .toUpperCase();

/**
 * @description Ordenar uma lista por LocaleCompare.
 * @param {array} items
 * @param {string} [value]
 * @returns {array} Array contendo a lista em ordem alfabética ordenado pelo value.
 */
export const sortByLocaleCompare = (items, value) => {
  var collection = [].concat(items);
  if (value) {
    return collection.sort((a, b) => a[value].localeCompare(b[value]));
  }
  return collection.sort((a, b) => a.localeCompare(b));
};

export const pickerFilterData = (data, value = null, label) => {
  return data.map((item, index) => {
    if (!value) {
      return {
        value: index,
        label: item[label],
      };
    } else {
      return {
        value: item[value],
        label: item[label],
      };
    }
  });
};

export const isNil = (value) => {
  return value === undefined || value === null;
};

export const isNumber = (value) => {
  if (typeof value === 'number') {
    return value - value === 0;
  }
  if (typeof num === 'string' && value.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+value) : isFinite(+value);
  }
  return false;
};

export const splitter = (label) => {
  if (label.length > 18) {
    var newString = label.slice(0, 16);
    newString += '...';
    return newString;
  } else {
    return label;
  }
};

export const verifyIfMp4Extension = (video_id) => {
  return video_id.indexOf('.mp4') > -1 ? video_id : video_id + '.mp4';
};

export const getImageContentType = (itemName) => {
  itemName = String(itemName).toString().toLowerCase();

  if (itemName.indexOf('png') > -1) {
    return 'image/png';
  } else if (itemName.indexOf('mp4') > -1) {
    return 'video/mp4';
  } else if (itemName.indexOf('gif') > -1) {
    return 'image/gif';
  } else if (itemName.indexOf('mov') > -1) {
    return 'video/quicktime';
  } else if (itemName.indexOf('jpg') > -1 || itemName.indexOf('jpeg') > -1) {
    return 'image/jpeg';
  } else if (itemName.indexOf('wepb') > -1) {
    return 'image/webp';
  }
};
export const getImageExtension = (imageName) => {
  return imageName.split('.')[1];
};
export const padLeft = (text, size) => {
  var s = String(text);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
};

export const firstWord = (text) => {
  var words = text.split(' ');
  return words[0];
};

export const formatNumber = (
  amount,
  decimalCount = 2,
  decimal = ',',
  thousands = '.',
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
};
export const handleValidationAge = (age) => {
  return differenceInYears(new Date(), parseDate(age));
};

export const removeSpecialChars = (s) => {
  if (s) {
    let retorno = s
      .normalize('NFD')
      .replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');

    retorno = retorno.normalize('NFD').replace(/[´`~^'ºª°]/g, '');
    retorno = retorno.normalize('NFD').replace(/ /g, '_');

    return retorno;
  }

  return '';
};

export const removerAcentos = (s) => {
  if (s && s !== undefined && s !== 'undefined') {
    let text = s.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    text = text.replace(/[´`~^'ºª°]/g, '');
    text = text.replace(/ /g, '_');

    return text;
  }

  return s;
};

export const URL_HOST = 'https://tratorweb.com.br';
