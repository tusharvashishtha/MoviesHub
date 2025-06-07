import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}
export const PeopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {

    loadpeople: (state, action) => {
        state.info = action.payload;
    },
    removepeople: (state, action) => {
        state.info = null;
    }
  },
})


export const { loadpeople, removepeople } = PeopleSlice.actions

export default PeopleSlice.reducer