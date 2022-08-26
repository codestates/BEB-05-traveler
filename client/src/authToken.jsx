class AuthToken {
  constructor() {
    this._token = '';
    this._userInfo = {};
  }

  setToken(newToken) {
    this._token = newToken;
  }

  getToken() {
      return this._token;
    }
  
  // userInfo는 만들어는 놨지만 일단 안씀
  setUserInfo(newUserInfo) {
      this._userInfo = newUserInfo;
  }

  getUserInfo() {
      return this._userInfo;
  }

}
  
export const authToken = new AuthToken(); 