import { LoadingButton } from '@mui/lab';
import React from "react";
import { useState } from 'react';

export const AddLessonForm = ({ form, index, setLessonForms, handleAddNewLesson }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (index) => {
        setLoading(true);
        handleAddNewLesson(index);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    return (
        <>
            <form key={index}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="titlesss">Lesson </span>
                        <textarea
                            value={form.title}
                            onChange={(e) => setLessonForms((prevForm) => {
                                const newForms = [...prevForm];
                                newForms[index].title = e.target.value;
                                return newForms;
                            })}
                            style={{ color: "black" }}
                        />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Video URL: </span>
                        <textarea
                            value={form.videoUrl}
                            onChange={(e) => setLessonForms((prevForm) => {
                                const newForms = [...prevForm];
                                newForms[index].videoUrl = e.target.value;
                                return newForms;
                            })}
                            style={{ color: "black" }}
                        />
                    </li>
                    <li className="list-group-item">
                        <span className="titlesss">Content: </span>
                        <textarea className="bigit"
                            value={form.content}
                            onChange={(e) => setLessonForms((prevForm) => {
                                const newForms = [...prevForm];
                                newForms[index].content = e.target.value;
                                return newForms;
                            })}
                            style={{ color: "black" }}
                        />
                    </li>
                </ul>
                <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ my: 2 }} onClick={() => handleSubmit(index)}>
                    Save Details
                </LoadingButton>


            </form>

        </>

    );
};


