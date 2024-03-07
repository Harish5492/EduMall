import axios from 'axios';
import { API_BASE_URL } from "./constants"

export const SignupApi = async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in SignupApi:', error);
    if (error.response) {
      const { data } = error.response;

      if (data.errors && data.errors.length > 0) {
        const firstError = data.errors[0];
        console.error('Server response error:', firstError);
        return { message: firstError.msg, status: false };
      } else {
        console.error('Server response:', data);
        return { message: data.message || 'Server error', status: false };
      }
    } else if (error.request) {
      console.error('No response received from the server');
      return { message: 'No response from the server', status: false };
    } else {
      console.error('Error in request setup:', error.message);
      return { message: 'Request setup error', status: false };
    }
  }
};

export const LoginApi = async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const checkEmailUniqueness = async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/generateOTP`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response.data);

    return response.data;

  } catch (error) {
    console.error(error, "eeeeeeeeeeee");
    throw error;
  }
};



export const sendTokenAndOTPToBackend = async (values) => {
  const { token } = values
  try {
    const response = await fetch(`${API_BASE_URL}/user/verifyOTP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, token }),
    });

    console.log(response, 'resppppppppp');
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updatePasswordOnBackend = async (values) => {
  const { password, confirmPassword, verifyToken } = values;
  try {
    const resp = await fetch(`${API_BASE_URL}/user/changePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        confirmPassword,
        verifyToken,
      }),
    });
    const data = await resp.json();
    console.log("Response from updatePasswordOnBackend:", data);
    return data
  } catch (error) {
    throw error;

  }
};

export const getAllCources = async () => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/user/allCourses`);
<<<<<<< HEAD
    const data = resp.data; 
=======
    const data = resp.data;
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
    console.log("Response from getAllCources", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}





<<<<<<< HEAD
export const getLessons = async (courseId,token) => {
=======
export const getLessons = async (courseId, token) => {
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
  try {
    const response = await axios.get(`${API_BASE_URL}/user/allCourses/${courseId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    })
    console.log('API response:', response.data);
    return response.data;

  } catch (error) {

  }

}


export const BillingApi = async (values, token) => {
<<<<<<< HEAD
  console.log(values,"values");
=======
  console.log(values, "values");
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
  try {
    const response = await axios.post(`${API_BASE_URL}/user/payment`, values, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const MyCourcesApi = async (token, values = {}) => {
  console.log(token, "tokentokentokentoken");
  try {
    const response = await axios.get(`${API_BASE_URL}/user/myCourses`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
      params: values,
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
<<<<<<< HEAD
    console.log(error,"????????????");
=======
    console.log(error, "????????????");
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
    return error.response;
  }
};

<<<<<<< HEAD
export const UserDetails = async( token) => {
=======
export const UserDetails = async (token) => {
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
  try {
    const response = await axios.get(`${API_BASE_URL}/user/profile`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    });
    console.log('API response:', response.data);
    return response.data;
<<<<<<< HEAD
    
=======

>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
  } catch (error) {
    return error
  }
}

<<<<<<< HEAD
export const ReffrelCodeApi = async( token) => {
=======
export const ReffrelCodeApi = async (token) => {
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
  try {
    const response = await axios.get(`${API_BASE_URL}/user/referalCode`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    });
    console.log('API response:', response.data);
    return response.data;
<<<<<<< HEAD
    
  } catch (error) {
    
=======

  } catch (error) {

>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
  }
}

export const getReffrelCodeApi = async (token, values) => {
  console.log(">>>>>>>>> token, values>>>>>>>>>>", token, values);
  try {
<<<<<<< HEAD
    const response = await axios.post(`${API_BASE_URL}/user/applyReferalCode`,values, {
=======
    const response = await axios.post(`${API_BASE_URL}/user/applyReferalCode`, values, {
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    });

    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.log("errrrrrrrrr", error);
    return error
  }
};
<<<<<<< HEAD
 
export const getAffileateApi = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/affiliationRequest`,{
=======

export const getAffileateApi = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/affiliationRequest`, {
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f

    },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-authorization': token,
        },
      }
    );
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);
<<<<<<< HEAD
    throw error; 
=======
    throw error;
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
  }
};

export const getAffileateStatusApi = async (token) => {
  try {
<<<<<<< HEAD
    const response = await axios.post(`${API_BASE_URL}/user/affiliateRequestStatus`,{
=======
    const response = await axios.post(`${API_BASE_URL}/user/affiliateRequestStatus`, {
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-authorization': token,
        },
      }
    );
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);
<<<<<<< HEAD
    throw error; 
=======
    throw error;
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
  }
};


export const updateUserDetails = async (_id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/updateUser/${_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.error('Error in updateUserDetails:', error);
<<<<<<< HEAD
    
=======

>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
    if (error.response) {
      const { data } = error.response;

      if (data.errors && data.errors.length > 0) {
        const firstError = data.errors[0];
        console.error('Server response error firstError:', firstError);
        return { message: firstError.msg, status: false };
      } else {
        console.error('Server response:', data);
        return { message: data.message || 'Server error', status: false };
      }
    } else if (error.request) {
      console.error('No response received from the server');
      return { message: 'No response from the server', status: false };
    } else {
      console.error('Error in request setup:', error.message);
      return { message: 'Request setup error', status: false };
    }
  }
};

<<<<<<< HEAD
export const AllQuestions = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/question/getAllQuestions`,{
=======
export const SubjectApi = async(token) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/question/getSubjects`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-authorization': token,
        },
      })
      console.log(response,"this is resp from SubjectApi");
      return response
  } catch (error) {
    console.log(error);
     return error
  }
}

export const AllQuestions = async (subject,token) => {
  console.log(subject,">>>>>>>>>>>>>");
  try {
    const response = await axios.get(`${API_BASE_URL}/question/getAllQuestions/${subject}`, {
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    })
<<<<<<< HEAD
    console.log("allquestionsresponse",response);
=======
    console.log("allquestionsresponse", response);
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
    return response
  } catch (error) {
    return error
  }
}

<<<<<<< HEAD
export const SubmitAnswers = async (token,values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/question/submit`,values,{
=======
export const SubmitAnswers = async (token, values,subject) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/question/submit`,  { ...values, subject }, {
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
      headers: {
        'Content-Type': 'application/json',
        'x-api-authorization': token,
      },
    })
<<<<<<< HEAD
    console.log("allquestionsresponse",response);
=======
    console.log("allquestionsresponse", response);
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
    return response
  } catch (error) {
    return error
  }
}
<<<<<<< HEAD
  
  
=======

export const OfflineCourcesApi = async (values) => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/ASB/getAllCourses`);
    const data = resp.data;
    console.log("Response from OfflineCourcesApi", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const ContactUsApi = async (values) => {
  try {
    const resp = await axios.post(`${API_BASE_URL}/ASB/asbStudentEnroll`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = resp.data;
    console.log("Response from ContactUsApi", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
