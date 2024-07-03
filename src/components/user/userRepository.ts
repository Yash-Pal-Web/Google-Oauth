import { IUserBody, IRepository } from "../../types/user";
import { Account } from "./userModel";
import dbService from "../../bootstrap/dbService";
import { HttpStatusCode, UserMessages } from "../../utils/constant";
import { Repository } from "typeorm";
import { generatePassword } from "../../utils/helper";
import { BadRequest } from "../../error";
import logger from "../../utils/logger";

class UserRepository implements IRepository {
  private userRepository: Repository<Account>;

  constructor() {
    this.userRepository = dbService.AppDataSource.getRepository(Account);
  }
  async create(data: IUserBody) {
    const { first_name, last_name, email, phone, password, birthday } = data;
    const encryptedPassword = await generatePassword(password);
    // Create an instance of the User entity and populate it with data
    const user = new Account();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.phone = phone;
    user.birthday = birthday;
    user.password = encryptedPassword;

    await this.userRepository.save(user);
    delete user.password;
    // Return the saved user object
    return user;
  }

  async findOne(condition: object) {
    const user = await this.userRepository.findOne({ where: condition });
    logger.info(user)
    
    return user;
  }

  // update user
  
  async updateUser(userdata: any) {
    
    if (userdata) {
        const query = `
            UPDATE account 
            SET 
                first_name = $1, 
                last_name = $2, 
                phone = $3,
                email = $4, 
                birthday = $5
            WHERE 
                user_id = $6
            RETURNING *;
        `;
        const values = [
            userdata.first_name, 
            userdata.last_name, 
            userdata.email, 
            userdata.phone,
            userdata.birthday, 
            userdata.user_id
        ];
        
        const updatedUser = await dbService.AppDataSource.query(query, values);
        return updatedUser[0];
    }
}
// rread user
async getUserById(userId: string) {
  const query = `
      SELECT 
          user_id, 
          email, 
          first_name, 
          phone, 
          birthday 
      FROM "account" 
      WHERE user_id = $1
  `;
  const values = [userId];
  const userData = await dbService.AppDataSource.query(query, values);
  return userData;
}
// delete user
async deleteUserById(userId: string) {
  const query = `
      DELETE FROM "account" 
      WHERE user_id = $1
      RETURNING user_id, email, first_name, phone, birthday;
  `;
  const values = [userId];
  const deletedUserData = await dbService.AppDataSource.query(query, values);
  return deletedUserData;
}


// show all user
async getAllUser(page: number, limit: number, searchText: string) {
  const skip = (page - 1) * limit;
  
  // Build the base query to retrieve paginated data
  let query = `
      SELECT * 
      FROM "account"
  `;
 const result = await dbService.AppDataSource.query(query)
 
 return result;
}


}

export default new UserRepository();
