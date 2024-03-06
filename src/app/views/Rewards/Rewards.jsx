
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetAffiliationRewards, SubAdminRequests } from '../ApiBackend/ApiBackend';
import { useWebSocket } from 'app/contexts/WebSocketContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./Reward.css"


const Rewards = () => {
    const token = useSelector((state) => state.authToken);

    const [record, setRecords] = useState();
    const [courseRecords, setCourseRecords] = useState([]);
    // const [inputMessage, setInputMessage] = useState("");
    const [showWithdrawInput, setShowWithdrawInput] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [receivedMessage, setReceivedMessage] = useState("");

    const socket = useWebSocket();

    useEffect(() => {
        const handleMessage = (event) => {
            const message = event.data;
            setReceivedMessage(message);
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket]);

    const fetchRewards = async () => {
        try {
            const response = await GetAffiliationRewards(token);
            if (response.status === 200) {
                setCourseRecords(response.data.records.courseDetails);
                setRecords(response.data.records.totalRewards);
            }
        } catch (error) {
            console.error("Error fetching rewards", error);
        }

    };

    const handleWithdraw = async (amount) => {


        if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
            try {
                const response = await SubAdminRequests(token, amount);

                if (response.status) {

                    toast.success("Request Sent Successfully", {
                        position: "top-center",
                        autoClose: 1000,
                        theme: "colored"
                    });

                }
            } catch (error) {
                console.error("Error withdrawing rewards", error);
            }
        }
        setShowWithdrawInput(false);
    }
    useEffect(() => {


        fetchRewards();
    }, [showWithdrawInput]);

    return (

        <>
            <div id='page-content' style={{ paddingTop: "30px" }} >
                <h1 >Payment History</h1>
                <div className="padding" style={{ marginTop: "50px" }} >
                    <div className="row container d-flex justify-content-center" style={{ margin: "auto" }}>
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                            <div className="position-relative">
                                <span className="position-absolute search"><i className="fa fa-search"></i></span>

                            </div>
                        </div>


                        <div className="table-responsive" >
                            <table className="table fl-table table-hover">
                                <thead>
                                    <tr className="bg-light">
                                        {/* <th scope="col" width="5%">Affiliate Tkn</th>
                                        <th scope="col" width="20%">CourseID</th> */}
                                        <th scope="col" width="20%">Course Name</th>
                                        <th scope="col" width="20%">Link Created On</th>
                                        <th scope="col" width="20%">Rewards Received</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {courseRecords?.map((rec, index) => (
                                        <tr key={index}>

                                            <td> {(rec.courseId) ? rec.courseId.title : "Error"}</td>
                                            <td>{new Date(rec.created_on).toLocaleString("en-IN")}</td>
                                            <td>{parseFloat(rec.rewards).toPrecision(4)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={2} className="extra"></td>
                                        <td>
                                            <span style={{ fontStyle: 'bold', fontWeight: 800 }}>Rewards Left:</span>{' '}
                                            {parseFloat(record).toPrecision(4)}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2} className="extra2" style={{ background: '#00000000' }}></td>
                                        <td style={{ background: '#00000000' }}>
                                            {showWithdrawInput ? (
                                                <div className='withdraw'>
                                                    <input
                                                        type="number"
                                                        placeholder="Enter amount"
                                                        value={withdrawAmount}
                                                        onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
                                                    />
                                                    <button
                                                        className="btn btn-primary"
                                                        style={{
                                                            width: 'fit-content',
                                                            height: '30px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                        onClick={() => handleWithdraw(withdrawAmount)}
                                                    >
                                                        Withdraw
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn btn-primary"
                                                    style={{
                                                        width: 'fit-content',
                                                        height: '30px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                    onClick={() => setShowWithdrawInput(true)}
                                                >
                                                    Withdraw Rewards
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div >
            </div>
            <ToastContainer />

        </>
    );

}

export default Rewards;


