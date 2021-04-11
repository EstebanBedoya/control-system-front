import api from "../config/api.config";
import { io } from "socket.io-client";

export const socket = io(api.BASE_URL, {
  transports: ["websocket"],
});
