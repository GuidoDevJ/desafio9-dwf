import { User } from "models/user";
import { sendEmailStatusPay } from "./sendrid";

export async function sendStatusPay(userId:string,status:string){
    let user = new User(userId)
    try {
        await user.pull()
        await sendEmailStatusPay(user.data.email, status)
        return true
    } catch (error) {
        return error
    }
   
    
}