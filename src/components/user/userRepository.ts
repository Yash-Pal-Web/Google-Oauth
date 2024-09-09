import { IUserBody, IRepository } from "../../types/user";
import { Turnament } from "./turnamentModel";
import dbService from "../../bootstrap/dbService";

class UserRepository {


  async create(data: IUserBody) {
    const { tournament_name, creator_name } = data;
    
    // Get the repository for the Turnament entity
    const userRepository = dbService.AppDataSource.getRepository(Turnament);

    // Try to find an existing tournament by the name
    let user = await userRepository.findOneBy({ tournament_name });

    if (!user) {
        // If the tournament doesn't exist, create a new instance
        user = new Turnament();
    }

    // Set the properties
    user.tournament_name = tournament_name;
    user.creator_name = creator_name;
    user.winner_name = '';  // Provide a default value for winner_name

    // Save the tournament to the database
    await userRepository.save(user);

    // Return the saved tournament object
    return user;
}

// update winner 

  async updateWinner(data:any) {
    if (data.roomId) {
    // Find the highest scoring player in the room
      const findPlayerQuery = `
        SELECT player_name 
        FROM player 
        WHERE room_id = $1
        ORDER BY score DESC
        LIMIT 1;
      `;
      const playerResult = await dbService.AppDataSource.query(findPlayerQuery, [data.roomId]);
  
      if (playerResult.length > 0) {
        const highestScoringPlayer = playerResult[0].player_name;
  
        // Update the tournament's winner_name
        const updateWinnerQuery = `
          UPDATE turnament 
          SET winner_name = $1 
          WHERE turnament_id = (SELECT turnament_id FROM room WHERE room_id = $2)
          RETURNING *;
        `;
        const values = [highestScoringPlayer, data.roomId];
        const updatedTournament = await dbService.AppDataSource.query(updateWinnerQuery, values);
  
        // Return the updated tournament details
        return updatedTournament[0];
      }
    }
  }
  
}

export default new UserRepository();
