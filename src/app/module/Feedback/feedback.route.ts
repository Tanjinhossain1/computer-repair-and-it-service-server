

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest'; 
import { FeedBackValidation } from './feedback.validation';
import { FeedBackController } from './feedback.controller';
const router = express.Router();
 

router.post(
    '/create',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    validateRequest(FeedBackValidation.create),
    FeedBackController.CreateFeedback
);  

router.get(
    '/',
     
    FeedBackController.GetAllFeedBack
);   
export const FeedBackRoute = router;