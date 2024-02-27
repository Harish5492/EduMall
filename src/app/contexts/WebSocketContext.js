// // WebSocketContext.js
// import React,{ createContext, useContext, useEffect, useMemo } from "react";

// const WebSocketContext = createContext(null);

// export const useWebSocket = () => {
//   const context = useContext(WebSocketContext);
//   if (!context) {
//     throw new Error("useWebSocket must be used within a WebSocketProvider");
//   }
//   return context;
// };

// export const WebSocketProvider = ({ url,children }) => {
//   const socket = useMemo(() => new WebSocket(url), [url]);

//   useEffect(() => {
//     return () => {
//       // Clean up the WebSocket connection when the component unmounts
//       socket.close();
//     };
//   }, [socket]);

//   return (
//     <WebSocketContext.Provider value={socket}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };
// WebSocketContext.js
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider = ({ url, children }) => {
  const socket = useMemo(() => new WebSocket(url), [url]);
  const role = useSelector((state) => state.role);


  useEffect(() => {
    const handleOpen = () => {
      console.log("WebSocket connected");
    };

    const handleMessage = (event) => {
      const message = event.data;
      if(role === "admin")
        console.log(`Received: ${message}`);
      // Add your logic to handle incoming messages
    };

    const handleClose = () => {
      console.log("WebSocket closed");
    };

    const handleError = (error) => {
      console.error("WebSocket error:", error);
    };

    // Event listeners for WebSocket
    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);

      socket.close();
    };
  }, [socket, url]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
