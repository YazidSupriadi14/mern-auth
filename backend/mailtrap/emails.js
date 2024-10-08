import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const receipents = [{email}]

    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : receipents,
            subject : "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category : "email Verification"
        })
    }
    catch (error) {
        console.log(error)
    }
};

export const sendWelcomeEmail = async (email, name) => {
        const receipents = [{email}]

        try {
            const response = await mailtrapClient.send({
                from : sender,
                to : receipents,
                template_uuid : "a9ab3f48-a431-458d-94ca-baa871662a41",
                template_variables : {
                    company_info_name : "Test Company Info Name",
                    name : "Test Name",

                }
            })
            console.log("Welcome Email Sent Successfully",response)
        }
        catch (error) {
            console.log(error)
        }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }]
    try{
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "Password reset successful",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "Password Reset"
        })

        console.log("Password reset email sent successfully",response)
    }catch(error){
        console.log(error)
    }
}