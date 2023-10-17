import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ServiceService } from "./service.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";

const CreateService = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.CreateService(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service Created',
        data: result
    });
});

const GetAllServices = catchAsync(async (req: Request, res: Response) => { 
    const UserSearchFields = ['searchTerm', 'title', "status","category","createAt",'serviceLocation',"updateAt",'minPrice','maxPrice'];
   
       const filters = pick(req.query, UserSearchFields);
       const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
   
       const result = await ServiceService.GetAllServices(filters, options);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "GET All Services!!",
           meta: result.meta,
           data: result.data
       })
   });
const GetAllAvailableServices = catchAsync(async (req: Request, res: Response) => { 
    const UserSearchFields = ['searchTerm', 'title', "status","category",'serviceLocation','minPrice','maxPrice'];
   
       const filters = pick(req.query, UserSearchFields);
       const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
   
       const result = await ServiceService.GetAllAvailableServices(filters, options);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "GET All Available Services!!",
           meta: result.meta,
           data: result.data
       })
   });
const GetAllUpComingServices = catchAsync(async (req: Request, res: Response) => { 
    const UserSearchFields = ['searchTerm', 'title', "status","category","serviceLocation","description",'minPrice','maxPrice'];
   
       const filters = pick(req.query, UserSearchFields);
       const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
   
       const result = await ServiceService.GetAllUpComingServices(filters, options);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "GET All Up Coming Services!!",
           meta: result.meta,
           data: result.data
       })
   });
   

const GetOneService = catchAsync(async (req: Request, res: Response) => {  
       const result = await ServiceService.GetOneService(+req.params.id);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "GET One Services!!", 
           data: result
       })
   });

const UpdateService = catchAsync(async (req: Request, res: Response) => {  
       const result = await ServiceService.UpdateService(+req.params.id,req.body);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "Update Services!!", 
           data: result
       })
   });
   
const DeleteService = catchAsync(async (req: Request, res: Response) => {  
       const result = await ServiceService.DeleteService(+req.params.id);
       sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "Delete Services!!", 
           data: result
       })
   });
   
export const ServiceController = {
    CreateService,
    GetAllServices,
    GetOneService,
    UpdateService,
    DeleteService,
    GetAllAvailableServices,
    GetAllUpComingServices
}