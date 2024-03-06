
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useState } from 'react';

export const Coursedetail = ({ courseDetails, setCourseDetail, handleSubmitChanges }) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading(true);
        handleSubmitChanges();
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }
    return (
        <div className="courseDetails">
            <h1 className="card-title">{courseDetails.title}</h1>

            <div className="Course_img">
                <img src={courseDetails.imageUrl} alt="Course_Image"
                    onError={(e) => {
                        e.target.src =
                            "https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg";
                    }} />
            </div>

            <form>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="titlesss">Title: </span>
                        <textarea
                            value={courseDetails.title}
                            onChange={(e) => setCourseDetail((prev) => ({ ...prev, title: e.target.value }))}
                        />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Level: </span>
                        <textarea className="disabled" value={courseDetails.level ? courseDetails.level : " No category Given"} disabled />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Subject: </span>
                        <textarea
                            value={courseDetails.subject}
                            onChange={(e) => setCourseDetail((prev) => ({ ...prev, subject: e.target.value }))}
                        />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Description: </span>
                        <textarea
                            className="bigit"
                            value={courseDetails.description}
                            onChange={(e) => setCourseDetail((prev) => ({ ...prev, description: e.target.value }))}
                        />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Requirements: </span>
                        <textarea
                            className="bigit"
                            value={courseDetails.requirements}
                            onChange={(e) => setCourseDetail((prev) => ({ ...prev, requirements: e.target.value }))}
                        />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Course Duration: </span>
                        <textarea
                            value={courseDetails.duration}
                            onChange={(e) => setCourseDetail((prev) => ({ ...prev, duration: e.target.value }))}
                        />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Instructor: </span>
                        <textarea
                            value={courseDetails.instructor}
                            onChange={(e) => setCourseDetail((prev) => ({ ...prev, instructor: e.target.value }))}
                        />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Price: </span>
                        <textarea
                            value={courseDetails.price}
                            onChange={(e) => setCourseDetail((prev) => ({ ...prev, price: e.target.value }))}
                        />
                    </li>
                </ul>
                <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ my: 2 }} onClick={handleSubmit}>
                    Save Details
                </LoadingButton>
            </form>


        </div>
    );
};

