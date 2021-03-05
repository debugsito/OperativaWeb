import { NUMBER_REGEX } from "../../../global/constants/validations";

export default (value) => {
    const regex = NUMBER_REGEX;
    return value.length === 9 && regex.test(String(value));
}