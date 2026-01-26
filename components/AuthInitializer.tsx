"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateAuth, setUser, logout } from "@/store/slices/authSlice";
import Cookies from "js-cookie";
import api from "@/api/axiosInstance";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1️⃣ Instant UI hydrate
    dispatch(hydrateAuth());

    // 2️⃣ Backend session validation
    const validateSession = async () => {
      const token = Cookies.get("safarioo_token");

      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        const { data } = await api.get("/user");

        const user = data?.user || data;

        if (!user?.id) {
          throw new Error("Invalid session");
        }

        // fresh backend data always wins
        dispatch(setUser(user));
      } catch (err) {
        console.error("Session validation failed");
        dispatch(logout());
      }
    };

    validateSession();
  }, [dispatch]);

  return <>{children}</>;
}
