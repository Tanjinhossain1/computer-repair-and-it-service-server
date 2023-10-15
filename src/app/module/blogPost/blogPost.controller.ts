import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse"; 
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { BlogPostService } from "./blogPost.service";

const CreateBlogPost = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogPostService.CreateBlogPost(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create BlogPost',
        data: result
    });
});
const CreateFaqs = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogPostService.CreateFaqs(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create  Faqs',
        data: result
    });
});

const GetAllFaqs = catchAsync(async (req: Request, res: Response) => { 
       
       const result = await BlogPostService.GetAllFaqs();
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "GET All Faqs", 
           data: result
       })
   });
const GetAllBlogPost = catchAsync(async (req: Request, res: Response) => { 
       const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
   
       const result = await BlogPostService.GetAllBlogPost(options);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "GET All BlogPost!!",
           meta: result.meta,
           data: result.data
       })
   });
 

const GetOneBlogPost = catchAsync(async (req: Request, res: Response) => { 
       const result = await BlogPostService.GetOneBlogPost(+req.params.id);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "Get one BlogPost!!", 
           data: result
       })
   });
const DeleteBlogPost = catchAsync(async (req: Request, res: Response) => { 
       const result = await BlogPostService.DeleteBlogPost(+req.params.id);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "Delete BlogPost!!", 
           data: result
       })
   });
const DeleteFaqs = catchAsync(async (req: Request, res: Response) => { 
       const result = await BlogPostService.DeleteFaqs(+req.params.id);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "Delete Faqs!!", 
           data: result
       })
   });

export const BlogPostController = {
    CreateBlogPost,
    GetAllBlogPost, 
    GetOneBlogPost,
    DeleteBlogPost,
    CreateFaqs,
    GetAllFaqs,
    DeleteFaqs
}