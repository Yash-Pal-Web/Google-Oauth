import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../utils/response";
import { userServices as UserService } from "./index";
import { UserMessages } from "../../utils/constant";
import {
  IUserBody,
  ILoginUserBody,
  IVerifyUserBody,
  IGoogle2faBody,
} from "../../types/user";
import { BadRequest } from "../../error";
import logger from "../../utils/logger";
import config from "../../config/env";

class User {
  /**
   * @function createUser
   * @description For creating new user
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        password,
        birthday,
      }: IUserBody = req.body;

      const userdetails: IUserBody = {
        first_name,
        last_name,
        email,
        phone,
        birthday,
        password,
      };
      const newUser = await UserService.createUser(userdetails);
      return successResponse(res, newUser, UserMessages.REGISTER_SUCCESS);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @function loginuser
   * @description For creating new user
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: ILoginUserBody = req.body;

      const userCredentials: ILoginUserBody = {
        email,
        password,
      };
      const loggedUser = await UserService.loginUser(userCredentials);
      return successResponse(res, loggedUser, UserMessages.LOGIN_SUCCESS);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @function updateuser
   * @description For creating new user
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { first_name, last_name, email, phone, user_id, birthday } =
        req.body;

      const result = await UserService.updateUser({
        first_name,
        last_name,
        email,
        phone,
        user_id,
        birthday,
      });
      return successResponse(res, result, UserMessages.UPDATE_SUCCESS);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @function getuser
   * @description For creating new user
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.user_id;

      if (!userId) throw new BadRequest(UserMessages.USER_ID_REQUIRED);
      const result = await UserService.getUserById(userId);
      return successResponse(res, result, "Success");
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @function deleteUser
   * @description For creating new user
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      if (!userId) throw new BadRequest(UserMessages.USER_ID_REQUIRED);
      const result = await UserService.deleteUserById(userId);
      return successResponse(res, result, "Success");
    } catch (error: unknown) {
      next(error);
    }
  }
  // show all user
   /**
   * @function showallusers
   * @description For creating new user
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      
      const page = (req.query.page || 1) as number;
      const limit = (req.query.limit || 10) as number;
      const searchText = req.query?.search as string;

      const userData = await UserService.getAllUser(page, limit, searchText);

      // return successResponse(res, { userData: userData.data, count: userData.count }, 'success');
      return successResponse(res, userData, 'success');
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default new User();
