import React, { useEffect, useState } from 'react'
import '../styles/Home.css';
import axios from 'axios'
import Coursecard from '../components/home/Coursecard'
import SearchBar from '../components/home/SearchBar';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

const Home = () => {
    const [coursesData, setCoursesData] = useState([])
    const [allCoursesData, setAllCoursesData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCoursesData = async () => {
            // const loadingToast = toast.loading('Loading...', {
            //     style: {
            //         maxWidth: '1200px', 
            //         fontSize: '1.5rem'
            //     },
            // })
            setLoading(true)

            try{
                const {status, data} = await axios.get('https://backend-studynotion.vercel.app/api/v1/course/get-all-courses');

                console.log("courses data response => ", data);

                if(status === 200){
                    setCoursesData(data?.data)
                    setAllCoursesData(data?.data)
                }
            }
            catch (error){
                console.log("fetch Courses Data function error => ", error)
            }

            // toast.dismiss(loadingToast)
            setLoading(false)
        }
        fetchCoursesData();
        
    }, [])
    console.log("<<<<<<= coursesData =>>>>>>> ", coursesData);
    console.log("loading =>> ", loading);

    useEffect(() => {
        const searchQueryHandler = () => {
            // console.log("calling useEffect for searching...", searchQuery)

            const filteredCourses = allCoursesData.filter((course) => { 
                if(course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) )    return true;

                if(course.instructor?.firstName){
                    if(course.instructor?.firstName.toLowerCase().includes(searchQuery.toLowerCase()))  return true;
                }
                else if(!course.instructor?.firstName){
                    if("john".includes(searchQuery.toLowerCase()))  return true;
                }

                return false;
            })

            console.log("filteredCourses-> length => ", filteredCourses.length)

            setCoursesData(filteredCourses)
        }
        searchQueryHandler();

    }, [searchQuery])

    return (
        <div className='home_wrapper'>
            <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className='courses_container'>
                {/* <Loader /> */}
                {
                    loading 
                    ? <Loader />
                    :
                    coursesData.length === 0
                    ?
                    <div>No Courses Found</div>
                    :
                    coursesData.map((course) => (
                        <Coursecard 
                            key={course._id} 
                            course = {course}
                        />
                    ))                    
                }
            </div>
        </div>
    )
}

export default Home