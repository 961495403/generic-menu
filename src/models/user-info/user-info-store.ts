import { types } from "mobx-state-tree";
import { IUserMenuProps } from "page/layout/props";
import { IUserDataProps } from "page/login/props";
import storage from "../../utils/storage";

/**
 * Model description here for TypeScript hints.
 */
export const UserInfoStoreModel = types
  .model("UserInfoStore")
  .props({
    token: types.optional(types.string, ""),
    userName: types.optional(types.string, ""),
    userId: types.optional(types.string, ""),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setToken(token: string) {
      storage.sessionSet("token", token);
      self.token = token;
    },
    setRecord(username: string, password: string, remember: boolean) {
      remember ? storage.localSet("record", {username, password, remember}) : storage.localRemove("record");
      storage.localSet("username", username)
    },
    setMenu(menu: IUserMenuProps[]) {
      storage.localSet("menu", menu)
    },
    updateUserInfo(userName: string, userId: string) {
      self.userName = userName;
      self.userId = userId;
    },
    logout() {
      storage.sessionRemove("token");
      storage.localRemove("username")
      self.token = "";
      self.userId = "";
      self.userName = "";
    },
    // 钩子函数
    afterCreate() {
      const token = storage.sessionGet('token');
      if (token && typeof token === 'string') {
        self.token = token;
      }
    }
  })); // eslint-disable-line @typescript-eslint/no-unused-vars

export const userInfoStore = UserInfoStoreModel.create();
