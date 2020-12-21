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

  // Lista los Sub Usuarios (Empresa o Municipalidad)
  static async listSubUser() {
    const response = await Api.get('/account/users');
    return response;
  }
  // Crear los Sub Usuarios (Empresa o Municipalidad)
  static async createUser(info) {
    const response = await Api.post('/account/user',info);
    return response;
  }

  // Eliminar los Sub Usuarios (Empresa o Municipalidad)
  static async deleteSubUser(info,id) {
    const response = await Api.post('/account/user/'+ id +'/delete', info);
    return response;
  }

  // Editar los Sub Usuarios (Empresa o Municipalidad)
  static async editSubUser(info,id) {
    const response = await Api.post('/account/user/'+ id, info);
    return response;
  }

  // Listar las publicaciones
  static async listPublications() {
    const response = await Api.post('/publications');
    return response;
  }

  // Crear publicacion
  static async createPublications(info) {
    const response = await Api.post('/publications', info);
    return response;
  }

  // Edit publicacion
  static async editPublications(info,id) {
    const response = await Api.post('/publications'+ id, info);
    return response;
  }

}