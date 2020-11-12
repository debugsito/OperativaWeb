import Api from '../axios';

export default class UserService {

  // Login
  static async signIn(user) {
    const response = await Api.post('/auth/login', user);
    return response.data.status === 'success';
  }

  // Crear usuario
  static async singUp(user) {
    const response = await Api.post('/account/', user);
    return response.data.status === 'success';
  }

  // Registrar la información Personal del Usuario
  static async registerUserInfo(info){
    const response = await Api.post('/user/', info)
    return response;
  }

  // Registrar la información Educativa del Usuario.
  static async registerUserEducation(education){
    const response = await Api.post('/education/', education);
    return response;
  }

  // Registrar la información de Trabajo del Usuario
  static async registerUserJob(info){
    const response = await Api.post('/job/', info)
    return response;
  }
}
