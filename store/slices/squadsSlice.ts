import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// টাইপ ডিফাইন
export type SquadCategory = "Travel" | "Movie" | "Event" | "Hangout";
export type SquadTab = 'joined' | 'hosted' | 'agency';

export interface SquadBasic {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  members: string;
  status: "Upcoming" | "Completed" | "live";
  images: string[]; 
  cost: string;
  duration: string;
  gender: string;
  ageGroup: string;
  tags: string[] | null;
  squad_code: string;
  user_id?: number;
  description?: string;
  requestCount?: number;
}

interface SquadsState {
  squads: SquadBasic[];
  byId: Record<string, SquadBasic>;
  byCode: Record<string, SquadBasic>;
  activeCategory: SquadCategory;
  activeTab: SquadTab;
}

/**
 * LocalStorage থেকে ডাটা লোড করার হেল্পার ফাংশন
 */
const getSavedCategory = (): SquadCategory => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('squad_active_category');
    return (saved as SquadCategory) || "Travel";
  }
  return "Travel";
};

const getSavedTab = (): SquadTab => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('squad_active_tab');
    return (saved as SquadTab) || "hosted";
  }
  return "hosted";
};

const initialState: SquadsState = {
  squads: [],
  byId: {},
  byCode: {},
  activeCategory: getSavedCategory(), // রিফ্রেশ করলেও এখান থেকে ডাটা পাবে
  activeTab: getSavedTab(),
};

const squadsSlice = createSlice({
  name: 'squads',
  initialState,
  reducers: {
    setSquads: (state, action: PayloadAction<SquadBasic[]>) => {
      state.squads = action.payload;

      state.byId = action.payload.reduce((acc, squad) => {
        acc[squad.id] = squad;
        return acc;
      }, {} as Record<string, SquadBasic>);

      state.byCode = action.payload.reduce((acc, squad) => {
        if (squad.squad_code) {
          acc[squad.squad_code] = squad;
        }
        return acc;
      }, {} as Record<string, SquadBasic>);
    },

    updateSquad: (state, action: PayloadAction<SquadBasic>) => {
      const squad = action.payload;
      state.byId[squad.id] = squad;
      if (squad.squad_code) {
        state.byCode[squad.squad_code] = squad;
      }
    },

    setActiveCategory: (state, action: PayloadAction<SquadCategory>) => {
      state.activeCategory = action.payload;
      // LocalStorage-এ সেভ করা হচ্ছে
      if (typeof window !== 'undefined') {
        localStorage.setItem('squad_active_category', action.payload);
      }
    },

    setActiveTab: (state, action: PayloadAction<SquadTab>) => {
      state.activeTab = action.payload;
      // LocalStorage-এ সেভ করা হচ্ছে
      if (typeof window !== 'undefined') {
        localStorage.setItem('squad_active_tab', action.payload);
      }
    },
  },
});

export const { setSquads, updateSquad, setActiveCategory, setActiveTab } = squadsSlice.actions;
export default squadsSlice.reducer;