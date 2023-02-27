import { baseVentas } from "lib/airtable";
import { User } from "models/user";
import { sendEmailStatusPay } from "./sendrid";

export async function sendStatusPay(userId: string, status: string,orderId:string) {
    let user = new User(userId)
    let finalStatus:string;
    if(status === "closed") finalStatus === "Done"

    try {
        await user.pull()
        await sendEmailStatusPay(user.data.email, status)
        baseVentas('Ventas').create([
            {
                "fields": {
                    "userId": userId,
                    "orderId": orderId,
                    "Status": finalStatus
                }
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
        });
        return true
    } catch (error) {
        return error
    }


}