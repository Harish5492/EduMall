// import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { GetAffiliationRewards } from '../ApiBackend/ApiBackend'

// const Rewards = () => {
//     const token = useSelector((state) => state.authToken);
//     const [records, setRecords] = useState();
//     const [courseRecords, setCourseRecords] = useState([]);


//     const fetchRewards = async () => {
//         try {

//             const response = await GetAffiliationRewards(token);
//             if (response.status == 200) {
//                 console.log("this is course records", response.data.records.courseDetails[0].courseId);
//                 console.log("this is Title", response.data.records.courseDetails[0].courseId.title)
//                 setCourseRecords(response.data.records.courseDetails);
//                 setRecords(response.data.records);
//             }


//         } catch (error) {
//             console.error("Error fetching reqards", error);
//         }
//         // console.log("checking records----", records)
//     }
//     useEffect(() => {
//         fetchRewards();
//         // console.log("checking records----", records)
//     }, []);

//     return (
//         <div>
//             <p>this is records page</p>
//             <table border="1" className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>
//                             Affiliate Tkn</th>
//                         <th>
//                             CourseID</th>
//                         <th>Course Name</th>
//                         <th>Rewards</th>
//                         <th>OverAll Rewards</th>
//                     </tr>
//                 </thead>
//                 <tbody>

//                     {courseRecords.map((rec, index) => {
//                         <tr>
//                             <td>Token</td>
//                             <td>kayyyy</td>
//                             <td>{rec.courseId.title}</td>
//                             <td>{rec.courseId.rewards}</td>
//                             <td>Total rewards</td>

//                     </tr>

//                         })}



//                 </tbody>

//             </table>
//         </div>
//     )
// }

// export default Rewards;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetAffiliationRewards, SubAdminRequests } from '../ApiBackend/ApiBackend';
import { useWebSocket } from 'app/contexts/WebSocketContext';


const Rewards = () => {
    const token = useSelector((state) => state.authToken);

    const [record, setRecords] = useState();
    const [courseRecords, setCourseRecords] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [showWithdrawInput, setShowWithdrawInput] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [sentMessage, setSentMessage] = useState("");
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

    const handleSendMessage = () => {
        if (inputMessage && socket.readyState === WebSocket.OPEN) {
            socket.send(inputMessage);
            setSentMessage(inputMessage);
            setInputMessage("");
        }
    };


    const fetchRewards = async () => {
        try {
            const response = await GetAffiliationRewards(token);
            if (response.status == 200) {
                setCourseRecords(response.data.records.courseDetails);
                setRecords(response.data.records.totalRewards);
            }
        } catch (error) {
            console.error("Error fetching rewards", error);
        }

    };

    const handleWithdraw = async (amount) => {
        console.log("in reuesy to withdrawwww button", typeof (withdrawAmount))
        console.log("in reuesy to amount button", amount)

        if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
            try {
                const response = await SubAdminRequests(token, amount);
                console.log("In request to admin response", response);
                console.log("WebSocket reqards", socket);
            } catch (error) {
                console.error("Error withdrawing rewards", error);
            }
        }
        setShowWithdrawInput(false);
    }
    useEffect(() => {
        console.log("this is websocket");

        fetchRewards();
    }, [socket, showWithdrawInput]);

    return (

        <div>


            <div>
                <p>This is records page</p>
                <table border="1" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Affiliate Tkn</th>
                            <th>CourseID</th>
                            <th>Course Name</th>
                            <th>Rewards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseRecords?.map((rec, index) => (
                            <tr key={index}>
                                <td>Token</td>
                                <td>kayyyy</td>

                                <td> {(rec.courseId) ? rec.courseId.title : "Error"}</td>
                                <td>{parseFloat(rec.rewards).toPrecision(4)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3} className="extra"></td>
                            <td>
                                <span style={{ fontStyle: 'bold' }}>Total Rewards:</span>{' '}
                                {parseFloat(record).toPrecision(4)}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={3} className="extra2" style={{ background: '#00000000' }}></td>
                            <td style={{ background: '#00000000' }}>
                                {showWithdrawInput ? (
                                    <div>
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
    );

}

export default Rewards;


