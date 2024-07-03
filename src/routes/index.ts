import { Router } from 'express';
import UserRoute from '../components/user/userRoute';


const route = Router();

route.use('/user', UserRoute);


export default route;
