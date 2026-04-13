import type { Server, Socket } from "socket.io"

export type SocketFunctionProps = {
    io: Server,
    socket: Socket,
    loginCookie: string | undefined,
}