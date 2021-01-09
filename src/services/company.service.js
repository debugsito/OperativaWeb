import Api from '../axios';

export default class CompanyService {

  // Registrar la Solicitud de Empresa
  static async registerCompany(info){
    const response = await Api.post('/register/business', info)
    return response;
  }

  static async registerPublication(info){
    const response = await Api.post('/publication', info)
    return response;
  }

  static async editPublication(info, id){
    const response = await Api.post('/publication/'+id, info)
    return response;
  }

  static async deletePublication(id){
    const response = await Api.post('/publication/'+id+'/delete')
    return response;
  }

  static async listPublicationXID(id){
    const response = await Api.get('/publication/'+id);
    return response.data;
  }





}