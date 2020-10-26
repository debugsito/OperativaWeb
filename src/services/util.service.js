import Api from '../axios';

export default class UserService {

 // Servicio que obtiene la lista de tipo de documento
  static async listDocument() {
    const response = await Api.get('/document/');
    return response.data;
 } 

// Servicio que obtiene la lista de tipo de estado civil
  static async listCivil() {
    const response = await Api.get('/civil/');
    return response.data;
 } 

// Servicio que obtiene la lista de Departamentos
  static async listDepartament() {
    const response = await Api.get('/department/');
    return response.data;
 } 

 // Servicio que obtiene la lista de Provincias
 static async listState() {
    const response = await Api.get('/state/');
    return response.data;
 } 

// Servicio que obtiene la lista de Distrito
 static async listCity() {
    const response = await Api.get('/city/');
    return response.data;
 } 

}