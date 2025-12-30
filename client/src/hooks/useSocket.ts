import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

export const useSocket = () => {
    const { user, token } = useAuth();
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (token && user) {
            socketRef.current = io('http://localhost:5000', {
                auth: { token } // Optional if using auth middleware on socket
            });

            socketRef.current.on('connect', () => {
                console.log('Socket connected');
                // Join specific room
                if (user.role === 'admin') {
                    socketRef.current?.emit('join_room', { role: 'admin' });
                } else {
                    socketRef.current?.emit('join_room', { userId: user.id });
                }
            });

            return () => {
                socketRef.current?.disconnect();
            };
        }
    }, [token, user]);

    return socketRef.current;
};
