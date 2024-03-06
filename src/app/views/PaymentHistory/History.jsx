
import React, { useState, useEffect } from 'react';
import { GetPaymentHistory } from "../ApiBackend/ApiBackend"
import Loading from "app/components/MatxLoading";
import { NavLink, useNavigate } from "react-router-dom";
import "./History.css";
import { useSelector } from "react-redux";
import AppTable from '../material-kit/tables/AppTable';



const History = () => {
  const token = useSelector((state) => state.authToken);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageItems = 8;
  const [totalResult, setTotalResult] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [signal, setSignal] = useState(null);
  const [debounceTime, setDebounceTime] = useState(null);
  const [roleStatus, setroleStatus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    fetchData();
  }, [currentPage, searchQuery]);

  async function fetchData() {
    try {
      const response = await GetPaymentHistory(token, pageItems, currentPage, searchQuery, signal);
      if (!response.data.status) {
        setroleStatus(response.data.status);
        setTimeout(() => {
          navigate('/dashboard');
          alert("You are being redirected to the dashboard");
        }, 1000);


      }
      if (!response.status) {
        return console.error('Network response was not oayyyyyyyyyyyyk');
      }


      setTotalResult(response.data.totalRecords);
      setCurrentItems(response.data.details);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const paginate = (pageNumber) => {

    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (e) => {
    if (debounceTime) {
      clearTimeout(debounceTime);
    }
    const timeoutId = setTimeout(() => {
      setSearchQuery(e.target.value);

    }, 800);

    setDebounceTime(timeoutId);
  };

  if (loading) {
    return <div className="loader"><Loading /></div>;
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
      <div id='page-content' style={{ paddingTop: "30px" }} >
        <h1 >Payment History</h1>
        <div className="padding" style={{ marginTop: "50px" }} >
          <div className="row container d-flex justify-content-center" style={{ margin: "auto" }}>
            <div className="mb-2 d-flex justify-content-between align-items-center">
              <div className="position-relative">
                <span className="position-absolute search"><i className="fa fa-search"></i></span>
                <form className="d-flex" role="search" onSubmit={(e) => {
                  e.preventDefault();

                }}>
                  <input className="form-control me-2" type="search" value={searchValue}
                    onChange={(e) => {

                      setSearchValue(e.target.value);
                      handleSearchChange(e);

                    }} placeholder="Search" aria-label="Search" />
                </form>
              </div>
            </div>


            <div className="table-responsive" >
              <table className="table fl-table table-hover">
                <thead>
                  <tr className="bg-light">
                    <th scope="col" width="5%">Status</th>
                    <th scope="col" width="20%">Id</th>
                    <th scope="col" width="20%">Email</th>
                    <th scope="col" width="20%">Date</th>
                    <th scope="col" width="20%">Amount</th>
                    <th scope="col" width="20%">Courses</th>

                  </tr>
                </thead>
                <tbody>
                  {currentItems?.length > 0 && (
                    currentItems?.filter((payment) => {
                      const lowercaseSearch = searchQuery.toLowerCase();
                      return (
                        payment.status.toLowerCase().includes(lowercaseSearch) ||
                        payment.email.toLowerCase().includes(lowercaseSearch)) ||
                        payment.amount.toLowerCase().includes(lowercaseSearch)
                    }).map((payment) => (
                      <tr key={payment._id}>
                        <td>
                          <span className={`${payment.status === 'Success' ? 'badge text-bg-success' : 'badge text-bg-danger'} d-flex justify-content-center`}>
                            {payment.status}
                          </span>
                        </td>

                        <td className="user_id">
                          {payment.user !== undefined && payment.user !== null ? (

                            <NavLink to={`/PaymentHistory/${payment.user}`}>
                              {payment.user}
                            </NavLink>
                          ) : (
                            <span>No User</span>
                          )}
                        </td>
                        <td className="email">
                          {payment.email !== undefined && payment.email !== null ? (

                            payment.email

                          ) : (
                            <span>No Mail Provided</span>
                          )}
                        </td>
                        <td>{new Date(payment.payed_on).toLocaleString("en-IN")}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.courseBought.length}</td>
                      </tr>
                    ))
                  )}
                  {currentItems?.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{
                        color: "grey",
                        textAlign: "center"
                      }}>No Results Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalResult >= 8 && (
              <nav aria-label="Page navigation" className="nav-pagee">
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
        </div >
      </div>
      {/* <AppTable /> */}
    </>
  );
};

export default History;