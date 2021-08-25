import jwt from 'jsonwebtoken'
import config from '../../config/config';

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, config.privateKey, options);
}

export function decode(token: string) {
  return jwt.verify(token, config.privateKey);
}
