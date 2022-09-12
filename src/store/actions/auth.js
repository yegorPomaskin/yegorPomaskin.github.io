import axios from "axios";
import { AUTH_SUCCESS } from "./actionTypes";

export function getStatus() {
  return async (dispatch) => {
    let status = localStorage.getItem("status_auth");
    dispatch(authSuccess({status_auth: status}));
  };
}

export function authLogin(token, first_name, last_name, nickname, region, organization, email, rules_bool) {
  return async (dispatch) => {
    var authData = new FormData();
    authData.append("token", token);
    authData.append("first_name", first_name);
    authData.append("last_name", last_name);
    authData.append("username", nickname);
    authData.append("region", region);
    authData.append("organization", organization);
    authData.append("email", email);
    authData.append("rules_bool", rules_bool);

    await axios
    .post("https://meropriyatiabdd.ru/api/users/set", authData)
    .then(function (data) {
      localStorage.setItem("status_auth", true);
      dispatch(authSuccess({status_auth: true}));
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  };
}

export function authSuccess(params) {
  return {
    type: AUTH_SUCCESS,
    params
  };
}