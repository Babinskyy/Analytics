import { Preferences } from "@capacitor/preferences";
import { User } from "./userProps";

class TokenService {
  async getLocalRefreshToken() {
    const { value } = await Preferences.get({ key: "user" });
    const user = JSON.parse(value ? value : "") as User | undefined;
    return user?.jwtToken;
  }
  async getLocalAccessToken() {
    try {
      const { value } = await Preferences.get({ key: "user" });
      const user = JSON.parse(value ? value : "") as User | undefined;

      return user?.jwtToken;
    } catch (error) {
      return undefined;
    }
  }
  async updateLocalAccessToken(token: string) {
    try {
      const { value } = await Preferences.get({ key: "user" });
      const user = JSON.parse(value ? value : "") as User | undefined;
      if (user) {
        user.jwtToken = token;
      }
      await Preferences.set({
        key: "user",
        value: JSON.stringify(user),
      });
    } catch (error) {}
  }
  async getUser() {
    try {
      const { value } = await Preferences.get({ key: "user" });
      const user = JSON.parse(value ? value : "") as User | undefined;
      if (user) {
        return user;
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
  }
  async setUser(user: User) {
    console.log("user");
    console.log(user);
    console.log(JSON.stringify(user));
    await Preferences.set({
      key: "user",
      value: JSON.stringify(user),
    });
  }
  async removeUser() {
    await Preferences.remove({ key: "user" });
  }
}
export default new TokenService();
