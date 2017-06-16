export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 4000;
export const HOSTNAME = process.env.HOSTNAME || "localhost";
export const BASE_PATH = process.env.BASE_PATH || "";
export const HOST = `${HOSTNAME}:${PORT}${BASE_PATH}`;
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
