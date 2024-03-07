import React from "react";
import { useSelector } from "react-redux";
import Rate from "../Rate/Rate";
import { Link, useNavigate } from "react-router-dom";
import SpinerLogo from "../../CommonComponents/SpinerLogo";
import "./MyCources.scss";

const MyCources = () => {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.user.myCourses);
  console.log(courses,"coursescourses>>>>>>>>>>");

  const handleLesson = (courseId) => {
    navigate(`/lessons/${courseId}`);
  };


  if (!courses) {
    return <SpinerLogo />;
  }

  return (
    <>
      <div className="courses">
        <div className="container">
          <div className="row courses_card_outer">
            {courses && courses.length > 0 ? (
              courses.map((item) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 courses_card_inner"
                  key={item._id}
                >
                  <div
                    className="courses_card "
                    onClick={() => handleLesson(item._id)}
                  >
                    <div className="course_image">
                      <img
                        src={item.imageUrl}
                        alt=""
                        onError={(e) => {
                          e.target.src =
                            "https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg";
                        }}
                      />
                    </div>
                    <div className="courses_card_descrip">
                      <h2>{item.title}</h2>
                      <h5> {item.instructor}</h5>
                      <p>{item.description}</p>
                      <div className="rating">
                        <h4>
                          <Rate />
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) :  courses?.length === 0 ? (
              <>
                <p className="msg text-center">
                  Oops! It seems like you haven't enrolled in any courses yet.
                </p>
                <Link to ="/courses" className="sub-msg text-center">
                  Explore our diverse collection of courses and start your
                  learning journey today!
                </Link >
              </>
            ) : (
              <p className="msg text-center">No courses available at this moment...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCources;
