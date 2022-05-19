import React from 'react';
import momentTime from 'moment';
import CryptoJS from 'crypto-js';

import {API_URL} from './config';
const secretKey = API_URL.SECRET_KEY;
/**
 * Checks if a valid string;
 * @param val: number/string/object/array != (undefined or null)
 */
export const validValue = (val) =>
  typeof val !== 'undefined' && val !== undefined && val !== null;
/**
 * Checks if a valid string
 * @param str: string
 */
export const strictValidString = (str) => !!str && typeof str === 'string';

/**
 * Checks if a valid string and validate with min length.
 * @param str: string
 */
export const strictValidStringWithMinLength = (str, length = 1) =>
  !!str && typeof str === 'string' && str.length >= length;

/**
 * Checks if a valid array
 * @param arr: array
 */
export const strictValidArray = (arr) => arr && Array.isArray(arr);

/**
 * Typecast or converts forcefully a string, an object or an array to string else returns null
 * @param str: string
 */
export const typeCastToString = (str) =>
  (!!str &&
    ((strictValidString(str) && str) ||
      str.toString() ||
      JSON.stringify(str))) ||
  '';
/**
 * Checks if a valid object
 * @param obj: object
 */
export const strictValidObject = (obj) =>
  obj &&
  obj === Object(obj) &&
  Object.prototype.toString.call(obj) !== '[object Array]';

/**
 * Checks if a valid array with length
 * @param arr: array
 */
export const strictValidArrayWithLength = (arr) =>
  strictValidArray(arr) && !!arr.length;
/**
 * Checks if a valid object with keys
 * @param obj: object
 */
export const strictValidObjectWithKeys = (obj) =>
  strictValidObject(obj) && !!Object.keys(obj).length;

/**
 * Checks if a valid object with specified keys
 * @param obj: object
 * @param parameterKeys: array
 */
export const validObjectWithParameterKeys = (obj, parameterKeys = []) =>
  strictValidObjectWithKeys(obj) &&
  strictValidArrayWithLength(parameterKeys) &&
  Object.keys(obj).filter((k) => parameterKeys.indexOf(k) > -1).length ===
    parameterKeys.length;

/**
 * Capitalizes the first letter of every word in string but not word after apostrophe
 * @param str: string
 */
export const titleCase = (str = '') => {
  if (!strictValidString(str)) {
    return null;
  }
  const strArr = str.toLowerCase().split(' ');
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
  }
  return strArr.join(' ');
};

export const validAlert = (alert) =>
  validObjectWithParameterKeys(alert, ['message', 'type']) &&
  validValue(alert.message) &&
  validValue(alert.type);

/**
 * Checks if given value is strictly a number
 * @param num: number
 */
export const strictValidNumber = (num) =>
  validValue(num) && typeof num === 'number';

/**
 * Checks if a valid array with minimum specified length
 * @param arr: array
 * @param minLength: integer
 */
export const strictValidArrayWithMinLength = (arr, minLength) =>
  strictValidArray(arr) && arr.length >= minLength;

/**
 * Generates a regular expression from a given list of regular expressions
 * @param regExpList: array of regular expression strings
 */
export const concatenateRegularExpressions = (regExpList = []) => {
  let regExp = new RegExp();
  if (strictValidArrayWithLength(regExpList)) {
    try {
      regExp = new RegExp(regExpList.join(''));
    } catch (error) {
      // Do nothing
    }
  }
  return regExp;
};

/**
 * Gets file extension
 * @param fileName: string
 */
export const getFileExtension = (fileName) =>
  (strictValidString(fileName) &&
    fileName.substring(fileName.lastIndexOf('.'), fileName.length)) ||
  '';

/**
 * Typecasts a key value pair (k, v) to string and appends it to or appends a specified string value to it
 * based on appendAfter boolean variable
 * @param k: string
 * @param v: string
 * @param appendString: string
 * @param appendAfter: boolean
 */
