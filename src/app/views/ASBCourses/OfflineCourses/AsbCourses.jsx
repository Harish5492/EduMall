import React, { useEffect, useState } from 'react';
import "./index.css";
import { ASBCourse, DeleteASBCourse } from "../../ApiBackend/ApiBackend";
import AddModal from "../Modal/AddModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'app/components/MatxLoading';
import { useSelector } from 'react-redux';
import { ASBCourseComp } from './ASBCourseComp';



const ASBCourses = () => {
    const token = useSelector((state) => state.authToken);
    const role = useSelector((state) => state.role);
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [expandState, setExpandState] = useState(null);
    const [search, setSearch] = useState("");



    const handleExpand = (index) => {
        setExpandState((prevIndex) => (prevIndex === index ? null : index));
    }

    const handleAddCourseClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }


    const handleDelete = async (_id) => {
        try {
            toast.info(
                <div>
                    <p>Are you sure you want to delete this course?</p>
                    <button className="toast_btn" onClick={() => handleConfirmDelete(_id)}>Yes</button>
                    <button className='toast_btn' onClick={handleCancelDelete}>No</button>
                </div>,
                { autoClose: false }
            );
        } catch (error) {
            console.error('Error initiating delete:', error);
        }
    };

    const handleConfirmDelete = async (_id) => {
        try {
            toast.dismiss();
            await DeleteASBCourse(token, _id);
            setCourses((prevCourses) => prevCourses.filter((course) => course._id !== _id));
            toast.success('Course deleted successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })

        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleCancelDelete = () => {
        toast.dismiss();
    };

    const fetchData = async () => {
        try {
            const response = await ASBCourse(token);
            if (Array.isArray(response?.courses)) {
                setCourses(response.courses);

                setLoading(false)
            } else {
                console.error('Invalid response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div className="loader"><Loading /></div>;
    }
    const main = document.querySelector('.main');
    main && main.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'summary') {
            if (e.target.parentNode.open) {
                main.removeAttribute('open');
            } else {
                main.setAttribute('open', true);
            }
        }
    });

    return (
        <>

            <div className='courses_top'>
                <h1>Courses</h1>
                <div className="search-filter">
                    <form className="d-flex" role="search" onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <input className="form-control me-2" type="search" value={search}
                            onChange={(e) => setSearch(e.target.value)} placeholder="Search Course" aria-label="Search" />
                    </form>
                </div>
                {role === "admin" ? (
                    <button onClick={handleAddCourseClick}>Add courses</button>
                )
                    : (
                        null
                    )}

            </div>

            <table className="courses-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {courses && courses.length > 0 && courses?.filter((e) => {
                        return e.title.toLowerCase().includes(search.toLowerCase())
                    }).map((course, index) => (

                        <ASBCourseComp
                            key={course._id}
                            course={course}
                            index={index}
                            handleExpand={handleExpand}
                            expandState={expandState}
                            handleDelete={handleDelete}
                        />
                    ))}

                </tbody>
            </table>
            <AddModal isOpen={showModal} onClose={handleCloseModal} onAddCourse={fetchData} />
            <ToastContainer />
            <>

            </>
        </>
    );
}

export default ASBCourses;


