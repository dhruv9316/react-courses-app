import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses : []
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addCourse(state, action) {
        if(state.enrolledCourses.length === 0){
            state.enrolledCourses.push(action.payload)
            return;
        }

        const isCoursePresent = state.enrolledCourses.find(item => item._id === action.payload._id)

        if(isCoursePresent) return;
        state.enrolledCourses.push(action.payload)
    },
    markCourseAsCompleted(state, action) {
        state.enrolledCourses[action.payload].isCourseCompleted = true
    }
  },
});

export const { addCourse, markCourseAsCompleted } = userSlice.actions;

export default userSlice.reducer;