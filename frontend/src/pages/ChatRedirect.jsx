import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {useAuthStore} from "../store/useAuthstore";

const ChatRedirect = () => {
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser?.token) {
      const chatUrl = `https://chat.musify.in?token=${authUser.token}`;
      window.location.href = chatUrl;
    }
  }, [authUser]);

  return <Navigate to="/" />;
};

export default ChatRedirect;
