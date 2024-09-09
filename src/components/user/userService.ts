import { IUserBody, IRepository, IRoomBody, IRoomJoinBody, IScoreBody } from "../../types/user";
import { HttpStatusCode, UserMessages } from "../../utils/constant";

import { AuthenticationError, BadRequest } from "../../error";

import { comparePassword } from "../../utils/helper";
import userRepository from "./userRepository";
import logger from "../../utils/logger";

import { generateJwt } from "../../utils/jwt";
import { Turnament } from "./turnamentModel";
import { Room } from "./roomsModel";
import { Player } from "./playerModel";

class UserService {
  //private repository: IRepository;

  // constructor() {
  //   this.repository = userRepository;
  // }
  async createTournament(userdata: IUserBody) {
    const newUser = await userRepository.create(userdata); // Use userRepository to call the method

    return newUser;
}

 

  // create room
  async createRoom(roomdetails: IRoomBody) {
    
    const tournament = await Turnament.findOne({ where: { turnament_id: roomdetails.turnament_id } });
     if (!tournament) {
      throw new Error('Tournament not found');
    }
  
    const room = new Room();
    
    room.room_name = roomdetails.roomName;  
    room.turnament = tournament;  
  
    await room.save();
  
     return room;
  }

  // create join room

  async joinRoom(joinroomdetails: IRoomJoinBody) {
    
    const room = await Room.findOne({ where: { room_id: joinroomdetails.roomId } });
    
   if (!room) throw new Error('Room not found');
    
    // Create a new player entity
    const player = new Player();
    
    player.player_name = joinroomdetails.playerName; 
    player.room = room; 
    await player.save();
    return player;
  }
  
// Score detail
async savePlayerScore(scoredetails: IScoreBody) {
  const player = await Player.findOne({ where: { user_id: scoredetails.playerId } });
  if (!player) throw new Error('Player not found');

  // Update the player's score
  player.score = Number(scoredetails.score);  
  
  // Save the updated player details
  await player.save();
  
  // Return the updated player
  return player;
}


// update user

  async updateUser(userdata: any) {
    try {
      const result = await userRepository.updateWinner(userdata);
      if(!result || result.length ===0){
        throw new BadRequest(UserMessages.NOT_FOUND)
      }
      return result;
    } catch (error: any) {
      logger.error(error);
    }
  }

  



}

export default new UserService();
