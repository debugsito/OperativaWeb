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

 // Servicio que obtiene la lista de nivel academico
  static async listLevel() {
    const response = await Api.get('/level/');
    return response.data;
 } 

 // Servicio que obtiene la lista especilidad
  static async listField() {
    const response = await Api.get('/field/');
    return response.data;
 } 

// Servicio que obtiene la lista de genero
  static async listGender() {
    const response = await Api.get('/gender/');
    return response.data;
 } 

// Servicio que obtiene la lista de proveedores
  static async listProvider() {
    const response = await Api.get('/provider/');
    return response.data;
 } 

// Servicio que obtiene la lista de nivel de trabajos
  static async listJobLevel() {
    const response = await Api.get('/job_level/');
    return response.data;
 } 

 // Servicio que obtiene la lista de roles de trabajo
  static async listJobRole() {
    const response = await Api.get('/job_role/');
    return response.data;
 } 

// Servicio que obtiene la lista de rubros
  static async listRubro() {
    const response = await Api.get('/rubro/');
    return response.data;
 } 

// Servicio que obtiene la lista de motivos de retiro
  static async listMotivoRetiro() {
    const response = await Api.get('/attrition/');
    return response.data;
 } 

}