import { changePassword, changePasswordFromDashboard, logIn, loginAs, recoverPassword } from "./auth.service"
import { updateAccount, getAccount } from "./user.service"

export default {
    changePassword,
    logIn,
    recoverPassword,
    updateAccount,
    getAccount,
    changePasswordFromDashboard,
    loginAs,
}