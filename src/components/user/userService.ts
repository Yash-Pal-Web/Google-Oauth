import { IUserBody, IRepository, ILoginUserBody } from "../../types/user";
import { HttpStatusCode, UserMessages } from "../../utils/constant";

import { AuthenticationError, BadRequest } from "../../error";

import { comparePassword } from "../../utils/helper";
import userRepository from "./userRepository";
import logger from "../../utils/logger";

import { generateJwt } from "../../utils/jwt";

class UserService {
  private repository: IRepository;

  constructor() {
    this.repository = userRepository;
  }
  async createUser(userdata: IUserBody) {
    const existingUser = await this.repository.findOne({
      email: userdata.email,
    });
    if (existingUser) {
      throw new BadRequest(
        UserMessages.ALREADY_EXISTS,
        true,
        HttpStatusCode.BAD_REQUEST
      );
    }
    const newUser = await this.repository.create(userdata);

    return newUser;
  }

  async loginUser(userdata: ILoginUserBody) {
    const loggedUser = await this.repository.findOne({ email: userdata.email });
    if (!loggedUser) {
      throw new BadRequest(
        UserMessages.NOT_REGISTERED,
        true,
        HttpStatusCode.NOT_FOUND
      );
    }

    if (!userdata.password || !loggedUser.password) {
      throw new BadRequest(
        "Password not provided",
        true,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const passwordMatch: boolean = await comparePassword(
      userdata.password,
      loggedUser.password
    );
    if (!passwordMatch) {
      throw new AuthenticationError(
        UserMessages.LOGIN_ERROR,
        true,
        HttpStatusCode.UN_AUTHORIZED
      );
    }

    const token: string = await generateJwt({
      id: loggedUser.user_id,
      email: loggedUser.email,
      accessType: "login",
    });
    return {
      id: loggedUser?.user_id,
      // email: loggedUser?.email,
      token: token,
    };
  }

  // update user

  async updateUser(userdata: any) {
    try {
      const result = await userRepository.updateUser(userdata);
      if(!result || result.length ===0){
        throw new BadRequest(UserMessages.NOT_FOUND)
      }
      return result;
    } catch (error: any) {
      logger.error(error);
    }
  }

  async getUserById(userId: any) {
    try {
      // Attempt to retrieve the user by ID
      const result = await userRepository.getUserById(userId);

      // Check if the result is an empty array or undefined
      if (!result || result.length === 0) {
        // Log that the user was not found
        logger.info(`User with ID ${userId} not found`);

        // Throw a BadRequest error or any custom error you have defined
        throw new BadRequest(`User not found`);
      }

      // Log the successful retrieval of the user
      logger.info(`User retrieved: ${JSON.stringify(result)}`);

      // Return the retrieved user
      return result;
    } catch (error: any) {
      // Log any errors encountered during the process
      logger.error(`Error retrieving user with ID ${userId}: ${error.message}`);

      // Optionally, you can rethrow the error to be handled by a higher-level error handler
      throw error;
    }
  }

  // delete user
  async deleteUserById(userId: any) {
    try {
      const result = await userRepository.deleteUserById(userId);
      if (!result || result.length === 0) {
        // Log that the user was not found
        logger.info(`User with ID ${userId} not found`);

        // Throw a BadRequest error or any custom error you have defined
        throw new BadRequest(`User not found`);
      }

      return result;
    } catch (error: any) {
      logger.error(error);
    }
  }

  // show  all user
  async getAllUser(page: any, limit: any, searchText: any) {
    const result = await userRepository.getAllUser(page, limit, searchText);
    return result;
  }
}

export default new UserService();
