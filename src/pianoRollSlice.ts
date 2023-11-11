import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { MidiPitchNumber } from './midi';
import type { RootState } from './store';

// Define a type for the slice state
interface CounterState {
  isPressed: boolean[];
}

// Define the initial state using that type
const initialState: CounterState = {
  isPressed: _.range(MidiPitchNumber.C1, MidiPitchNumber.B7 + 1).map(() => false)
};

export const counterSlice = createSlice({
  name: 'pianoRoll',
  initialState,
  reducers: {
    togglePressed: (state, action: PayloadAction<MidiPitchNumber>) => {
      const index = action.payload - MidiPitchNumber.C1;
      state.isPressed[index] = !state.isPressed[index];
    }
  }
});

export const { togglePressed } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.pianoRoll.isPressed;

export default counterSlice.reducer;