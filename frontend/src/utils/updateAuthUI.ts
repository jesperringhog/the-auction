export const updateAuthUI = () => {
  const loggedIn = sessionStorage.getItem("loggedInUsersName");
  const toRegisterPageBtn = document.getElementById("toRegisterPageBtn");
  const toLoginPageBtn = document.getElementById("toLoginPageBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loggedIn) {
    toRegisterPageBtn?.classList.add("hide");
    toLoginPageBtn?.classList.add("hide");
    logoutBtn?.classList.remove("hide");
  } else {
    toRegisterPageBtn?.classList.remove("hide");
    toLoginPageBtn?.classList.remove("hide");
    logoutBtn?.classList.add("hide");
  }
};
