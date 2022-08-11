export function logOut() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userInfo");
  window.location.reload();
}
