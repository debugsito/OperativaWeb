import { EMAIL_REGEX } from "../../../global/constants/validations";

export default (value) => {
    let state = false
    const regex = EMAIL_REGEX;
    let email = String(value).toLowerCase()
    if (regex.test(email)) {
        const dom = email.slice(email.indexOf("@"))
        if (dom !== "@gmail.com" && dom !== "@hotmail.com" && dom !== "@outlook.com") {
            state = true
        }
    };
    return state;
}
