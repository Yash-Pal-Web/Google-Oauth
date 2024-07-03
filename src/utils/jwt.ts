import config from '../config/env';
import { BadRequest } from '../error';
import { JwtOptions, jwtPayload } from '../types/jwt';
import { HttpStatusCode, UserMessages } from './constant';
import logger from './logger';
import jwt from 'jsonwebtoken';

const options: JwtOptions = {
  register: {
    expiresIn: '5m',
  },
  login: {
    expiresIn: '1h',
  },
  google2Fa: {
    expiresIn: '1h',
  },
  forgot: {
    expiresIn: '1h',
  },
};
const generateJwt = async (payload: jwtPayload): Promise<string> => {
  return jwt.sign(payload, config.secret, { ...options[payload.accessType] });
};

const verifyJwt = async (accessType: string, accessToken: string): Promise<object> => {
  const tokenData: any = jwt.verify(accessToken, config.secret);
  if (tokenData.accessType != accessType) {
    throw new BadRequest(UserMessages.INVALID_TOKEN, true, HttpStatusCode.FORBIDDEN);
  }

  return tokenData;
};

export { generateJwt, verifyJwt };
