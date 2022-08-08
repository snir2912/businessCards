import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const TOKRN_KEY = "token";
setTokenHeader();

console.log(getUser());
export function setTokenHeader(tokrn) {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function getJWT() {
  return localStorage.getItem(TOKRN_KEY);
}

export function createUser(user) {
  return httpService.post("/users", user);
}
export async function loginUser(user) {
  const { data } = await httpService.post("/auth", user);

  localStorage.setItem(TOKRN_KEY, data.token);
  setTokenHeader();
}

export function loguot() {
  localStorage.removeItem(TOKRN_KEY);
  setTokenHeader();
}

export function getUser() {
  try {
    const token = getJWT();
    console.log(token);
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

const usersService = {
  createUser,
  loginUser,
  getJWT,
  loguot,
  getUser,
};

export default usersService;
