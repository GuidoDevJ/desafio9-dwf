import { sgMail } from "../lib/sengrid";
async function sendEmailToAuth(to,code) {
	return await sgMail
		.send({
			to,
			from: 'guidogauna9@gmail.com',
			subject: `Codigo de Verificacion`,
			text: `Su codigo de verificacion es ${code}`,
			html: `<h2>Su codigo de verificacion es ${code}</h2>`,
		})
		.then(() => {
			console.log(`email sent`);
            return true
		})
		.catch((err) => {
			console.log(err);
            return err
		});
}
async function sendEmailStatusPay(to:string,status:string){
	if(status==="closed"){
		return await sgMail
		.send({
			to,
			from: 'guidogauna9@gmail.com',
			subject: `Estado de su compra`,
			text: `Su compra se ha realizado de manera correcta`,
			html: `<h2>Su compra se realizo de manera correcta y se ha efectuado el pago</h2>`,
		})
		.then(() => {
			console.log(`email sent`);
            return true
		})
		.catch((err) => {
			console.log(err);
            return err
		});
	}

}

export { sendEmailToAuth,sendEmailStatusPay };