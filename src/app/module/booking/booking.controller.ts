import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookingService } from "./booking.service";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const CreateBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.CreateBooking(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Booking',
        data: result
    });
});

const GetAllBooking = catchAsync(async (req: Request, res: Response) => { 
       const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
   
       const result = await BookingService.GetAllBooking(options);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "GET All Booking Services!!",
           meta: result.meta,
           data: result.data
       })
   });

const GetUserOwnBooking = catchAsync(async (req: Request, res: Response) => { 
       const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
   
       const result = await BookingService.GetUserOwnBooking(+req.params.userId,options);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "GET All Booking Services!!",
           meta: result.meta,
           data: result.data
       })
   });

const UpdateBooking = catchAsync(async (req: Request, res: Response) => { 
       const result = await BookingService.UpdateBooking(+req.params.id,req.body);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "Update Booking Services!!", 
           data: result
       })
   });

const DeleteBooking = catchAsync(async (req: Request, res: Response) => { 
       const result = await BookingService.DeleteBooking(+req.params.id);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "Delete Booking Services!!", 
           data: result
       })
   });

export const BookingController = {
    CreateBooking,
    GetAllBooking,
    GetUserOwnBooking,
    UpdateBooking,
    DeleteBooking
}