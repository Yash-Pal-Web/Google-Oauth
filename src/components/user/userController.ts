import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utils/response";
import { userServices as UserService } from "./index";
import { UserMessages } from "../../utils/constant";
import {
  IUserBody,
  IRoomBody,
  IRoomJoinBody,
  IScoreBody
} from "../../types/user";
import { AuthenticationError, BadRequest } from "../../error";


class User {
  /**
   * @function createUser
   * @description For creating new tournament
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Yashpal
   */
  async  createTournament(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        tournament_name,creator_name
      }: IUserBody = req.body;

      const userdetails: IUserBody = {
        tournament_name,
        creator_name,
        
      };
      const newUser = await UserService.createTournament(userdetails);
      return successResponse(res, newUser, UserMessages.REGISTER_SUCCESS);
    } catch (error: unknown) {
      if (error instanceof BadRequest || error instanceof AuthenticationError) {
        return errorResponse(res, error, error.statusCode, error.message);
      }
      next(error);
    }
  }

  /**
   * @function createUser
   * @description For creating room
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Yashpal
   */
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        roomName,tournament,turnament_id
      }: IRoomBody = req.body;

      const roomdetails: IRoomBody = {
        turnament_id,
        roomName,
        tournament
      };
      const newUser = await UserService.createRoom(roomdetails);
      return successResponse(res, newUser, UserMessages.REGISTER_SUCCESS);
    } catch (error: unknown) {
      if (error instanceof BadRequest || error instanceof AuthenticationError) {
        return errorResponse(res, error, error.statusCode, error.message);
      }
      next(error);
    }
  }

  /**
   * @function createUser
   * @description For creating new join room
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Yashpal
   */
  async joinRoom(req: Request, res: Response, next: NextFunction){
    try {
      const {
        roomId,playerName, room
      }: IRoomJoinBody = req.body;

      const joinroomdetails: IRoomJoinBody = {
        roomId,
        playerName,
        room
      };
      const newUser = await UserService.joinRoom(joinroomdetails);
      return successResponse(res, newUser, UserMessages.REGISTER_SUCCESS);
    } catch (error: unknown) {
      if (error instanceof BadRequest || error instanceof AuthenticationError) {
        return errorResponse(res, error, error.statusCode, error.message);
      }
      next(error);
    }
  }

  /**
   * @function createUser
   * @description For creating player score
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Yashpal
   */

  async savePlayerScore(req: Request, res: Response, next: NextFunction){
    try {
      const {
        playerId,
        score
      }: IScoreBody = req.body;

      const scoredetails: IScoreBody = {
        playerId,
        score
      };
      const newUser = await UserService.savePlayerScore(scoredetails);
      return successResponse(res, newUser, UserMessages.REGISTER_SUCCESS);
    } catch (error: unknown) {
      if (error instanceof BadRequest || error instanceof AuthenticationError) {
        return errorResponse(res, error, error.statusCode, error.message);
      }
      next(error);
    }

  }

   /**
   * @function updateuser
   * @description For update
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Yash Pal
   */
  async  updateWinner(req: Request, res: Response, next: NextFunction){
    try {
      const { roomId,winnerName } =
        req.body;

      const result = await UserService.updateUser({
        roomId,
        winnerName
      });
      return successResponse(res, result, UserMessages.UPDATE_SUCCESS);
    } catch (error: unknown) {
      
      if (error instanceof BadRequest || error instanceof AuthenticationError) {
        return errorResponse(res, error, error.statusCode, error.message);
      }
      next(error);
    
    }

  }
 
  // hr@abhiwan.com

}

export default new User();
