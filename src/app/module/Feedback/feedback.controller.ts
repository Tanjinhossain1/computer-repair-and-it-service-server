import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse"; 
import httpStatus from "http-status"; 
import { FeedbackService } from "./feedback.service";

const CreateFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedbackService.CreateFeedback(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create FeedBack',
        data: result
    });
});

const GetAllFeedBack = catchAsync(async (req: Request, res: Response) => { 
    const result = await FeedbackService.GetAllFeedBack();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "GET All FeedBack!!", 
        data: result
    })
});
export const FeedBackController = {
    CreateFeedback, 
    GetAllFeedBack
}