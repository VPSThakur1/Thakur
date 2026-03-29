import { Server } from "socket.io";
import { userModel } from "./models/user.model.js";
import { CaptainModel } from "./models/captain.model.js";

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("⚡ New client connected:", socket.id);

        socket.on('join', async(data) => {
            const {userId, userType} = data;

            console.log(`User : ${userId} joined as : ${userType}`)

            if(userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId : socket.id});
            } else if (userType === 'captain') {
                await CaptainModel.findByIdAndUpdate(userId, {socketId: socket.id});
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await CaptainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        // Example join event
        socket.on("join", (data) => {
            console.log("User joined:", data);
        });

        // Example disconnect event
        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });
};

function sendMessageToSocketId(socketId, messageObject) {

    console.log(`Sending message to ${socketId}`, messageObject)
        if(io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    }

export { io, sendMessageToSocketId };