import { NUMBER_REGEX } from "../../../global/constants/validations";

export default (value) => {
    const regex = NUMBER_REGEX;
    return value.length === 8 && regex.test(String(value));
}