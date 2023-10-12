import express from 'express';
import { UserRoute } from '../module/User/User.route';
import { AuthRoute } from '../module/auth/auth.route';

const router = express.Router();

const moduleRoutes = [ 
  {
    path: "/user",
    route: UserRoute
  },
  {
    path: "/auth",
    route: AuthRoute
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
