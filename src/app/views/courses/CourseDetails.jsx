import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetCoursesById } from "../ApiBackend/ApiBackend";
import "./CourseDetail.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { FetchLessons, CourseEdit, LessonEdit } from "../ApiBackend/Apicalls";
import { Coursedetail } from "./CourseInfo.jsx";
import { LessonDetails } from "./LessonsInfo";
import * as courseFunctions from "./courseFunctions";
import { AddLessonForm } from "./AddLessonForm";

const CourseDetail = () => {
    const { courseId } = useParams();
    const token = useSelector((state) => state.authToken);
    const role = useSelector((state) => state.role);
    const [courseDetails, setCourseDetail] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [isFetchingLessons, setFetchingLessons] = useState(false);
    const [activeTab, setActiveTab] = useState("courseDetails");
    const [lessonForms, setLessonForms] = useState([]);

    const fetchCourseDetails = async () => {
        try {
            const response = await GetCoursesById(token, courseId);
            if (response.status === 200) {
                setCourseDetail(response.data.course);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleFetchLessons = async () => {
        try {
            setFetchingLessons(true);
            const response = await FetchLessons(token, courseId);
            console.log("this is lesson resp",response)
            setLessons(response.data.lesson);
        } catch (error) {
            console.error("Error fetching lessons", error);
        } finally {
            setFetchingLessons(false);
        }
    };

    const handleAddLessonClick = () => {
        setLessonForms((prevForms) => [
            ...prevForms,
            {
                title: '',
                videoUrl: '',
                content: '',
            },
        ]);
    };
    const handleSubmitChanges = async () => {
        const updatedValues = {
            title: courseDetails.title,
            subject: courseDetails.subject,
            description: courseDetails.description,
            requirements: courseDetails.requirements,
            instructor: courseDetails.instructor,
            price: courseDetails.price,
        };

        courseFunctions.submitCourseChanges(token, courseId, updatedValues, toast);
    };

    const handleSubmitLessonChanges = async (lessonId) => {
        courseFunctions.submitLessonChanges(token, lessonId, lessons, toast);
    };

    const handleAddNewLesson = async (index) => {
        courseFunctions.addNewLesson(token, index, lessonForms, courseId, setLessonForms, handleFetchLessons, toast);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === "lessons") {
            handleFetchLessons();
        }
    };

    useEffect(() => {
       
        fetchCourseDetails();
    }, [courseId]);


    const handleConfirmDelete = async (lessonId) => {
        courseFunctions.confirmDeleteLesson(token, lessonId, toast, handleFetchLessons);
    };



    const handleDeleteLesson = async (lessonId) => {
        try {
            toast.info(
                <div>
                    <p>Are you sure you want to delete this lesson?</p>
                    <button className="toast_btn" onClick={() => handleConfirmDelete(lessonId)}>Yes</button>
                    <button className='toast_btn' onClick={() => { toast.dismiss() }}>No</button>
                </div>,
                { autoClose: false }
            );
        } catch (error) {
            console.error('Error initiating delete:', error);
        }
    };

    const handleLessonChange = (lessonId, field, value) => {
        setLessons((prevLessons) =>
            prevLessons.map((lesson) =>
                lesson._id === lessonId ? { ...lesson, [field]: value } : lesson
            )
        );
    };

    return (
        <>
            <div className="course-detail-container">
                <div className="card text-center">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === "courseDetails" ? "active" : ""}`} onClick={() => handleTabChange("courseDetails")}>
                                    Course Details
                                </a>
                            </li>
                            {
                                role === "admin" ? (
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === "lessons" ? "active" : ""}`}
                                            onClick={() => {
                                                handleTabChange("lessons");
                                            }}
                                            disabled={isFetchingLessons}
                                        >
                                            Lessons
                                        </a>
                                    </li>
                                ): null

                                
                                }
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

                        {activeTab === "lessons" ? (
                            <>
                               
                                {lessons?.length > 0 && lessons ? (
                                    lessons.map((lesson, i) => (
                                        <LessonDetails
                                            key={lesson._id}
                                            lesson={lesson}
                                            onChange={(field, value) => handleLessonChange(lesson._id, field, value)}
                                            onSave={() => handleSubmitLessonChanges(lesson._id)}
                                            onDelete={() => handleDeleteLesson(lesson._id)}
                                        />
                                    ))
                                ) : null}
                                {lessonForms?.map((form, index) => (
                                    <AddLessonForm
                                        key={index}
                                        form={form}
                                        index={index}
                                        setLessonForms={setLessonForms}
                                        handleAddNewLesson={handleAddNewLesson}
                                    />
                                ))}
                            </>
                        ) : null}
                    </div>
                    {
                        role === "admin" && lessons ? (
                            <button type="button" className="add_lesson btn btn-success" onClick={handleAddLessonClick}>
                                Add Lesson
                            </button>
                        ):
                    null
                        
}
                    
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default CourseDetail;
