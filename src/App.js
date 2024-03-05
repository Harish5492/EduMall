import './App.scss';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Pages/Header/Header';
import Footer from './Components/Pages/Footer/Footer';
import Courses from './Components/Pages/Courses/Courses';
import SpinerLogo from './Components/CommonComponents/SpinerLogo';
import PrivateRoutes from './Routes/PrivateRoutes';

// Lazy load components
const Dashbord = React.lazy(() => import('./Components/Pages/Dashbord/Dashbord'));
const CartItems = React.lazy(() => import('./Components/Pages/CartItems/CartItems'));
const Lessons = React.lazy(() => import('./Components/Pages/Lessons/Lessons'));
const CourseDetail = React.lazy(() => import('./Components/Pages/CourseDetail/CourseDetail'));
const BillingDetails = React.lazy(() => import('./Components/Pages/BillingDetails/BillingDetails'));
const MyCources = React.lazy(() => import('./Components/Pages/MyCources/MyCources'));
const MyProfile = React.lazy(() => import('./Components/Pages/MyProfile/MyProfile'));
const QuestionAnswers = React.lazy(() => import('./Components/Pages/QuestionAnswers/QuestionAnswers'));


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Suspense fallback={<div><SpinerLogo/></div>}>
            <Routes>
                    <Route path="/" element={<Dashbord />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/cartitems" element={<CartItems />} />
                    <Route path="/course_detail/:courseId" element={<CourseDetail />} />
                    <Route path="*" element={<Dashbord />} />
                <Route  element={<PrivateRoutes/>}>
                    <Route path="/mycourses" element={<MyCources />} />
                    <Route path="/lessons/:courseId" element={<Lessons />} />
                    <Route path="/billing_details" element={<BillingDetails/>} />
                    <Route path="/my_profile" element={<MyProfile />} />
                    <Route path="/questionAnswers" element={<QuestionAnswers />} />
                </Route>
             </Routes>
           </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
