import type { IUser } from 'src/models/IUser';
class AuthService {
  getUser() {
    const currentUser: IUser = {
      id: '1',
      name: 'Melih Can',
    };
    return currentUser;
    throw new Error('Method not implemented.');
  }
  isAuth() {
    return true;
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }
  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    return true;
    throw new Error('Method not implemented.');
  }
}

export default new AuthService();
