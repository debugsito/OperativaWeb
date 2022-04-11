import { changePassword, changePasswordFromDashboard, logIn, loginAs, recoverPassword } from "./auth.service"
import { updateAccount, getAccount, updateSearchWork } from "./user.service"

export default {
    changePassword,
    logIn,
    recoverPassword,
    updateAccount,
    getAccount,
    updateSearchWork,
    changePasswordFromDashboard,
    loginAs,
}
