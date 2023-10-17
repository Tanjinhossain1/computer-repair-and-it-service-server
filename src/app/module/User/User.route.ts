import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './User.controller';
import { UserValidation } from './User.validation';

const router = express.Router();
 

router.post(
    '/create',
    validateRequest(UserValidation.create),
    UserController.CreateUser
);
router.get(
    '/users',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    UserController.GetAllNormalUser
);
router.get(
    '/admins',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    UserController.GetAllAdmin
);

router.get(
    '/profile/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    UserController.GetProfileDetail
);
router.patch(
    '/update/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER), 
    validateRequest(UserValidation.update),
    UserController.UpdateUser
);

router.patch(
    '/add-admin-permission/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), 
    validateRequest(UserValidation.adminPermission),
    UserController.GiveAdminPermission
);

router.delete(
    '/delete/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    UserController.DeleteUser
);

export const UserRoute = router;