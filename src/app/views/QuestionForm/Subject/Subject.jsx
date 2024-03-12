import React from 'react'
import { useState } from "react";
import { Button } from '@mui/material'
// import McqForm from './QuestionForm';
import { SubDetail } from 'app/views/ApiBackend/ApiBackend';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from 'app/components/MatxLoading';
import McqForm from '../QuestionForm';
import { ToastContainer } from 'react-toastify';
import { SubjectDetails } from './SubjectDetails';

const Subject = () => {
    const [showForm, setShowForm] = useState(false);
    const [subDetail, setSubDetail] = useState([]);
    const token = useSelector((state) => state.authToken);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const showFormModal = () => {
        console.log("show form modal");

        setShowForm(true);
    }
    const closeFormModal = () => {

        setShowForm(false);
    }
    const fetchSubject = async () => {
        try {
            const response = await SubDetail(token);
            console.log("this is rsubject rsponse", response);
            setLoading(false)
            setSubDetail(response.data.subjects);
            console.log("this is data .subject response", response.data.subjects)
        }
        catch (error) {
            console.error("Error fetcing requests,", error);
        }
    }
    useEffect(() => {
        fetchSubject();
    }, []);


    return (
        <>{loading ?
            <div className="loader"><Loading /></div> :
            <>
                <div className='sub_top'>
                    <h1>Courses</h1>
                    <div className="search-filter">
                        <form className="d-flex" role="search" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <input className="form-control me-2" type="search" value={search}
                                onChange={(e) => setSearch(e.target.value)} placeholder="Search Course" aria-label="Search" />
                        </form>
                    </div>
                    <Button variant="primary" onClick={showFormModal}>Add Question</Button>

                </div>

                <table className="courses-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subDetail && subDetail.length > 0 && subDetail?.map((item, index) => (

                            <SubjectDetails
                                // token={token}
                                // key={course._id}
                                subDetail={item}
                                index={index}
                            // handleDelete={handleDelete}
                            />
                        ))}

                    </tbody>
                </table>
                <McqForm formisOpen={showForm} formonClose={closeFormModal} />
                <ToastContainer />


            </>
        }
        </>
    )
}

export default Subject;