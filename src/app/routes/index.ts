import express from 'express';
import { UserRoute } from '../module/User/User.route';
import { AuthRoute } from '../module/auth/auth.route';
import { ServiceRoute } from '../module/service/service.route';
import { BookingRoute } from '../module/booking/booking.route';
import { BlogPostRoute } from '../module/blogPost/blogPost.route';

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
  {
    path: "/services",
    route: ServiceRoute
  },
  {
    path: "/booking",
    route: BookingRoute
  },
  {
    path: "/blogPost",
    route: BlogPostRoute
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
