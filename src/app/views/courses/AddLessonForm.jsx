import React from "react";

export const AddLessonForm = ({ form, index, setLessonForms, handleAddNewLesson }) => {
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
                <button type="button" className="edit_lesson btn btn-primary" onClick={() => handleAddNewLesson(index)}>
                    Save Lesson
                </button>


            </form>

        </>

    );
};


