import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./User.service";
import pick from "../../../shared/pick";

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
    // const result = await UserServices.GetAllNormalUser();
    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: 'Get All Users',
    //     data: result
    // }); 
 const UserSearchFields = ['searchTerm', 'email', "firstName","lastName","middleName","role","contactNo","gender"];

    const filters = pick(req.query, UserSearchFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await UserServices.GetAllNormalUser(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "GET All User!!",
        meta: result.meta,
        data: result.data
    })
});

const GetAllAdmin = catchAsync(async (req: Request, res: Response) => {
 const adminSearchFields = ['searchTerm', 'email', "firstName","lastName","middleName","role","contactNo","gender"];

    const filters = pick(req.query, adminSearchFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await UserServices.GetAllAdmin(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Admins',
        meta: result.meta,
        data: result.data
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