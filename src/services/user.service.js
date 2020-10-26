import Api from '../axios';

export default class UserService {
  static async signIn(user) {
    const response = await Api.post('/auth/login', user);
    return response.data.status === 'success';
  }

  static async singUp(user) {
    const response = await Api.post('/account/', user);
    return response.data.status === 'success';
  }

}
