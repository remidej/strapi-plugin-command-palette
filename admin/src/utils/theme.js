export function toggleTheme() {
  const theme = localStorage.getItem("STRAPI_THEME");
  let newTheme;
  switch (theme) {
    case "light":
      newTheme = "dark";
      break;
    case "dark":
      newTheme = "light";
      break;
    default:
      newTheme = "dark";
      break;
  }
  localStorage.setItem("STRAPI_THEME", newTheme);
  window.location.reload();
}
