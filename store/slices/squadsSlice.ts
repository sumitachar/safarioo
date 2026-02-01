import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SquadBasic {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  members: string;
  status: "Upcoming" | "Completed" | "live";
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
  byId: Record<string, SquadBasic>;       // id → squad
  byCode: Record<string, SquadBasic>;     // squad_code → squad (নতুন)
}

const initialState: SquadsState = {
  squads: [],
  byId: {},
  byCode: {},
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
  },
});

export const { setSquads, updateSquad } = squadsSlice.actions;
export default squadsSlice.reducer;