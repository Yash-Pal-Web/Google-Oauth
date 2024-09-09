import { Router } from 'express';
import 'reflect-metadata';
import 'express-async-errors';


import Account from './userController';


const route = Router();

/**
 * @method POST
 * @route api/v1/user/create
 * @access PUBLIC
 * @description Route to create new tournament
 */
route.post('/create-tournament', Account.createTournament);
/**
 * @method POST
 * @route api/v1/user/create
 * @access PUBLIC
 * @description Route to create new room
 */

 route.post('/create-room', Account.createRoom);
 /**
 * @method POST
 * @route api/v1/user/create
 * @access PUBLIC
 * @description Route to create new joinRoom
 */
 route.post('/join-room', Account.joinRoom);
 /**
 * @method POST
 * @route api/v1/user/create
 * @access PUBLIC
 * @description Route to create new player score
 */
 route.post('/player-score', Account.savePlayerScore);
 /**
 * @method update
 * @route api/v1/user/updatew-winner
 * @access PUBLIC
 * @description Route to update winner
 */
 route.put('/update-winner', Account.updateWinner);



export default route;
