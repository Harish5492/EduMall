
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import "./Lesson.css"

import { useState } from 'react';
export const LessonDetails = ({ lesson, onChange, onSave, onDelete, index }) => {
    const [saveloading, setsaveLoading] = useState(false);
    const role = useSelector((state) => state.role);
    const onSaving = () => {
        setsaveLoading(true);
        onSave();
        setTimeout(() => {
            setsaveLoading(false);
        }, 1000);
    }
    const onDeleting = () => {
        onDelete();
    }

    return (
        <form key={lesson._id} >
            <ul className="list-group list-group-flush" key={lesson._id}>
                <li className="list-group-item">
                    <span className="titlesss">Lesson :{index} </span>
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
                <div className='d-flex justify-content-center' >

                    <LoadingButton
                        className='submission_btn'
                        color="primary"
                        loading={saveloading}
                        variant="contained"
                        sx={{ my: 2 }} onClick={onSaving}>
                        Save Lesson
                    </LoadingButton>
                    {/* <Button className='btn btn-primary' onClick={onSave}>Save Lesson</Button> */}

                    <LoadingButton
                        className='submission_btn'
                        color="error"
                        // loading={deleteloading}
                        variant="contained"
                        sx={{ my: 2 }} onClick={onDeleting}>
                        Delete Lesson
                    </LoadingButton>

                </div>
            ) : (
                null
            )}
        </form>
    );
};
