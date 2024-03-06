import { ASBCourseEdit } from "../../ApiBackend/Apicalls";


export const submitCourseChanges = async (token, courseId, updatedValues, toast) => {
    try {
        const res = await ASBCourseEdit(token, courseId, updatedValues);
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

