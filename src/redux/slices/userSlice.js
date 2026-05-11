import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;