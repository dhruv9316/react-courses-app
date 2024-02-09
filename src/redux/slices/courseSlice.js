import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseDetails : {}
};

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    setCourseDetails(state, action) {
      state.courseDetails = action.payload;
    }
  },
});

export const { setCourseDetails } = courseSlice.actions;

export default courseSlice.reducer;