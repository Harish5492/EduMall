import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ASBCoursesById } from "../../ApiBackend/ApiBackend";
import "./CourseDetail.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { Coursedetail } from "./ASBCourseInfo";
import * as courseFuncASB from "../OfflineCourses/courseFuncASB";

const CourseDetail = () => {
    const { courseId } = useParams();
    const token = useSelector((state) => state.authToken);
    const [courseDetails, setCourseDetail] = useState(null);
    const [activeTab, setActiveTab] = useState("courseDetails");
    const [loading, setLoading] = useState(false);




    const handleSubmitChanges = async () => {
        setLoading(true);
        const updatedValues = {
            title: courseDetails.title,
            subject: courseDetails.subject,
            description: courseDetails.description,
            requirements: courseDetails.requirements,
            instructor: courseDetails.instructor,
            price: courseDetails.price,
        };

        await courseFuncASB.submitCourseChanges(token, courseId, updatedValues, toast);
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    };

    const fetchCourseDetails = async () => {
        try {
            const response = await ASBCoursesById(token, courseId);
            if (response.status === 200) {
                setCourseDetail(response.data.course);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {

        fetchCourseDetails();
    }, [courseId]);




    return (
        <>
            <div className="course-detail-container">
                <div className="card text-center">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === "courseDetails" ? "active" : ""}`}>
                                    Course Details
                                </a>
                            </li>

                        </ul>
                    </div>
                    <div className="card-body">
                        {activeTab === "courseDetails" && courseDetails ? (
                            <>
                                <div className="courseDetails">
                                    <Coursedetail
                                        courseDetails={courseDetails}
                                        setCourseDetail={setCourseDetail}
                                        handleSubmitChanges={handleSubmitChanges}
                                    />
                                </div>
                            </>
                        ) : null}


                    </div>


                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default CourseDetail;
