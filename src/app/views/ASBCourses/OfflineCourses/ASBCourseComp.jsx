
import React from "react";
import { NavLink } from "react-router-dom";




export const ASBCourseComp = ({ course, index, handleExpand, expandState, handleDelete }) => {

    return (
        <>
            <tr key={course._id}>
                <td>{index + 1}</td>
                <td>
                    <NavLink to={`/offlinecourses/${course._id}`}>
                        {course?.title}
                    </NavLink>
                </td>
                <td onClick={() => handleExpand(index)}>
                    {course?.description.length > 40 ? (
                        <>
                            {expandState === index ? (
                                <span>{course?.description}</span>
                            ) : (
                                <>
                                    {course?.description.slice(0, 40)}
                                    <span className="expand-dots">{' '}...</span>
                                </>
                            )}
                        </>
                    ) : (
                        course?.description
                    )}
                </td>

                <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(course._id)}>
                        Delete
                    </button>
                </td>




            </tr>
        </>
    );
};
