import Config from "../config/Config";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(Config.endPoints).setProject(Config.ProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // console.log("createAccount", userAccount);
      if (userAccount) {
        console.log("createAccount", userAccount);
        return await this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Account is not created::AuthService", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("error in login user account::AuthService", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error in getCurrentUser::AuthService", error);
    }

    return null;
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("error in logOut the session::AuthService", error);
    }
  }
}

const authservices = new AuthServices();
export default authservices;
