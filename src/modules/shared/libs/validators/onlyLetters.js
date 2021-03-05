import { LETTERS_REGEX } from "../../../global/constants/validations";

export default (value) => {
    const regex = LETTERS_REGEX;
    var key = String.fromCharCode(!value.charCode ? value.which : value.charCode);
    if (!regex.test(key)) {
        value.preventDefault();
        return false;
    }
}
