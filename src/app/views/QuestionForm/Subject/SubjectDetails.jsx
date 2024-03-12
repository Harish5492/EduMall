
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { toast } from "react-toastify";


export const SubjectDetails = ({ subDetail, index }) => {
    return (
        <>
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <NavLink to={`/subject/${subDetail._id}`}>
                        {subDetail?.subject}
                    </NavLink>
                </td>
                {/* <td onClick={() => handleExpand(index)}>
                    {subDetail?.description.length > 40 ? (
                        <>
                            {expandState === index ? (
                                <span>{subDetail?.description}</span>
                            ) : (
                                <>
                                    {subDetail?.description.slice(0, 40)}
                                    <span className="expand-dots">{' '}...</span>
                                </>
                            )}
                        </>
                    ) : (
                        subDetail?.description
                    )}
                </td> */}
                {/* {role === "admin" ? (
                    <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(subDetail._id)}>
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

                } */}
                <td>
                    i am subject
                </td>
                <td>
                    {subDetail.count}
                </td>

            </tr>
        </>
    );
};
