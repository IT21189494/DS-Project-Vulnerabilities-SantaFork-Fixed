import React, { useState, useEffect } from 'react'
import axios from "axios";
import './viewcourse.css'
import { Link } from 'react-router-dom'

function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    function getCourses() {
      axios.get("http://localhost:3500/learnup/api/course-management/get-all-courses")
        .then((res) => {
          setCourses(res.data);
          setFilteredCourses(res.data); // Set filteredCourses to the initial course list
        })
        .catch((err) => {
          alert(err.message);
        })
    }
    getCourses();
    
  }, [])

  // Function to filter courses based on search term
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchValue)
      
    );

    setFilteredCourses(filtered);
  }

  return (
    <div className='view-page-main-container'>
      <div className='view-page-content-con'>
        <div className='view-con-row-1'>
          <div className='view-con-row-1-topic'>
            <span className='topic-one'>Course List</span>
          </div>
        </div>
        <div className='view-con-row-2'>
          <div className='view-con-row-2-topic'>
            <div className='search-and-topic'>
              <span className='topic-two'>Latest courses</span>
            
            <div className='search-option'>
              <form id="search-id">
                <input
                  type="text"
                  placeholder="Search Course"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </form>
            </div>
            </div>
          </div>
          <div className='course-list-container'>
            <div className='course-list-main'>
              {filteredCourses.map((course, index) => (
                <div className='row-1' key={index}>
                  <div className='course-image-con'>
                    <img src={course.courseImage} alt={`${course.courseName}`} width={260} height={150} />
                  </div>
                  <div className='course-deteails-con'>
                    <div className='course-name'>
                      <span className='course-name-text'>{course.courseName}</span>
                    </div>
                    <div className='course-specialization'>
                      <span className='course-specialization-text'>{course.courseId}</span>
                    </div>
                    <div className='course-specialization'>
                      <span className='course-specialization-text'>{course.courseDescription}</span>
                    </div>
                    <Link to={`/instructor/dashboard/courses/course/${course._id}`} className='link-no-style'>
                      <div className='course-view-button' >
                        <span className='view-content-button'>View</span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCourses