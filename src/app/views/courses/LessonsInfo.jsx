
import React from 'react';
import { useSelector } from 'react-redux';
import "./CourseDetail.css"
export const LessonDetails = ({ lesson, onChange, onSave, onDelete }) => {
    const role = useSelector((state) => state.role);
    return (
        <form key={lesson._id}>
            <ul className="list-group list-group-flush" key={lesson._id}>
                <li className="list-group-item">
                    <span className="titlesss">Lesson :{lesson.lessonNumber} </span>
                    <textarea
                        value={lesson.title}
                        style={{ color: 'black' }}
                        onChange={(e) => onChange('title', e.target.value)}
                    />
                </li>
                <li className="list-group-item">
                    <span className="titlesss">Video URL: </span>
                    <textarea
                        value={lesson.videoUrl}
                        onChange={(e) => onChange('videoUrl', e.target.value)}
                    />
                </li>
                <li className="list-group-item">
                    <span className="titlesss">Content: </span>
                    <textarea
                        className="bigit"
                        value={lesson.content}
                        onChange={(e) => onChange('content', e.target.value)}
                    />
                </li>
            </ul>
            {role === "admin" ? (
                <>
                <button type="button" className="edit_lesson btn btn-primary" onClick={onSave}>
                Save Lesson Detail
            </button>
            <button type="button" className="delete_lesson btn btn-danger" onClick={onDelete}>
                Delete Lesson
            </button>
                </>
            ) : (
                null    
           )}
        </form>
    );
};
