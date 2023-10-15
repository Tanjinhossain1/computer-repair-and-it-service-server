

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';  
import { BlogPostValidation } from './blogPost.validation';
import { BlogPostController } from './blogPost.controller';

const router = express.Router();
 

router.post(
    '/create',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    validateRequest(BlogPostValidation.create),
    BlogPostController.CreateBlogPost
); 
router.post(
    '/faqs/create',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    validateRequest(BlogPostValidation.createFaqs),
    BlogPostController.CreateFaqs
); 

router.get(
    '/faqs',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BlogPostController.GetAllFaqs
);  

router.get(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BlogPostController.GetAllBlogPost
);  

router.get(
    '/:id', 
    BlogPostController.GetOneBlogPost
);  


router.delete(
    '/delete/:id', 
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
    BlogPostController.DeleteBlogPost
);  

router.delete(
    '/faqs/delete/:id', 
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    BlogPostController.DeleteFaqs
);  

export const BlogPostRoute = router;