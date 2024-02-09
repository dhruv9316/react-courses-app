import React, { useState } from 'react'
import '../styles/CourseDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCourse } from '../redux/slices/userSlice'
import toast from 'react-hot-toast'
import { FaChevronDown, FaChevronUp  } from "react-icons/fa";

const CourseDetails = () => {
  const dispatch = useDispatch()

  const {courseDetails} = useSelector(state => state.course)
  console.log("courseDetails from course slice => ", courseDetails);

  const {enrolledCourses} = useSelector(state => state.user)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  console.log("isSectionVisible => ", isSectionVisible);

  const enrollmentClickHandler = () => {
    const toastId = toast.loading("Loading...")

    let selectedCourse = {...courseDetails, isCourseCompleted: false}
    const isCoursePresent = enrolledCourses.find(item => item._id === selectedCourse._id)

    if(isCoursePresent){
      toast.dismiss(toastId)
      toast.error("Already Enrolled")
      return;
    }

    dispatch(addCourse(selectedCourse))

    toast.dismiss(toastId)

    toast.success("Enrolled Successfully")
  }

  const handleSectionToggle = () => {
    setIsSectionVisible(prev => !prev)
    // setIsSectionVisible(prev => !prev)
  }

  return (
    <div className = 'course_details_wrapper'>
      <div className='course_details_container'>

        <div className='course_main_div'>
          <h2>Course Details</h2>

          <div className='course_details_info'> 
            <div className='course_img'>
              <img src={courseDetails.thumbnail} alt='couseImage' />
            </div>

            <div className='basic_info'>
              <div className='odd_info_row'>
                <h3>Course Name</h3>
                <p>{courseDetails.courseName}</p>
              </div>

              <div className='even_info_row'>
                <h3>Instructor Name</h3>
                <p>{courseDetails.instructor?.firstName ?? 'John'}</p>
              </div>

              <div className='odd_info_row'>
                <h3>Price</h3>
                <p>{courseDetails.price}</p>
              </div>

              <div className='even_info_row'>
                <h3>Status</h3>
                <p>{courseDetails.status}</p>
              </div>

              <div className='odd_info_row'>
                <h3>No. of Students Enrolled</h3>
                <p>{courseDetails?.studentsEnrolled ? courseDetails.studentsEnrolled.length : '0'}</p>
              </div>

              <div className='even_info_row'>
                <h3>Description</h3>
                <p>{courseDetails.courseDescription}</p>
              </div>

            </div>
          </div>
        </div>

        <div className='prerequisites'>
          <h2>Prerequisites</h2>
          {
            courseDetails?.instructions
            ?
            courseDetails.instructions.map((item, idx) => (
              <p key={idx}>
                • {item}
              </p>
            ))
            :
            <p>No Prerequisites</p>
          }
        </div>

        <div className='syllabus'>
          <h2 onClick={handleSectionToggle}>
            Syllabus 
            {
              isSectionVisible 
              ? <FaChevronUp className='angle_down_icon' />
              : <FaChevronDown className='angle_down_icon' />
            }
              
          </h2>

          {
            courseDetails.courseContent.map((item, idx) => (
              <div key={idx} className={`${isSectionVisible ? 'sections_visible' : 'sections_invisible'}`}>
                <p>• {item.sectionName}</p>
                <h5>{item.subSection ? item.subSection.length : '0'}{'-Lecture(s)'}</h5>
              </div>
            ))
          }

        </div>

        <div className='enrollment_btn'>
          <button onClick={enrollmentClickHandler}>
            Enroll Now
          </button>
        </div>

      </div>

    </div>
  )
}

export default CourseDetails