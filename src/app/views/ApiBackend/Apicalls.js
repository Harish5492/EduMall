
import { GetCoursesById,GetLessonsById,EditCource,EditLesson } from "./ApiBackend";
 export const CourseDetails = async (token,courseId) => {
   try {
     const response = await GetCoursesById(token, courseId);
     if (response.status === 200) {
       return response;
     }
    
   } catch (error) {
     console.error("Error fetching data", error);
   }
};
 
export const FetchLessons = async (token,courseId) => {
  try {
    const response = await GetLessonsById(token, courseId);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error fetching lessons", error);
  }

};

export const CourseEdit = async (token, courseId, updatedValues) => {
  try {
    const res = await EditCource(token, {
      _id: courseId,
      values: updatedValues,
    });
    if (res && res.message === "updated successfully") {
      return true;
    }
  }catch (error) {
    console.error("Error updating course details:", error);
  }
};

export const LessonEdit = async (token, lessonId, updatedValues) => {
  try {
    const res = await EditLesson(token, {
      _id: lessonId,
      values: updatedValues,
    });
    if (res && res.message === "updated successfully") {
      return true;
    }
  } catch (error) {
    console.error("Error updating course details:", error);
  }
};