export const addKeyValuePairAsString = (
  k,
  v,
  appendString = '',
  appendAfter = true,
) => {
  let str = '';
  if (!appendAfter) {
    str += typeCastToString(appendString);
  }
  if (validValue(v)) {
    if (['string', 'number', 'boolean'].indexOf(typeof v) > -1) {
      str = `${k}: ${typeCastToString(v)}`;
    } else if (strictValidArrayWithLength(v)) {
      str = `${k}: [${v.join(', ')}]`;
    } else {
      str = `${k}: [${JSON.stringify(v)}]`;
    }
  } else {
    str = `${k}: `;
  }
  if (appendAfter) {
    str += typeCastToString(appendString);
  }
  return str;
};

/**
 * Typecasts an immutable reducer object to its actual values
 * @param immutableObject: object
 */
export const typeCastToKeyValueObject = (immutableObject) =>
  (strictValidObject(immutableObject) &&
    immutableObject instanceof Map &&
    immutableObject.toJSON()) ||
  (strictValidObject(immutableObject) &&
    validObjectWithParameterKeys(immutableObject, ['size', '_root']) &&
    immutableObject.toJSON()) ||
  (strictValidObject(immutableObject) && immutableObject) ||
  (!strictValidObject(immutableObject) &&
    validValue(immutableObject) &&
    immutableObject);

/**
 * Imports all files in a directory
 * @param importedObj: object
 */
export const importImagesFromImageDirectory = (importedObj) => {
  const filesObj = {};
  importedObj.keys().forEach((file) => {
    filesObj[file.replace('./', '')] = importedObj(file);
  });
  return filesObj;
};

/**
 * Remove null or undefined key value pairs from an object
 * @param obj: object
 * @param removeEmptyArray: bool
 */
export const removeInValidKeyValuePairs = (obj, removeEmptyArray) => {
  const res = {};
  if (strictValidObjectWithKeys(obj)) {
    Object.values(obj).forEach((v, k) => {
      if (
        (validValue(v) && !strictValidArray(v)) ||
        strictValidArrayWithLength(v) ||
        (removeEmptyArray && strictValidArrayWithLength(v))
      ) {
        res[Object.keys(obj)[k]] = v;
      }
    });
  }
  return res;
};

/**
 * Formatting number for thousand seperator
 *
 */
// export const formatNumberWithCurrency = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
//   minimumFractionDigits: 2,
// });

/**
 * Converts integer to double digit example 9 -> 09, 12 -> 12, 992 -> 992
 * @param integer: string
 */
export const integerToDoubleDigit = (integer) =>
  (strictValidNumber(integer) && `0${integer}`.slice(-2)) || '00';

/**
 * Typecast response from api to specified type, default string
 * @param object: string or object containing key: string
 * @param key: string in object
 * @param type: string
 * @param defaultValue: any
 */
