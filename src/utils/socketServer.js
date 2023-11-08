// 서버관련 코드
import { io } from 'socket.io-client';
export const chatSocket = io(import.meta.env.VITE_APP_SOCKET_CHAT_SERVER_URL);
