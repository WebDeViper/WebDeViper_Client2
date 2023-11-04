// 서버관련 코드
import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_APP_SOCKET_SERVER_URL);
export default socket;
