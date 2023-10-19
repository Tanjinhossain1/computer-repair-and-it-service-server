import { Feedback } from "@prisma/client";
import prisma from "../../../shared/prisma"; 

const CreateFeedback = async (data: Feedback) => {
    const result = await prisma.feedback.create({
        data,
    });
    return result;
} 

const GetAllFeedBack = async () => {
    const result = await prisma.feedback.findMany({
        include:{
            user: true
        }
    });
    return result;
} 
 
export const FeedbackService = {
    CreateFeedback, 
    GetAllFeedBack
}