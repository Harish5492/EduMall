import React, { useEffect, useState } from 'react';
import "./Quiz.scss";
import { SubjectApi } from "../../Api";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const token = useSelector((state) => state.user.token);
    const [subjects, setSubjects] = useState([])
    const navigate = useNavigate()
    console.log(subjects);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await SubjectApi(token)
            console.log(resp, ">>>>>>>>>>>>>>");
            setSubjects(resp.data.subjects)
        }
        fetchData()
    }, [token])

    const handleClick = (clickedSubject) => {
        navigate(`/auth/questionAnswers/${clickedSubject}`)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {subjects.map((subject, index) => (
                        <div key={index} className="col-md-4" onClick={() => handleClick(subject)}>
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className='box'>
                                        <h2>{subject}</h2>
                                        <p>try our test for free</p>
                                        <button>Start Quiz</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Quiz;
