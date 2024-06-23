import Consts from 'src/models/Consts';
import type { IUser } from 'src/models/IUser';

class AuthService {
  login(username: string, password: string): Promise<boolean> {
    console.log(username);
    console.log(password);
    //TODO: TEST şimdilik normalse servise git session bilgilerini al gel
    if (username === 'melih' && password === '12') {
      const currentUser: IUser = {
        id: '1',
        name: 'Melih Can',
      };

      localStorage.setItem(
        Consts.StorageKeys.USER,
        JSON.stringify(currentUser)
      );
      localStorage.setItem(Consts.StorageKeys.IS_AUTH, JSON.stringify(true));
      return Promise.resolve(true);
    }
    localStorage.setItem(Consts.StorageKeys.IS_AUTH, JSON.stringify(false));
    return Promise.resolve(false);
  }

  isAuth(): boolean {
    return JSON.parse(
      localStorage.getItem(Consts.StorageKeys.IS_AUTH) || 'false'
    );
  }

  logout(): Promise<boolean> {
    localStorage.removeItem(Consts.StorageKeys.USER);
    localStorage.removeItem(Consts.StorageKeys.IS_AUTH);
    return Promise.resolve(true);
  }

  getUser(): Promise<IUser | null> {
    const user = localStorage.getItem(Consts.StorageKeys.USER);
    if (user) {
      return JSON.parse(user);
    } else {
      return Promise.resolve(null);
    }
  }
}

export default new AuthService();
