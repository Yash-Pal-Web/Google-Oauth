export default {
  SERVER_ERROR_MESSAGE: 'Something went wrong.',
  INVALID_LOGIN_DETAILS: 'Invalid email or password.',
  USER_NOTFOUND_ERROR: 'User not found with provided details',
  INVALID_ENCRYPTION: 'Invalid ecrypted request',
};

export class CommonMessages {
  public static readonly API_RATE_LIMIT_ERROR = 'Exceeded api request limit';
  // eslint-disable-next-line prettier/prettier
  public static readonly ERROR = 'Oop\'s somthing went worng please try again';
  public static readonly WELCOME = 'Welcome to backend server!';
  public static readonly ADMIN_WELCOME = 'Welcome to admin panel server!';
  public static readonly CAPTCHA_REQUIRED = 'Please verify captcha first';
  public static readonly CAPTCHA_INVALID = 'Invalid captcha';
}

export class TransactionMessages {
  public static readonly INVALID_ENDPOINT = 'Invaild request. EndPoint Does not exits';
  public static readonly DUPLICATE_REQUEST = 'Duplicate request';
  public static readonly BLOCKCHAIN_ERROR = 'Got Web hook but Failed fetching data from blockchain!!.';
}

export class WalletMessages {
  public static readonly WALLET_NOT_FOUND = 'Wallet noit found';
}

export class UserMessages {
  public static readonly ACCESS_DENIED = 'Access denied';
  public static readonly REGISTER_SUCCESS = 'Your registration has been completed successfully';
  public static readonly INVALID_ID = 'Invalid id';
  public static readonly USER_ID_REQUIRED = 'User id is required';
  public static readonly USER_UPDATE_SUCCESS = 'User data updated successfully';
  public static readonly USER_FOUND_SUCCESS = 'User data found';
  public static readonly INVALID_EMAIL = 'Invalid email';
  public static readonly ACCOUNT_REQUIRED = 'Accounts is required';
  public static readonly UPDATE_SUCCESS = 'Update successfully';

  public static readonly NOT_REGISTERED = 'User not registered.';
  public static readonly ALREADY_EXISTS = 'User already exists';
  public static readonly NOT_FOUND = 'Data not found';
  public static readonly FOUND_SUCCESS = 'Data found';
  public static readonly FETCH_SUCCESS = 'Fetched successfully.';
  public static readonly LOGIN_ERROR = 'Invalid credentials';
  public static readonly LOGIN_SUCCESS = 'Login success';
  public static readonly EMAIL_NOT_VERIFIED = 'Email not verified';
  public static readonly USER_NOT_ACTIVE = 'User is not active';
  public static readonly INVALID_PAGE = 'Page number can not be less than one.';
  public static readonly INVALID_URL = 'Url not valid';
  public static readonly EMAIL_VERIFIED = 'Email verified successfully';
  public static readonly EXCEED_LOGIN = 'You entered wrong credentials too many times';
  public static readonly EMAIL_ALREADY_VERIFIED = 'Email already verified';
  public static readonly INVALID_TOKEN = 'Invalid token';

}

export class HttpStatusCode {
  public static readonly SUCCESSFUL = 200;
  public static readonly BAD_REQUEST = 400;
  public static readonly UN_AUTHORIZED = 401;
  public static readonly FORBIDDEN = 403;
  public static readonly NOT_FOUND = 404;
  public static readonly INTERNAL_SERVER_ERROR = 500;
  public static readonly ALREADY_EXISTS = 409;
  public static readonly RATE_LIMIT = 429;
}
