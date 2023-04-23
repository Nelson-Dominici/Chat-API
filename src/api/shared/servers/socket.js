import jwt from "jsonwebtoken";
import { io } from "./httpServer.js";

io.on("connection", (socket) => {

    socket.on("register", (token = null, callback = null) => {

        if(typeof token === "string" && typeof callback === "function"){
            
            token = token.split(" ");

            if(token.length !== 2){
                callback(false);
            }

            const [ scheme, JWTtoken ] = token;
            
            if(!/^Bearer$/i.test(scheme)){
                callback(false);
            }

            try {
                token = jwt.verify(JWTtoken, process.env.TOKEN_SECRET);
                socket.join(token.uuid);
                callback(true);

            } catch {
                callback(false);
            }
        }
    });

})