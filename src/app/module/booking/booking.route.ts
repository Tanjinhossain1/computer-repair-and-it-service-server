

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
router.post(
    '/review',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    validateRequest(BookingValidation.reviewCreate),
    BookingController.CreateReview
); 
router.get(
    '/review',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BookingController.GetAllReviews
); 

router.get(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BookingController.GetAllBooking
);  

router.get(
    '/:userId/:serviceId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BookingController.IsServiceAlreadyBookThisUser
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