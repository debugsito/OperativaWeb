export default (value) => {
    var allowedCode = [8, 13, 32, 44, 45, 46, 95];
    var charCode = (value.charCode) ? value.charCode : ((value.keyCode) ? value.keyCode :
        ((value.which) ? value.which : 0));
    if (charCode > 31 && (charCode < 64 || charCode > 90) &&
        (charCode < 97 || charCode > 122) &&
        (charCode < 48 || charCode > 57) &&
        (allowedCode.indexOf(charCode) === -1)) {
        value.preventDefault();
    }
}
