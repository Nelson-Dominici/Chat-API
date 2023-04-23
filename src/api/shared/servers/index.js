import { httpServer } from "./httpServer.js";
import "./socket.js";

httpServer.listen(process.env.PORT || 3000, () =>
    console.log('Server is running...')
);
