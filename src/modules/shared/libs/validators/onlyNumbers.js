export default (value) => {
    let key = window.event ? value.which : value.keyCode;
    if (key < 48 || key > 57) {
        value.preventDefault();
    }
}
