//import CryptoJS from 'crypto-js';
import config from '../config/env';
import { BadRequest } from '../error';
import INVALID_ENCRYPTION from '../utils/constant';
import bcrypt from 'bcrypt';

// const encrypt = (data: string) => {
//   const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), config.secret);
//   return { data: ciphertext.toString() };
// };

// const decrypt = (ciphertext: string) => {
//   try {
//     const bytes = CryptoJS.AES.decrypt(ciphertext, config.secret);
//     const originalText = bytes.toString(CryptoJS.enc.Utf8);
//     return JSON.parse(originalText);
//   } catch (error) {
//     throw new BadRequest(INVALID_ENCRYPTION.INVALID_ENCRYPTION, true);
//   }
// };

const generatePassword = async (plainPassword?: string): Promise<string> => {
  if (plainPassword) {
    return bcrypt.hashSync(plainPassword, config.SALT_FACTOR);
  } else {
    return '2334554312';
  }
};

const comparePassword = async (plainPassword: string, encrypedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, encrypedPassword);
};

const getDateTimeWithAddHours = function (hours: number) {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
};
const currentUTCDateTime = function () {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

export {  comparePassword, generatePassword, getDateTimeWithAddHours, currentUTCDateTime };
