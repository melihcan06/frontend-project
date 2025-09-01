import axios from 'axios';
import Consts from 'src/models/Consts';
import type { IUser } from 'src/models/IUser';

class AuthService {
  async execLogin(username: string, password: string): Promise<IUser | null> {
    const url = 'http://localhost:8080/api/getUser/';
    await axios
      .post(url, {
        username: username,
        password: password,
      })
      .then((resp) => {
        return resp;
      });
    return null;
  }

  async login(username: string, password: string): Promise<boolean> {
    console.log(username);
    console.log(password);

    //TODO: TEST
    //if (username === 'melih' && password === '12') {
    const currentUser: IUser = {
      id: '1',
      name: 'Melih Can',
    };
    //}

    debugger;
    //TODO: TEST
    //const currentUser = await this.execLogin(username, password);
    debugger;

    if (currentUser) {
      //localStorage
      sessionStorage.setItem(
        Consts.StorageKeys.USER,
        JSON.stringify(currentUser)
      );
      sessionStorage.setItem(Consts.StorageKeys.IS_AUTH, JSON.stringify(true));
      return Promise.resolve(true);
    } else {
      sessionStorage.setItem(Consts.StorageKeys.IS_AUTH, JSON.stringify(false));
      return Promise.resolve(false);
    }
  }

  isAuth(): boolean {
    return JSON.parse(
      sessionStorage.getItem(Consts.StorageKeys.IS_AUTH) || 'false'
    );
  }

  logout(): Promise<boolean> {
    sessionStorage.removeItem(Consts.StorageKeys.USER);
    sessionStorage.removeItem(Consts.StorageKeys.IS_AUTH);
    return Promise.resolve(true);
  }

  getUser(): Promise<IUser | null> {
    const user = sessionStorage.getItem(Consts.StorageKeys.USER);
    if (user) {
      return JSON.parse(user);
    } else {
      return Promise.resolve(null);
    }
  }
}

export default new AuthService();
