import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courseData: [],
  },
  reducers: {
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    restCourseData: (state, action) => {
      state.courseData = [];
    },
  },
});

export const { setCourseData  , restCourseData} = coursesSlice.actions;
export default coursesSlice.reducer;
