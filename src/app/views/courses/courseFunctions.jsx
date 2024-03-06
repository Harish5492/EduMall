import { CourseEdit, LessonEdit } from "../ApiBackend/Apicalls";
import { DeleteLesson, AddLesson } from "../ApiBackend/ApiBackend";


export const submitCourseChanges = async (token, courseId, updatedValues, toast) => {
    try {
        const res = await CourseEdit(token, courseId, updatedValues);
        if (res) {
            toast.success('Successfully saved!', {
                position: "top-center",
                autoClose: 1000,
                theme: "colored"
            });
        }
    } catch (error) {
        console.error('Error updating course details:', error);
    }
};

export const submitLessonChanges = async (token, lessonId, lessons, toast) => {
    const lessonToUpdate = lessons.find(lesson => lesson._id === lessonId);
    if (!lessonToUpdate) {
        console.error('Lesson not found for id:', lessonId);
        return;
    }

    const updatedValues = {
        title: lessonToUpdate.title,
        content: lessonToUpdate.content,
        videoUrl: lessonToUpdate.videoUrl
    };
    try {
        const response = await LessonEdit(token, lessonId, updatedValues);
        if (response) {
            toast.success('Successfully saved!', {
                position: "top-center",
                autoClose: 1000,
                theme: "colored"
            });
        }
    } catch (error) {
        console.error('Error updating lesson details:', error);
    }
};

export const addNewLesson = async (token, index, lessonForms, courseId, setLessonForms, handleFetchLessons, toast) => {
    const formData = lessonForms[index];

    try {
        const res = await AddLesson(token, { lessons: [formData], course: courseId });
        if (res.status === 200) {
            toast.success("Lesson Added Successfully", {
                position: "top-center",
                autoClose: 1000,
                theme: "colored"
            });
            setLessonForms((prevForms) => prevForms.filter((_, i) => i !== index));
            handleFetchLessons();
        }
    } catch (error) {
        console.error('Error adding new lesson:', error);
    }
};

export const confirmDeleteLesson = async (token, lessonId, toast, handleFetchLessons) => {
    try {
        toast.dismiss();
        const res = await DeleteLesson(token, lessonId);
        if (res.status) {
            toast.error('Lesson deleted successfully!', {
                position: "top-center",
                autoClose: 1000,
                theme: "colored"
            });
            handleFetchLessons();
        }
    } catch (error) {
        console.error('Error deleting lesson:', error);
    }
};
