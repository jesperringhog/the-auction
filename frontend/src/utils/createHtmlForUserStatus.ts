export const createHtmlForUserStatus = (status: string) => {
    const statusContainer = document.getElementById("userStatusContainer");
    const userStatus = document.createElement("p");

    userStatus.textContent = `Inloggad som: ${status}`;
    statusContainer?.appendChild(userStatus);
}