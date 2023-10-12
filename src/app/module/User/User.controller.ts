import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./User.service";

const CreateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.CreateUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Created',
        data: result
    });
});

const GetAllNormalUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.GetAllNormalUser();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Users',
        data: result
    });
});

const GetAllAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.GetAllAdmin();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Admins',
        data: result
    });
});

const UpdateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.UpdateUser(+req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update User',
        data: result
    });
});

const GetProfileDetail = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.GetProfileDetail(+req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get Profile Detail',
        data: result
    });
});

const DeleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.DeleteUser(+req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Deleted The User',
        data: result
    });
});

const GiveAdminPermission = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.GiveAdminPermission(+req.params.id,req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Give Admin Permission',
        data: result
    });
});

export const UserController = {
    CreateUser,
    GetAllNormalUser,
    GetAllAdmin,
    UpdateUser,
    GetProfileDetail,
    DeleteUser,
    GiveAdminPermission
}