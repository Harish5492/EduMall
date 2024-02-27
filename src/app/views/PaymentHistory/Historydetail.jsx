import React from 'react';
import { useParams } from 'react-router-dom';
import { GetPaymentHistoryById } from '../ApiBackend/ApiBackend';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


const Historydetail = () => {
  const token = useSelector((state) => state.authToken);
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {

        const response = await GetPaymentHistoryById(token, userId);
        console.log("this is response data", response);
        if (response.status === 200) {
          console.log("prespnosfaegfryukdl", response.data);
          setUserDetails(response.data.userData);
          console.log(response.data, "userDetailssssssssssss");
        } else {
          return ('Network response was not ok', response.status);
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

      console.log(userDetails, "userDetailssssssssssss");
    }
    fetchUserDetails();

  }, [userId]);

  return (
    <>
      <div>
        <h1>User Details </h1>
        {userDetails ? (
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">{userDetails.userName} User</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"> User ID: {userId}</li>
              <li className="list-group-item">Email: {userDetails.email}</li>
              <li className="list-group-item">First Name: {userDetails.firstName}</li>
              <li className="list-group-item">Last Name: {userDetails.lastName}</li>

            </ul>

          </div>

        ) : (
          <p>Loading user data...</p>
        )}




      </div>
    </>
  );
}

export default Historydetail;
