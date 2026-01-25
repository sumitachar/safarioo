"use client"
import { Provider } from "react-redux";
import { store } from "@/store/store"; 
import { useEffect } from "react";
import { hydrateAuth } from "@/store/slices/authSlice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // পেজ লোড হওয়ার পর লোকাল স্টোরেজ থেকে ডেটা লোড করা
    store.dispatch(hydrateAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}