export const typeCastResponse = (
  object,
  key,
  type = 'string',
  defaultValue = null,
) => {
  let response = null;
  switch (type) {
    default:
      break;
    case 'number':
      response =
        (validObjectWithParameterKeys(object, [key]) && Number(object[key])) ||
        defaultValue ||
        0;
      break;
    case 'string':
      response =
        (validObjectWithParameterKeys(object, [key]) &&
          typeCastToString(object[key])) ||
        defaultValue ||
        null;
      break;
    case 'object':
      response =
        (validObjectWithParameterKeys(object, [key]) &&
          strictValidObject(object[key]) &&
          object[key]) ||
        defaultValue ||
        {};
      break;
    case 'array':
      response =
        (validObjectWithParameterKeys(object, [key]) &&
          strictValidArray(object[key]) &&
          object[key]) ||
        defaultValue ||
        [];
      break;
  }
  return response;
};
export const _sortDataByName = (data) => {
  return data.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

export const formatDuration = (duration) => {
  const zero = '0';
  let hh;
  let mm;
  let ss;
  const time = new Date(0, 0, 0, 0, 0, Math.floor(duration), 0);

  hh = time.getHours();
  mm = time.getMinutes();
  ss = time.getSeconds();

  // Pad zero values to 00
  hh = (zero + hh).slice(-2);
  mm = (zero + mm).slice(-2);
  ss = (zero + ss).slice(-2);

  return hh === '00' ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`;
};

// export const Alerts = (message, description, color, duration) => {
//   showMessage({
//     message,
//     description,
//     type: 'success',
//     backgroundColor: color || '#3F51B5', // background color
//     color: '#fff', // text color
//     duration: duration || 1800,
//   });
// };
export const formatDateTime = (time, format = 'MM/DD/YY HHmm') => {
  const timeFormat = momentTime(time).format(format);
  return timeFormat;
};
export const formatDate = (time, format = 'MM/DD/YY') => {
  const timeFormat = momentTime(time).format(format);
  return timeFormat;
};
export const formatDOB = (time, format = 'MM/DD/YYYY') => {
  const timeFormat = momentTime(time).format(format);
  return timeFormat;
};
export const formatTime = (time, format = 'HHmm') => {
  const timeFormat = momentTime(time).format(format);
  return timeFormat;
};
const sampleDecrypt = () => {
  const data =
    'U2FsdGVkX1/ZsoNl4ZvnntXgXba8MFyBRPjPj67zbSMYikjNdSOSfC2Dpa2AOso7bP+ax4xQjKC95MOprCGyN8M1q4n53iNHBmXwzT8I0sNaifw0kmDNEOXttQh2U6vhoEoKWPbkiX1cx2DIXT0Etxd132aUTUvYzpFxPnGjqs1YaoILzw0djlWSw+ey0uIIRszFtLDcPlBrVHIxNmgduqC0ulEmhJLdvMVgNlGwZP6Ty4PnJBwAvpuH3M1T5fXhgNdRBjHzYVkocu3FLVgtQ2SzpEyUcyRkK9W6+H4dAkDlO/1vy3BBs05fGshvi1wzHYpu+DHjN7+esx/m371OdPDGSSYkQNzCy1rFB/I0O9aysZ0I/p+/9DZZhl3WVq6Yhayb8+IcCUtxnXwW5wi9Yhj8PRRwGh2vpF9/zip8C5DPQpAa+MVZHjK5mQKoZVoXIwMlCuRJF0uSLQUkeU+UVO3tccweQk4uPo6tYYgU0TIZKCJaeYK5RU9GqoLQUeJgdyIwLXEGNnKn6zYe6/6WtIvXAIjb8vZJLpCwsH+C6I/PVT3mHew5cBrj/Z2ypqHNakWSXTggLApFJ6fB1J5dTIgThCL1hx+fr9ju9Nmf29sWpihyA9whAFDj2nZUkH2MWoKk1Rqp3e1D32EVvXFJ8oNjyOJJOiWgXlUqcuXlM0q3j9Havp00M0Sict0EMl5O7rUo9VRQjcUYD1rBSSGq3V4iLb0ndnz9JugIHc6KUx4DrA+wbyhjgokrUJNORjQl7q5fQRSZljrLMLtZc0mNrK6wLd+1clMGZnUp6sVicWQ6L1DvF3TckjSpa4uUO9soDp3bO86rny6UC6lshBlVFlhKh/o0L230miwZ58x7GyLF5JBnV6vmlcwRW+jZDbYv';
  var bytes = CryptoJS.AES.decrypt(data, secretKey);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  const parsed = JSON.parse(originalText);
  console.log('parsed ciphertext: ', parsed);
};
export const decrypted = (data) => {
  // sampleDecrypt();
  var bytes = CryptoJS.AES.decrypt(data, secretKey);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  const parsed = JSON.parse(originalText);
  console.log('parsed ciphertext: ', parsed);
  return parsed;
};

export const encrypted = (data) => {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey,
  ).toString();
  const jsonData = {encrypt: ciphertext};
  console.log('ciphertext: ', ciphertext);
  return jsonData;
};
