import { useBoolean, useMount, useRequest } from "ahooks";
import { asLoginApi, getJwtLoginApi, getUserMenuApi } from "../../services/api";
import {IUserDataProps } from "./props";
import { userInfoStore } from "models";
import storage from "utils/storage";
import { useState } from "react";
export const useAction = () => {
  const [isError, isErrorAction] = useBoolean(false);
  const [isLoading, isLoadingAction] = useBoolean(false);
  const [loginWay, setLoginWay] = useState<number>(0);
  const [formData, setFormData] = useState<IUserDataProps>({username: "", password: "", remember: false});
  const [isSystemPage, setIsSystemPage] = useBoolean(false); // 是否进入系统管理页面

  const asLoginRequest = useRequest(asLoginApi, {
    manual: true,
    onSuccess: (result, params) => {
      getJwtLoginRequest.run(result.access_token);
    },
    onError: (error) => {
      isErrorAction.setTrue();
      isLoadingAction.setFalse();
    },
  });

  const getUserMenuRequest = useRequest(getUserMenuApi, {
    manual: true,
    onSuccess: (result) => {
      userInfoStore.setMenu(result)
    }
  })

  const getJwtLoginRequest = useRequest(getJwtLoginApi, {
    manual: true,
    onSuccess: (result, params) => {
      const {username, password, remember} = {...formData}
      isErrorAction.setFalse();
      userInfoStore.setToken(result.token);
      getUserMenuRequest.run()
      userInfoStore.updateUserInfo(result.userName, result.userId);
      userInfoStore.setRecord(username, password, remember);
      isLoadingAction.setFalse();
      if(result.admin) {
        setIsSystemPage.setTrue();
      } else {
        window.location.replace("/");
      }
      
    },
    onError: (error) => {
      isErrorAction.setTrue();
      isLoadingAction.setFalse();
    },
  });

  // 有权限的用户可以选择进入系统管理主页还是部门管理主页
  const onSystemOrDepartment = (value: boolean) => {
    setIsSystemPage.setFalse();
    value ? window.location.replace("/") : window.location.replace("/");
  }

  
  // 登录方式的切换
  const onLoginWay = (type: number) => {
    setLoginWay(type);
  };

  const onFinish = (values: IUserDataProps) => {
    setFormData(values)
    isLoadingAction.setTrue();
    asLoginRequest.run(values);
  };

  const onErrorClose = () => {
    isErrorAction.setFalse();
  };
  
  useMount(() => {
    storage.sessionRemove("token");
    const record = storage.localGet("record");
    record && setFormData(record)
  })

  return {
    isError,
    isLoading,
    loginWay,
    formData,
    isSystemPage,
    onFinish,
    onErrorClose,
    onLoginWay,
    onSystemOrDepartment,
  }
}