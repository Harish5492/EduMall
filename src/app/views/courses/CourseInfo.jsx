
import React from 'react';

export const Coursedetail = ({ courseDetails, setCourseDetail, handleSubmitChanges }) => {
    return (
        <div className="courseDetails">
            <h1 className="card-title">{courseDetails.title}</h1>

            <div className="Course_img">
                <img src={courseDetails.imageUrl} alt="Course Image" />
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
                        <span className="titlesss">Category: </span>
                        <textarea value={courseDetails.category ? courseDetails.category : " No category Given"} readOnly />
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
            </form>

            <button type="button" className="submitt_course btn btn-primary" onClick={handleSubmitChanges}>
                Save Details
            </button>
        </div>
    );
};

