import React, { useState, useEffect } from 'react';
import man from '../../../Assets/Images/man.webp';
import './Dashbord.scss';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import Rate from '../Rate/Rate';
import { useNavigate } from 'react-router-dom';
import { getAllCources } from '../../Api';

const Dashbord = () => {
  const [courseData, setCourseData] = useState([]);
  const userCourses = useSelector((state) => state.user.myCourses || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCources();
        if (data && data.courses) {
          setCourseData(data);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const showCard = (courseId) => {
    const courseExists = userCourses.find((userCourse) => userCourse._id === courseId);
    if (courseExists) {
      navigate(`/auth/lessons/${courseId}`);
    } else {
      navigate(`/auth/course_detail/${courseId}`);
    }
  };

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="dashbord_outer">
        <div className="container">
          <div className="row dashbord">
            <div className="col-md-6">
              <div className="learning">
                <h4>Keep Learning</h4>
                <h2>Connect With Our Expert</h2>
                <h3>Acquire global knowledge and build your professional skills</h3>
                <div className="learning_btn">
                  <NavLink to="/courses">Find courses</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="man_image_outer">
                <div className="man_image_inner">
                  <img src={man} alt="Our Tuitor" loading='lazy'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="courses">
          <div className="row courses_card_outer">
            <h1 className="dashboard_heading">Here Our Courses</h1>
            {courseData && courseData.courses && courseData.courses.length > 0 ? (
              <Slider {...settings}>
                {courseData.courses.map((course) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 courses_card_inner" key={course._id}>
                    <div className="courses_card dashboard_card" onClick={() => showCard(course._id)}>
                      <div className="course_image dashboard_image">
                        <img
                          src={course.imageUrl}
                          alt=""
                          onError={(e) => {
                            e.target.src =
                              'https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg';
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="courses_card_descrip">
                        <h5>{course.title}</h5>
                        <p>{course.description}</p>
                        <div className="rating">
                          <h4>
                            <Rate />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p className='text-center'>No courses available at this moment...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashbord;
