

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';  
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();
 

router.post(
    '/create',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    validateRequest(BookingValidation.create),
    BookingController.CreateBooking
); 

router.get(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BookingController.GetAllBooking
);  

router.get(
    '/:userId', 
    BookingController.GetUserOwnBooking
);  


router.patch(
    '/update/:id', 
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BookingController.UpdateBooking
);  

router.delete(
    '/delete/:id', 
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BookingController.DeleteBooking
);  

export const BookingRoute = router;