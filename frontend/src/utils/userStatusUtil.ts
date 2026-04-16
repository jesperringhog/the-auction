import { createHtmlForUserStatus } from "./createHtmlForUserStatus";

export const initUserStatus = () => {
    const loggedIn = sessionStorage.getItem("loggedInUsersName");

    if (!loggedIn) return;

    createHtmlForUserStatus(loggedIn);
}