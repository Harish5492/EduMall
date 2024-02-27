import React, { useEffect, useState } from 'react';
import "./index.css";
import { AllCourses, DeleteCourse } from "../ApiBackend/ApiBackend";
import AddCourseModal from "./AddCourseModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'app/components/MatxLoading';
import { useSelector } from 'react-redux';
import { AllCourse } from './AllCourse';



const MyCourses = () => {
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
      await DeleteCourse(token, _id);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== _id));

    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleCancelDelete = () => {
    toast.dismiss();
  };

  const fetchData = async () => {
    try {
      const response = await AllCourses(token);
      console.log("this is response", response);
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
        <h2>My Courses</h2>
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

            <AllCourse
              token={token}
              key={course._id}
              course={course}
              index={index}
              handleExpand={handleExpand}
              expandState={expandState}
              role={role}
              handleDelete={handleDelete}
            />
          ))}

        </tbody>
      </table>
      <AddCourseModal isOpen={showModal} onClose={handleCloseModal} onAddCourse={fetchData} />
      <ToastContainer />
<>
      
      </>
    </>
  );
}

export default MyCourses;


