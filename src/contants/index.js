export const FILE_URL =
    process.env.REACT_APP_BASE_URL_CDN ||
    "https://cdn.tingtong.xyz/files";
export const BASE_URL = process.env.REACT_APP_BASE_URL + ":" + process.env.REACT_APP_PORT;
export const SOCKET_URL =
    process.env.REACT_APP_BASE_URL_SOCKET || "socket.tingtong.xyz";