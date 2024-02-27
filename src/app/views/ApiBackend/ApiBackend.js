import axios from "axios";
import { Base_url } from "./BaseUrl";

export const LoginApi = async (values) => {
  try {
    console.log("OKOKOK", values);
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

export const Profile = async (token) => {
  try {
    const response = await axios.get(`${Base_url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        "token":token
      },
    });
    return response;
  } catch (error) {
    console.error("This is Error in Profile", error);
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
    console.log("API response:", response);
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
    console.log("API response:", response);
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
    console.log("AddCourse is added successfully:", data);
    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteCourse = async (token, _id) => {
  console.log("iam inn");
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
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.log("EEE", error);
    return error;
  }
};
export const DeleteLesson = async (token, _id) => {
  console.log("iam inn deleyeimbg lessons");
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
  console.log("iam inn");
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
  console.log(values, "reqqqqqqq");
  console.log("iam inn");
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
export const EditLesson = async (token, { _id, values }) => {
  console.log(values, "reqqqqqqq");
  console.log("iam inn Lessons");
  const { title, content, videoUrl } = values;
  // console.log("Tokem  ",token)
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
// export const AddLesson = async (token,courseId,values) => {

//   const obj = [
//     {
//       title,
//       content,
//       videoUrl,
//     },
//   ];

//   console.log("values", obj);
//   try {
//     const resp = await fetch(`${Base_url}/admin/adminArea/addMultipleLesson`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-authorization": token,
//       },
//       body: JSON.stringify({

//         obj,
//         course: "657ff9b6d80be2372caff21d",
//       }),
//     });
//     const data = await resp.json();
//     console.log("AddCourse is added successfully:", data);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

// export const AddLesson = async (token, values) => {
//   const { lessons, course } = values;
//   console.log("values", values);
//   console.log("iddd", course);

//   try {
//     const resp = await axios.post( `${Base_url}/admin/adminArea/addMultipleLesson`,
//       JSON.stringify({
//         lessons,
//         course,
//       }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-authorization": token,
//         },
//       }
//     );

//     const data = await resp;
//     console.log("AddLesson is added successfully:", data);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

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
    console.log(resp, "tharts my response");
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
    // console.log("Token ", localStorage.getItem("token"))
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
  // const status = status;
  console.log("ssss", status);
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
    console.log("Trstngs")
    const response = await axios.post(
      `${Base_url}/admin/adminArea/subAdminRequests`,
      {amount},
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },
       
      }
    );
    console.log("SubADminRequetes API", response);
    console.log("token checking", token);

    return response;
  } catch (error) {
    console.error("Error in SUbAdminRequests", error);
  }
};
export const pendingRewardRequests = async (token) => {
  try {
    console.log("this is in pendingRewardsRequests")
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

export const sendToSubAdmin = async (token,totalPrice,_id) => {
  try {
    const response = await axios.post(
      `${Base_url}/admin/adminArea/sendAmountToSubAdmin`,
      { totalPrice,_id },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-authorization": token,
        },

      }
    );
    return response;
    // console.log("Response from sendToSUbadmin", response);
  }
  catch(error){
    console.log("Error in sendToSubAdmin", error);
  }
}