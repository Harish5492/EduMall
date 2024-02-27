import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { pendingRewardRequests, sendToSubAdmin } from '../ApiBackend/ApiBackend';
import { useWebSocket } from 'app/contexts/WebSocketContext';
import "../Affiliate/Affiliate.css"


const Requests = () => {
    const socket = useWebSocket();
    const [messages, setMessages] = useState([]);
    const [request, setRequests] = useState([]);
    const token = useSelector((state) => state.authToken);

    const fetchRequests = async () => {
        try {

            const response = await pendingRewardRequests(token);
            console.log("in request of Requests", response);
            setRequests(response.data.allRequests);
            console.log("this is the id", response.data.allRequests[0].subAdminID);
        }
        catch (error) {
            console.error("Error fetching requests", error);
        }
    }


    const handlePayout = async (amount, subId) => {
        let url = '';
        try {

            const response = await sendToSubAdmin(token, amount, subId);
            if (response.status == 200) {
            }
            url = response.data;
            console.log("this is the response from SenttoSunadmn", response);
            window.open(url, '_blank');



        } catch (error) {
            console.error("Error paying out", error);
        }
    }


    useEffect(() => {
        const handleMessage = (event) => {
            const message = {
                text: event.data,
                timestamp: new Date().toLocaleTimeString(),
            };


            setMessages((prevMessages) => [...prevMessages, message]);
        };

        fetchRequests();

        socket.addEventListener('message', handleMessage);

        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket,messages]);

    return (
        <div>
            <h1>Gmail Inbox</h1>
            <div className="table-responsive">
                <table className="table fl-table">
                    <thead>
                        <tr className="bg-light">
                            <th scope="col" width="10%%">Requested On</th>
                            <th scope="col" width="10%">Id</th>
                            <th scope="col" width="20%">Amount Req</th>
                            <th scope="col" width="20%">Operation</th>

                        </tr>
                    </thead>
                    <tbody>
                        {request?.length >= 0 && request?.map((requestss) => (
                            <tr key={requestss._id}>
                                <td>
                                    {new Date(requestss.requested_on).toLocaleString("en-IN")}
                                </td>

                                <td className="email">
                                    {requestss.
                                        subAdminEmail
                                        !== undefined && requestss.
                                            subAdminEmail
                                        !== null ? (

                                        requestss.
                                            subAdminEmail


                                    ) : (
                                        <span>No Mail Provided</span>
                                    )}
                                </td>
                                <td>

                                    {requestss.amount}
                                </td>
                                <td>
                                    <button className='btn btn-success ' onClick={() => { handlePayout(requestss.amount, requestss.subAdminID) }} >Accept</button>
                                    <button className='btn btn-danger' >Reject</button>
                                </td>


                            </tr>
                        ))

                        }
                        {request?.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{
                                    color: "grey",
                                    textAlign: "center"
                                }}>No Results Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Requests;


