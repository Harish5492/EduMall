
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GetAffilaiteLink } from "../ApiBackend/ApiBackend";

import { toast } from "react-toastify";


export const AllCourse = ({ token, course, index, handleExpand, expandState, role, handleDelete }) => {
    const [newToken, setnewToken] = useState("initial");
    const [affiliateLinks, setAffiliateLinks] = useState("");
    const [showGetLinkButton, setShowGetLinkButton] = useState(true);
    const [copied, setCopied] = useState(false);
 
    const handleClick = async () => {
        try {
            const response = await GetAffilaiteLink(token, course._id);
            if (response.status === 200) {
                 setnewToken(response.data.token);
                console.log("this is new TOken ", newToken, response.data.token);
                setAffiliateLinks(`http://localhost:3000/course_detail/${course._id}?affiliateToken=${response.data.token}`);
                setShowGetLinkButton(false);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(affiliateLinks);
        setCopied(true);
        toast.success("Copied to clipboard", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    };



    

    return (
        <>
            <tr key={course._id}>
                <td>{index + 1}</td>
                <td>
                    <NavLink to={`/courses/${course._id}`}>
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
                {role === "admin" ? (
                    <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(course._id)}>
                            Delete
                        </button>
                    </td>
                ) : 
                    <>
                        
                        <td>
                        {showGetLinkButton && (
                            <button className="btn btn-primary" onClick={handleClick}>
                                Get Link
                            </button>
                        )}
                        

                            {affiliateLinks && !showGetLinkButton && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCopyToClipboard}
                                >
                                    {"Copy to Clipboard"}
                                </button>
                            )}
                        </td>
                    </>
                
                }
                
            </tr>
        </>
    );
};
