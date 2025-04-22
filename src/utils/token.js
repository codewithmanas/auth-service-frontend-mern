export const getAccessToken = () => localStorage.getItem("_goboolean_access_token");
export const setAccessToken = (token) => localStorage.setItem("_goboolean_access_token", token);
export const removeAccessToken = () => localStorage.removeItem("_goboolean_access_token");