import { EMAIL_REGEX } from "../../../global/constants/validations";

export default (value) => {
    const regex = EMAIL_REGEX;
    return regex.test(String(value).toLowerCase());
}
