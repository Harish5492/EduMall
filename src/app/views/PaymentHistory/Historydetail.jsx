import React from 'react';
import { useParams } from 'react-router-dom';
import { GetPaymentHistoryById } from '../ApiBackend/ApiBackend';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Loading from 'app/components/MatxLoading';
import "./index.css";


const Historydetail = () => {
  const token = useSelector((state) => state.authToken);
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {

        const response = await GetPaymentHistoryById(token, userId);
        if (response.status === 200) {
          setUserDetails(response.data.userData);
        } else {
          return ('Network response was not ok', response.status);
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    fetchUserDetails();

  }, [userId]);

  return (

    <>
      <div className="container mt-4 mb-4 p-3 d-flex flex-column justify-content-center align-items-center">
        <h2> User Details</h2>
        {userDetails ? (


          <div className="useCard p-4">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
              <button className="rounded-btn btn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button>
              <span className="name mt-3">{userDetails.userName} </span>
              <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <span><i className="fa fa-copy"></i></span>
              </div>

              <div className="txt mt-3">
                <span> <strong>User ID:</strong> {userId}<br />

                  <br />
                  <strong>Email: </strong>{userDetails.email}<br />

                  <br />
                  <strong>First Name:</strong>{userDetails.firstName}<br />

                  <br />
                  <strong>Last Name:</strong>{userDetails.lastName}<br />

                  <br /> </span>
              </div>
              <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                <span><i className="fa fa-twitter"></i></span>
                <span><i className="fa fa-facebook-f"></i></span>
                <span><i className="fa fa-instagram"></i></span>
                <span><i className="fa fa-linkedin"></i></span>
              </div>
              {/* <div className=" px-2 rounded mt-4 date "> <span className="join">Joined May,2021</span>
        </div> */}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default Historydetail;


