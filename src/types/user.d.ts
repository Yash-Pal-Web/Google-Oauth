export interface IRepository {
  //updateOneWithInstance(loggedUser: any): unknown;
  create: (data: any) => any;
  findOne: (data: any) => any;
  //updateOne: (data: any, data: any) => any;
}
export interface IARepository {
  findAdmin: (data: any) => any;
}

export interface UserController {
  createUser: controllerFunction;
  loginUser: controllerFunction;
  updateUser: controllerFunction;
  getUser: controllerFunction;
  verifyEmail: controllerFunction;
}

export interface IUserBody {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  
  password: string;
  birthday:Date;
}

export interface ILoginUserBody {
  email: string;
  password: string;
}

export interface IVerifyUserBody {
  token: string;
}

export interface IGoogle2faBody {
  token: string;
  jwtToken: string;
}
export interface IGetGoogle2faBody {
  id: string;
  email: string;
}
export interface IPagination {
  page?: number;
  limit?: number;
  search?: string;
}
