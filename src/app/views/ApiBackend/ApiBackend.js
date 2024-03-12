import axios from "axios";
import { Base_url } from "./BaseUrl";

export const LoginApi = async (values) => {
  try {
    const response = await axios.post(
      `${Base_url}/admin/adminArea/login`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API response og Login:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const SignupApi = async (values) => {
  try {
    const response = await axios.post(
      `${Base_url}/admin/adminarea/signup`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in SignupApi:", error);
    if (error.response) {
      const { data } = error.response;

      if (data.errors && data.errors.length > 0) {
        const firstError = data.errors[0];
        console.error("Server response error:", firstError);
        return { message: firstError.msg, status: false };
      } else {
        console.error("Server response:", data);
        return { message: data.message || "Server error", status: false };
      }
    } else if (error.request) {
      console.error("No response received from the server");
      return { message: "No response from the server", status: false };
    } else {
      console.error("Error in request setup:", error.message);
      return { message: "Request setup error", status: false };
    }
  }
};

export const Profile = async (token) => {
  try {
    const response = await axios.get(`${Base_url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    return response;
  } catch (error) {
    console.error("This is Error in Profile", error);
  }
};

export const Details = async (token) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/dashboard`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("In Details API", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const AllCourses = async (token, values) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/allCourses`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const ASBCourse = async (token) => {
  try {
    const response = await axios.get(`${Base_url}/ASB/getAllCourses`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const GetAllDetails = async (token, values) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/payment/getAllDetails`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const AddCource = async (token, values) => {
  const {
    title,
    description,
    instructor,
    imageUrl,
    duration,
    language,
    level,
    price,
    requirements,
    subject,
  } = values;
  try {
    const resp = await fetch(`${Base_url}/admin/adminArea/addCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
      body: JSON.stringify({
        title,
        description,
        instructor,
        imageUrl,
        duration,
        language,
        level,
        price,
        requirements,
        subject,
      }),
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
};
export const AddASBCource = async (token, values) => {
  const {
    title,
    description,
    instructor,
    imageUrl,
    duration,
    language,
    level,
    price,
    requirements,
    subject,
  } = values;
  try {
    const resp = await fetch(`${Base_url}/ASB/addCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
      body: JSON.stringify({
        title,
        description,
        instructor,
        imageUrl,
        duration,
        language,
        level,
        price,
        requirements,
        subject,
      }),
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteCourse = async (token, _id) => {
  try {
    const response = await axios.delete(
      `${Base_url}/admin/adminArea/deleteCourse/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const DeleteASBCourse = async (token, _id) => {
  try {
    const response = await axios.delete(`${Base_url}/ASB/deleteCourse/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const DeleteLesson = async (token, _id) => {
  try {
    const response = await axios.delete(
      `${Base_url}/admin/adminArea/deleteLesson/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const getCourse = async (token, _id) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/getCourse/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const EditCource = async (token, { _id, values }) => {
  try {
    const response = await axios.post(
      `${Base_url}/admin/adminArea/updateCourse/${_id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const EditASBCourse = async (token, { _id, values }) => {
  try {
    const response = await axios.post(
      `${Base_url}/ASB/updateCourse/${_id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const EditLesson = async (token, { _id, values }) => {
  const { title, content, videoUrl } = values;
  try {
    const response = await axios.post(
      `${Base_url}/admin/adminArea/updateLesson/${_id}`,
      JSON.stringify({ title, content, videoUrl }),
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const GetPaymentHistory = async (
  token,
  item = 10,
  page = 1,
  searchQuery = "",
  signal
) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/payment/getDetails/?page=${page}&itemsPerPage=${item}&search=${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
        cancelToken: signal ? signal.token : undefined,
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const GetPaymentHistoryById = async (token, userId) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/getUserbyID/${userId}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const GetCoursesById = async (token, courseId) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/getCourse/${courseId}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const ASBCoursesById = async (token, courseId) => {
  try {
    const response = await axios.get(
      `${Base_url}/ASB/getCourseById/${courseId}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const GetLessonsById = async (token, courseId) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/allcourses/${courseId}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const AddLesson = async (token, values) => {
  try {
    const resp = await axios.post(
      `${Base_url}/admin/adminArea/addMultipleLesson`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

export const GetReferralLink = async (
  token,
  item = 10,
  page = 1,
  searchQuery = ""
) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/pendingRequests/?page=${page}&itemsPerPage=${item}&search=${searchQuery}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const GetAffilaiteLink = async (token, courseId) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/courseLink/${courseId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("Error in GetAffilaiteLink", error);
  }
};

export const handleRequest = async (requestId, status, token, remarks) => {
  try {
    const response = await axios.post(
      `${Base_url}/admin/adminArea/affiliationRequestAction/${requestId}`,

      {
        status: status,
        remarks: "remarks",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};

export const GetAffiliationRewards = async (token) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/affiliationRecords`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("GetRewards API", response);
    return response;
  } catch (error) {
    console.error("Error in GetAffiliationRecords", error);
  }
};

export const SubAdminRequests = async (token, amount) => {
  try {
    const response = await axios.post(
      `${Base_url}/admin/adminArea/subAdminRequests`,
      { amount },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("Sub Admin Requetes API", response);

    return response;
  } catch (error) {
    console.error("Error in Sub Admin Requetes ", error);
  }
};
export const pendingRewardRequests = async (token) => {
  try {
    const response = await axios.get(
      `${Base_url}/admin/adminArea/pendingRewardRequests`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    console.log("Pending Rewards API", response);

    return response;
  } catch (error) {
    console.error("Error in SUbAdminRequests", error);
  }
};

export const sendToSubAdmin = async (token, totalPrice, _id) => {
  try {
    const response = await axios.post(
      `${Base_url}/admin/adminArea/sendAmountToSubAdmin`,
      { totalPrice, _id },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in sendToSubAdmin", error);
  }
};

export const Questions = async (token, values) => {
  console.log("i am i questio napi", values);
  try {
    const resp = await axios.post(`${Base_url}/question/addQuestions`, values, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    console.log("i am i questio response", resp);
    return resp;
  } catch (error) {
    return error;
  }
};
export const SubDetail = async (token) => {
  // console.log("i am i questio napi", values);
  try {
    const resp = await axios.get(`${Base_url}/question/getSubjectsCount`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    console.log("i am i subject response", resp);
    return resp;
  } catch (error) {
    return error;
  }
};

export const allQuestions = async (token) => {
  console.log("iam in the question all api");
  try {
    const response = await axios.get(`${Base_url}/question/getAllQuestions`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-authorization": token,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in allQuestions", error);
  }
};
export const deleteQuestion = async (token, id) => {
  console.log("iam in the question delete api", id, token);
  try {
    const response = await axios.delete(
      `${Base_url}/question/deleteQuestion/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );

    console.log("i am i questio delete response", response);
    return response;
  } catch (error) {
    console.log("Error in deleteQuestion", error);
  }
};
export const updateQuestion = async (token, id, values) => {
  console.log("iam in the question patch api", id, token);
  try {
    const response = await axios.put(
      `${Base_url}/question/updateQuestion/${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );

    console.log("i am i questio patch response", response);
    return response;
  } catch (error) {
    console.log("Error in deleteQuestion", error);
  }
};
export const questionById = async (token, id) => {
  console.log("iam in the getSUbid patch api", id, token);
  try {
    const response = await axios.get(
      `${Base_url}/question/getQuestion/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
      }
    );

    console.log("i am i getquestBy id response", response);
    return response;
  } catch (error) {
    console.log("Error in getBuidQuesuestion", error);
  }
};
