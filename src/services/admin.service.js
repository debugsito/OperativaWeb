import Api from '../axios';

export default class AdminService {

  // Lista de cuentas 
  static async listAccounts() {
    const response = await Api.get('/accounts');
    return response.data;
  }

  static async activateAccount(info) {
    const response = await Api.post('/account/accept',info);
    return response;
  }

  static async denyAccount(info) {
    const response = await Api.post('/account/deny',info);
    return response;
  }

}