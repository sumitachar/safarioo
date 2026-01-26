import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

// =======================
// ENCRYPTION HELPERS
// =======================

// Environment variable-এর fallback দিয়ে রাখা ভালো, কিন্তু production-এ অবশ্যই env থেকে নিতে হবে
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_AUTH_KEY || "safarioo-secret-key-999";

const encrypt = (data: unknown): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decrypt = (ciphertext: string): unknown | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    const text = bytes.toString(CryptoJS.enc.Utf8);
    return text ? JSON.parse(text) : null;
  } catch {
    console.warn("Decryption failed – possibly invalid or tampered data");
    return null;
  }
};

// =======================
// TYPES
// =======================

// Lifestyle-এর জন্য আরও নিরাপদ টাইপ (undefined-কে হ্যান্ডেল করা সহজ হবে)
interface Lifestyle {
  smoking?: "Yes" | "No" | "Sometimes" | "Socially" | "Regularly" | "Prefer not to say";
  drinking?: "Yes" | "No" | "Sometimes" | "Socially" | "Regularly" | "Prefer not to say";
  pets?: "Yes" | "No" | "Cats" | "Dogs" | "Allergic" | "Prefer not to say";
}

interface SocialLinks {
  instagram?: string;
  website?: string;
  twitter?: string;
}

// Partial<UserData> ব্যবহার করা যায় update-এর জন্য, তাই সব ফিল্ড optional রাখা যায় না
// কিন্তু core fields গুলো required রাখা ভালো
export interface UserData {
  // API থেকে আসা core fields (snake_case)
  id: number;
  name: string;
  email: string;
  username: string;
  mobile: string | null;
  dob: string | null;
  gender: string | null;
  coin: string | null;
  trust_score: string | null;
  status: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  otp_expire_at?: string | null;
  meta?: Record<string, any>[]; // meta array-কে আরও টাইপড করা যায়

  // UI-এর জন্য extended fields (camelCase)
  age?: number;
  verified?: boolean;
  bio?: string;
  location?: string;
  joinedDate?: string;
  profileImage?: string;
  squadsCompleted?: number;
  interests?: string[];
  travelVibe?: string;
  lookingFor?: string[];
  languages?: string[];
  lifestyle?: Lifestyle;
  budgetRange?: "Budget" | "Moderate" | "Luxury";
  occupation?: string;
  education?: string;
  socialLinks?: SocialLinks;
  sexualOrientation?: "Straight" | "Gay" | "Lesbian" | "Bisexual" | "Queer" | "Asexual";
  personalityType?: "Introvert" | "Extrovert" | "Ambivert" | "Adventurer";
  communicationStyle?: "Fast Texter" | "Phone Caller" | "Video Chat" | "Bad at Texting" | "Voice Notes King";
  zodiac?: string;
  height?: string;
  datingIntention?: string;
  relationshipStatus?: string;
  kids?: string;
  promptQuestion?: string;
  promptAnswer?: string;
  compatibility?: number;
  lastActive?: string;
  online?: boolean;
}

// শুধু ক্যাশে যা স্টোর করা দরকার – হালকা রাখা
interface CachedUser {
  id: number;
  name: string;
  username: string;
  coin: string | null;
  profileImage?: string;
  // আর যা যা দরকার মনে করেন সেগুলো যোগ করতে পারেন
}

// =======================
// STATE
// =======================

interface UserState {
  isLoggedIn: boolean;
  user: UserData | null;
  isInitialized: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  isInitialized: false,
};

// =======================
// HELPERS
// =======================

const cacheUser = (user: UserData) => {
  try {
    localStorage.setItem("safarioo_auth", encrypt(user));
  } catch (err) {
    console.error("Failed to cache user:", err);
  }
};

// =======================
// SLICE
// =======================

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Hydrate from localStorage + cookie
    hydrateAuth: (state) => {
      if (typeof window === "undefined") return;

      const cached = localStorage.getItem("safarioo_auth");
      const token = Cookies.get("safarioo_token");

      if (cached && token) {
        const decrypted = decrypt(cached);
        if (decrypted && typeof decrypted === "object") {
          state.isLoggedIn = true;
          state.user = decrypted as UserData;
        } else {
          // Invalid cache → clear it
          localStorage.removeItem("safarioo_auth");
        }
      }
      state.isInitialized = true;
    },

    // Login successful
    loginSuccess: (state, action: PayloadAction<{ user: UserData; token: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;

      Cookies.set("safarioo_token", action.payload.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      cacheUser(action.payload.user);
    },

    // Server sync / refresh user data
    setUser: (state, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      // Deep merge – existing data keep হবে, নতুন data overwrite করবে
      state.user = state.user
        ? { ...state.user, ...action.payload }
        : action.payload;
      cacheUser(state.user);
    },

    // Logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      Cookies.remove("safarioo_token", { path: "/" });
      localStorage.removeItem("safarioo_auth");
    },

    // Update only profile image
    updateProfileImage: (state, action: PayloadAction<string>) => {
      if (!state.user) return;
      state.user.profileImage = action.payload;
      cacheUser(state.user);
    },

    // Update coins
    setCoins: (state, action: PayloadAction<string>) => {
      if (!state.user) return;
      state.user.coin = action.payload;
      cacheUser(state.user);
    },

    // Full/partial profile update with deep merge
    updateProfile: (state, action: PayloadAction<Partial<UserData>>) => {
      if (!state.user) return;

      const newUser: UserData = {
        ...state.user,
        ...action.payload,
      };

      // Lifestyle deep merge
      if (action.payload.lifestyle) {
        newUser.lifestyle = {
          ...state.user.lifestyle,
          ...action.payload.lifestyle,
        };
      }

      // Social links deep merge
      if (action.payload.socialLinks) {
        newUser.socialLinks = {
          ...state.user.socialLinks,
          ...action.payload.socialLinks,
        };
      }

      state.user = newUser;
      cacheUser(state.user);
    },

    // Online status / last active
    updatePresence: (
      state,
      action: PayloadAction<{ online: boolean; lastActive?: string }>
    ) => {
      if (!state.user) return;
      state.user.online = action.payload.online;
      if (action.payload.lastActive) {
        state.user.lastActive = action.payload.lastActive;
      }
      // Presence সাধারণত cache করার দরকার নেই – temporary data
    },
  },
});

// =======================
// EXPORTS
// =======================

export const {
  hydrateAuth,
  loginSuccess,
  logout,
  setUser,
  updateProfileImage,
  setCoins,
  updateProfile,
  updatePresence,
} = authSlice.actions;

export default authSlice.reducer;