

import "./Affiliate.css";
import React, { useState, useEffect } from 'react';
import { GetReferralLink, handleRequest } from "../ApiBackend/ApiBackend"
import Loading from "app/components/MatxLoading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Affiliate = () => {
    const token = useSelector((state) => state.authToken);
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [requestDetail, setRequestDetail] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageItems = 8;
    const [totalResult, setTotalResult] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [signal, setSignal] = useState(null);
    const [res, setRes] = useState({});
    const [debounceTime, setDebounceTime] = useState(null);
    const [roleStatus, setroleStatus] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setSignal(signal);
        let isMounted = true;
        if (debounceTime) {
            clearTimeout(debounceTime);
        }

        const timeOut = setTimeout(() => {
            fetchPending();
        }, 800);
        setDebounceTime(timeOut);
        return () => {
            controller.abort();
            clearTimeout(timeOut);

        }

    }, [currentPage, searchQuery, res,pageItems]);

    const fetchPending = async () => {
        try {
            const response = await GetReferralLink(token, pageItems, currentPage, searchQuery);
            if (!response.data.status) {
                setroleStatus(response.data.status);
                setTimeout(() => {

                    alert("You are being redirected to the dashboard");
                    navigate('/dashboard');
                }, 1000);
            }
            if (!response.status) {
                console.log("Network was not okay");
            }


            setRequests(response.data);
            setTotalResult(response.data.totalRequests);
            setCurrentItems(response.data.allRequests);


            setRequestDetail(response.data.allRequests);


            setLoading(false);

        } catch (error) {
            console.error("There was an error fetching data: ", error);
        }
    };


    const paginate = (pageNumber) => {

        setCurrentPage(pageNumber);
    };
    const handleSearchChange = (e) => {
        if (debounceTime) {
            clearTimeout(debounceTime);
        }

        const timeoutId = setTimeout(() => {
            setSearchQuery(e.target.value);
        }, 100);

        setDebounceTime(timeoutId);
    };

    if (loading) {
        return <div className="loader"><Loading /></div>;
    }

    const handleAccept = async (requestId) => {
        try {
            const response = await handleRequest(requestId, 'Success', token);
            if (response.data.status === true) {
                setRes(response)
            }
            fetchPending();

        }
        catch (error) {
        }

    }

    const handleReject = async (requestId) => {
        try {
            const response = await handleRequest(requestId, 'Failure', token);
            if (response.status) {


            }
            fetchPending();


        }
        catch (error) {
            console.error("Error fetcing requests,", error);
        }

    }


    const renderPageNumbers = () => {
        const totalPages = Math.ceil(totalResult / pageItems);
        if (totalPages <= 1) {
            return null;
        }

        const pageNumbers = [];
        const ellipsis = <li key="ellipsis" className="page-item disabled"><span className="page-link">...</span></li>;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <a className="page-link" onClick={() => paginate(i)}>
                            {i}
                        </a>
                    </li>
                );
            }

            else if (totalPages > 2 && i > 1 && i < totalPages) {
                if (i === currentPage || i === currentPage + 1) {
                    pageNumbers.push(
                        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                            <a className="page-link" onClick={() => paginate(i)}>
                                {i}
                            </a>
                        </li>
                    );
                } else if (!pageNumbers.includes(ellipsis)) {
                    pageNumbers.push(ellipsis);
                }
            }

            else if (i === totalPages) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <a className="page-link" onClick={() => paginate(i)}>
                            {i}
                        </a>
                    </li>
                );
            }
        }

        return pageNumbers;
    };
    return (
        <>
 
            <div className="" id="page-content">
                <h1> Pending Requests</h1>
                <div className="padding" style={{marginTop: "50px"}}>

                    <div className="row container d-flex justify-content-center">
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                            <div className="position-relative">
                                <span className="position-absolute search"><i className="fa fa-search"></i></span>
                                <form className="d-felx" role="search" onSubmit={(e) => { e.preventDefault(); }}>
                                    <input className="form-control w-100" placeholder="Search Email/Status.." type="search" value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            handleSearchChange()
                                        }} />
                                </form>
                            </div>

                        </div>

                        <div className="table-responsive">
                            <table className="table fl-table table-hover">
                                <thead>
                                    <tr className="bg-light">
                                        <th scope="col" width="10%%">Requested On</th>
                                        <th scope="col" width="10%">Status</th>
                                        <th scope="col" width="20%">Id</th>
                                        <th scope="col" width="20%">Requested To Email</th>
                                        <th scope="col" width="20%">Operation</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {requestDetail?.length > 0 && (
                                        requestDetail?.filter((requestss) => {
                                            const lowercaseSearch = searchQuery;
                                            return (
                                                requestss.requestStatus.toLowerCase().includes(lowercaseSearch) ||
                                                requestss.requestorEmail.toLowerCase().includes(lowercaseSearch)
                                            )
                                        }).map((requestss) => (
                                            <tr key={requestss._id}>
                                                <td>
                                                    {new Date(requestss.requested_on).toLocaleString("en-IN")}
                                                </td>
                                                {
                                                    requestss.requestStatus === "Success" ? (
                                                        <td><label className="badge text-bg-success">{requestss.requestStatus}</label></td>
                                                    ) : null
                                                }
                                                {
                                                    requestss.requestStatus === "Pending" ? (
                                                        <td><label className="badge text-bg-warning">Pending</label></td>
                                                    ) : null
                                                }
                                                {requestss.requestStatus === "Failure" ? (
                                                    <td><label className="badge text-bg-danger">Failure</label></td>
                                                ) : null
                                                }
                                                <td>
                                                    {requestss._id !== undefined && requestss._id !== null ? (

                                                        requestss._id

                                                    ) : (
                                                        <span>No Mail Provided</span>
                                                    )}
                                                </td>
                                                <td className="email">
                                                    {requestss.requestorEmail !== undefined && requestss.requestorEmail !== null ? (

                                                        requestss.requestorEmail

                                                    ) : (
                                                        <span>No Mail Provided</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="d-flex  justify-content-evenly ">
                                                        {requestss?.requestStatus === "Pending" ? (
                                                            <>
                                                                <button className='btn btn-success ' onClick={() => handleAccept(requestss._id)}>Accept</button>
                                                                <button className='btn btn-danger' onClick={() => handleReject(requestss._id)}>Reject</button>
                                                            </>
                                                        ) :
                                                            <label className="badge text-bg-primary">Done</label>
                                                       
                                                        }
                                                    </div>
                                                </td>

                                            </tr>
                                        ))

                                    )}
                                    {requestDetail?.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{
                                                color: "grey",
                                                textAlign: "center"
                                            }}>No Results Found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {requestDetail?.length >= 0 && (
                            <nav aria-label="Page navigation example" className="nav-pagee">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>

                                    {renderPageNumbers()}
                                    <li className={`page-item ${currentPage === Math.ceil(totalResult / pageItems) ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Affiliate;