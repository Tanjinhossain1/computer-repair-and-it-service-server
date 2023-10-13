"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_route_1 = require("../module/User/User.route");
const auth_route_1 = require("../module/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: User_route_1.UserRoute
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
