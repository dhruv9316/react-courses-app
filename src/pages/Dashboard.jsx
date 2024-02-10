import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/Dashboard.css'
import { markCourseAsCompleted } from '../redux/slices/userSlice'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const dispatch = useDispatch()

  const {enrolledCourses} = useSelector(state => state.user)
  console.log("enrolledCourses from user-slice => ", enrolledCourses);

  const markAsCompleteHandler = (idx) => {
    dispatch(markCourseAsCompleted(idx))
    toast.success("Course Marked as Completed Successfully", {
        style: {
            maxWidth: '1200px', 
            fontSize: '1.2rem'
        },
    })
  }

  return (
    // dashboard_
    <div className='dashboard_wrapper'>
        <div className='dashboard_container'>
            {
                enrolledCourses.length === 0
                ?
                <div>You are not enrolled in any Course.</div>
                :
                <div className='courses_table'>
                    <div className='heading'>
                        <p>Thumbnail</p>
                        <p>Name</p>
                        <p>Instructor</p>
                        <p>Status</p>
                    </div>
                    
                    {
                        enrolledCourses.map((course, idx) => (
                            <div className= {`course_information ${idx % 2 === 0 ? 'blue_background' : ''}`}  key={idx}>
                                <div className='course_information_left'>
                                    <div>
                                        <img src={course.thumbnail} />
                                    </div>
                                    <p>{course.courseName}</p>
                                    <p>{course.instructor?.firstName ?? 'John'}</p>
                                    <p>{course.isCourseCompleted ? 'Completed' : 'Pending'}</p>
                                </div>
                                
                                <div className='mark_complete_btn'>
                                    <button 
                                        onClick={() => (markAsCompleteHandler(idx))}
                                        disabled= {course.isCourseCompleted}
                                        // disabled= {true}
                                    >
                                        Mark as completed
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                    {/* Enrolled Courses Card for small devices */}
                    {
                        enrolledCourses.map((course, idx) => (
                            <div className= {`responsive_course_information ${idx % 2 === 0 ? 'blue_background' : ''}`}  key={idx}>
                                <div className='responsive_course_information_left'>
                                    {/* <div> */}
                                        <img src={course.thumbnail} />
                                    {/* </div> */}
                                </div>
                                
                                <div className='responsive_course_information_right'>
                                    <div className='responsive_course_top_div'>
                                        <h4>{course.courseName}</h4>
                                        <p>by <span>{course.instructor?.firstName ?? 'John'}</span></p>
                                    </div>

                                    <div className='responsive_course_middle_div'>
                                        <p>Status: </p>
                                        <h4>{course.isCourseCompleted ? 'Completed' : 'Pending'}</h4>
                                    </div>

                                    <div className='responsive_mark_complete_btn'>
                                        <button 
                                            onClick={() => (markAsCompleteHandler(idx))}
                                            disabled= {course.isCourseCompleted}
                                        >
                                            Mark as completed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default Dashboard