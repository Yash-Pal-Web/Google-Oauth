enum tokenAccessTypes {
  register = 'REGISTER',
  login = 'LOGIN',

}
interface JwtOptions {
  [key: string]: {
    expiresIn: string;
  };
}

interface jwtPayload {
  accessType: string;
  id?: string;
  email: string;
}

export { JwtOptions, tokenAccessTypes, jwtPayload };
