import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { FaDollarSign } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

import './ViewCourse.css'

function ViewCourse() {

    let {id} = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState();
    const [courseImage, setCourseImage] = useState();
    const [courseName, setCourseName] = useState();
    const [courseId, setCourseId] = useState();
    const [courseDescription, setCourseDescription] = useState();
    const [specialization, setSpecialization] = useState();
    const [coursePrice, setCoursePrice] = useState();
    const [courseStatus, setCourseStatus] = useState();
    const [courseContents, setCourseContents] = useState([]);
    const [skills, setSkills] = useState([]);


    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/learnup/api/course-management/get-course/${id}`);
                console.log(response);
                setCourse(response.data); // Update the course 
                setCourseImage(response.data.courseImage);
                setCourseName(response.data.courseName)
                setCourseId(response.data.courseId)
                setCourseDescription(response.data.courseDescription)
                setSpecialization(response.data.specialization)
                setCoursePrice(response.data.coursePrice)
                setCourseStatus(response.data.courseStatus)
                setCourseContents(response.data.courseContent)
                setSkills(response.data.skills)
                
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };
    
        fetchData();
    }, [id]);

    console.log(course);
    console.log(courseContents);

    function getYouTubeVideoId(url) {
        // Regular expression to match YouTube URL patterns
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      
        // Use the regex to extract the video ID
        const match = url.match(youtubeRegex);
      
        // If there's a match, return the video ID, otherwise return an empty string
        return match ? match[1] : '';
      }

      async function handleDelete(id) {
        const shouldDelete = window.confirm('Are you sure you want to delete this content?');
    
        if (shouldDelete) {
          try {
            const response = await axios.delete(`http://localhost:3500/learnup/api/course-management/getcourse/${courseId}/content/${id}`);
            console.log('Response status:', response.status);
    
            if (response.status === 200) {
              alert('Content deleted');
              setCourseContents(courseContents.filter((content) => content._id !== id));
            } else {
              console.error('Failed to delete Content. Unexpected status:', response.status);
              alert('Failed to delete Content.');
            }
          } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred while deleting the Content.');
          }
        }
      }

      async function handleCourseDelete(id) {
        const shouldDelete = window.confirm('Are you sure you want to delete this content?');
    
        if (shouldDelete) {
          try {
            const response = await axios.delete(`http://localhost:3500/learnup/api/course-management/delete-courses/${id}`);
            console.log('Response status:', response.status);
    
            if (response.status === 200) {
              alert('Course deleted');
              setCourseContents(courseContents.filter((content) => content._id !== id));
              navigate('/instructor/dashboard/courses');
            } else {
              console.error('Failed to delete Content. Unexpected status:', response.status);
              alert('Failed to delete Course.');
            }
          } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred while deleting the Course.');
          }
        }
      }


  return (
    <div className='view-course-main-container'>
        <div className='view-course-content-con'>
            <div className='view-content-row-first'>
            <div className='view-con-row-1-topic'>
                    <span className='topic-one'>{courseName}</span>
                </div>
            </div>
            <div className='view-content-row-two'>
                <div className='view-content-details-con-1'>
                    <div className='course-image-with-details' style={{ backgroundImage: `url(${courseImage})` }}>

                    </div>
                    <div className='course-other-details'>
                        <div className='course-name'>
                            <span className='course-name-text-cor'>{courseName}</span>
                        </div>
                        <div className='course-name-text-int'>
                            <span className='course-des-text'>{specialization}</span><br></br>
                            <span className='course-des-text'>{courseId}</span><br></br>
                            <span className='course-des-text'>{courseStatus}</span>
                        </div>
                        <div className='course-name'>
                            <span className='course-des-text'>{courseDescription}</span>
                        </div>

                        <div className='course-name' style={{ marginTop: '10px' }}>
                            <span className='course-des-text' >Skills</span>
                        </div>
                        <div className='skill-array-container'>
                        {skills.map((skill, index) => (
                            <div className='skill-array-item' key={index}>
                                <span className='skill-item-text'>{skills[index]}</span>
                            </div>
                             ))}
                        </div>
                        <div className='course-price'>
                            <div className='course-price-con'>
                            <FaDollarSign size={25} color='#dcdcdd'/>
                            <span className='course-price-tag'>{coursePrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='view-content-details-con-2'>
                    <div className='view-content-details-con-2-topic'>
                        <span className='view-content-details-con-2-topic-text'>Course Content</span>
                    </div>
                    <div className='view-content-details-con-2-contents'>
                      <div className='add-new-content-container'>
                      <Link to={`/instructor/dashboard/courses/course/addcontent/${id}`} className='link-no-style'>
                        <div className='add-new-content-button'>
                          <span className='add-new-content-btn-span'>Add Content</span>
                        </div>
                        </Link>
                      </div>
                    {courseContents.map((content, index) => (
                       <div className='view-content-list'>
                       
                            <div className='view-content-list-item' >
                                <div className='view-content-list-item-image' key={index}>
                                {/* <iframe
                                    style={{ width: '100%', height: '100%' }}
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(content.lectureVideo)}`}
                                    allowFullScreen
                                ></iframe> */}
                                <iframe
                                style={{ width: '100%', height: '100%' }}
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(content.lectureVideo)}`}
                                title={`Lecture Video: ${content.lectureName}`}
                                allowFullScreen
                                ></iframe>
                                </div>
                                <div className='view-content-list-item-details'>
                                <FaRegCirclePlay className='play-icon-content' size={20} color='#5f5e5f'/>
                                <div className='course-name'>
                                        <span className='course-des-text'>{content.lectureName}</span>
                                </div>
                                </div>
                                <div className='view-content-dlt-con'>
                                
                                <MdOutlineDelete className='content-dlt-btn' size={25} color='#14cc60' onClick={() => handleDelete(content._id)}/>
                                <Link to={`/instructor/dashboard/courses/course/updatecontent/${content._id}`} className='link-no-style'>
                                <BiEditAlt className='content-dlt-btn' size={25} color='#14cc60' width={10}/>
                                </Link>
                                </div>
                                
                                
                            </div>
                        
                       </div>
                       ))}
                    </div>
            </div>
            <div className='view-course-action-container'>
            <Link to={`/instructor/dashboard/courses/course/update/${id}`} className='link-no-style'>
                <div className='view-course-btn-cont'>
                    <span className='view-course-update'>Update</span>
                </div>
                </Link>
                <div className='view-course-btn-cont' onClick={() => handleCourseDelete(courseId)}>
                <span className='view-course-update'>Delete</span>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default ViewCourse