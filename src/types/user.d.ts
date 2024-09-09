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
  tournament_name:string;
  creator_name:string;
  
 
}

export interface IRoomBody {
  turnament_id:string;
  roomName: string;
  tournament: string;
}
export interface IRoomJoinBody{
  roomId:string;
  playerName:string;
  room: string
}
interface IScoreBody {
  playerId: number;
  score: number; 
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
