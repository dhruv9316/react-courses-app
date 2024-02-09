import React from 'react'
import './Coursecard.css'
import { setCourseDetails } from '../../redux/slices/courseSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Coursecard = ({course}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const courseClickHandler = () => {
        dispatch(setCourseDetails(course))
        navigate('/course-details')
    }

  return (
    <div className="card" onClick={courseClickHandler}>
        <div className="course_info">

            <img src={course.thumbnail} className="course_image" alt='course_img'></img>

            <div className="course_details">
                <h4 className="course_price">₹ {course.price} </h4>
                <h4 className="course_name">{course.courseName}</h4> 
                <p className="course_instructor">
                    by 
                    <span> {course.instructor?.firstName ?? 'John'} 
                    </span> 
                </p>
            </div>

            <div className="course_description">
                {course.courseDescription}
            </div>

        </div>
    </div>
  )
}

export default Coursecard