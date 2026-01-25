import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- TYPES ---

interface Lifestyle {
  // UI-এর "Socially", "Regularly" অপশনগুলোর সাথে সিঙ্ক করা হয়েছে
  smoking: "Yes" | "No" | "Sometimes" | "Socially" | "Regularly" | "Prefer not to say";
  drinking: "Yes" | "No" | "Sometimes" | "Socially" | "Regularly" | "Prefer not to say";
  pets: "Yes" | "No" | "Cats" | "Dogs" | "Allergic" | "Prefer not to say";
}

interface SocialLinks {
  instagram?: string;
  website?: string;
  twitter?: string;
}

export interface UserData {
  id: string;
  name: string;
  mobile: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  coins: number;
  trustScore: number;
  bio?: string;
  location?: string;
  verified: boolean;
  joinedDate?: string;
  profileImage?: string;
  squadsCompleted?: number;

  interests: string[];
  travelVibe: string;
  lookingFor?: string[];                    
  languages?: string[];                     
  lifestyle?: Lifestyle;
  budgetRange?: "Budget" | "Moderate" | "Luxury";

  // Career & Social
  occupation?: string;                      
  education?: string;                       
  socialLinks?: SocialLinks;

  // --- NEW DATING APP FEATURES ---
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
  showOrientationOnProfile?: boolean;

  // Public/Realtime info
  compatibility?: number;                   
  lastActive?: string;                      
  online?: boolean;                         
}

interface UserState {
  isLoggedIn: boolean;
  user: UserData | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

// --- SLICE ---

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        const savedAuth = localStorage.getItem("safarioo_auth");
        if (savedAuth) {
          try {
            const parsed = JSON.parse(savedAuth);
            state.isLoggedIn = parsed.isLoggedIn;
            state.user = parsed.user;
          } catch (error) {
            console.error("Failed to parse saved auth:", error);
            localStorage.removeItem("safarioo_auth");
          }
        }
      }
    },

    loginSuccess: (state, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("safarioo_auth", JSON.stringify(state));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("safarioo_auth");
    },

    updateProfileImage: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profileImage = action.payload;
        localStorage.setItem("safarioo_auth", JSON.stringify(state));
      }
    },

    addCoins: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.coins = (state.user.coins || 0) + action.payload;
        localStorage.setItem("safarioo_auth", JSON.stringify(state));
      }
    },

    updateProfile: (
      state,
      action: PayloadAction<Partial<UserData>> 
    ) => {
      if (state.user) {
        // Deep merge নিশ্চিত করার জন্য spread ব্যবহার করা হয়েছে
        state.user = {
          ...state.user,
          ...action.payload,
          // Lifestyle এবং SocialLinks নেস্টেড অবজেক্ট তাই এদের আলাদাভাবে স্প্রেড করতে হবে
          lifestyle: action.payload.lifestyle 
            ? { ...state.user.lifestyle, ...action.payload.lifestyle } as Lifestyle
            : state.user.lifestyle,
          socialLinks: action.payload.socialLinks 
            ? { ...state.user.socialLinks, ...action.payload.socialLinks } as SocialLinks
            : state.user.socialLinks,
        };

        localStorage.setItem("safarioo_auth", JSON.stringify(state));
      }
    },

    updatePresence: (
      state,
      action: PayloadAction<{ online: boolean; lastActive?: string }>
    ) => {
      if (state.user) {
        state.user.online = action.payload.online;
        if (action.payload.lastActive !== undefined) {
          state.user.lastActive = action.payload.lastActive;
        }
        // প্রিজেন্স আপডেট সাধারণত লোকাল স্টোরেজে বার বার সেভ করার দরকার হয় না (পারফরম্যান্সের জন্য)
      }
    },
  },
});

export const {
  hydrateAuth,
  loginSuccess,
  logout,
  updateProfileImage,
  addCoins,
  updateProfile,
  updatePresence,
} = authSlice.actions;

export default authSlice.reducer;