

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest'; 
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();
 

router.post(
    '/create',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(ServiceValidation.create),
    ServiceController.CreateService
); 

router.post(
    '/add-to-cart',
    auth(ENUM_USER_ROLE.USER,ENUM_USER_ROLE.ADMIN),
    validateRequest(ServiceValidation.addToCart),
    ServiceController.CreateAddToCart
); 

router.get(
    '/add-to-cart/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    ServiceController.GetAllAddToCart
); 

router.get(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    ServiceController.GetAllServices
); 
router.get(
    '/available',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    ServiceController.GetAllAvailableServices
); 
router.get(
    '/up-coming',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    ServiceController.GetAllUpComingServices
); 

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    ServiceController.GetOneService
); 

router.patch(
    '/update/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(ServiceValidation.update),
    ServiceController.UpdateService
); 

router.delete(
    '/delete/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    ServiceController.DeleteService
); 

export const ServiceRoute = router;