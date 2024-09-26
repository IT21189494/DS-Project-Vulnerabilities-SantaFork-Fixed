import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./ViewCourse.css";

function PurchasedCourse() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState();
  const [courseImage, setCourseImage] = useState();
  const [courseName, setCourseName] = useState();
  const [courseId, setCourseId] = useState();
  const [courseDescription, setCourseDescription] = useState();
  const [specialization, setSpecialization] = useState();
  const [coursePrice, setCoursePrice] = useState();
  const [courseContents, setCourseContents] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/learnup/api/course-management/get-course/${id}`
        );
        console.log(response);
        setCourse(response.data);
        setCourseImage(response.data.courseImage);
        setCourseName(response.data.courseName);
        setCourseId(response.data.courseId);
        setCourseDescription(response.data.courseDescription);
        setSpecialization(response.data.specialization);
        setCoursePrice(response.data.coursePrice);
        setCourseContents(response.data.courseContent);
        setSkills(response.data.skills);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchData();
  }, [id]);

  console.log(course);
  console.log(courseContents);

  function getYouTubeVideoId(url) {
    // Regular expression to match YouTube URL patterns
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    // Use the regex to extract the video ID
    const match = url.match(youtubeRegex);

    // If there's a match, return the video ID, otherwise return an empty string
    return match ? match[1] : "";
  }

  return (
    <div className="view-course-main-container">
      <div className="view-course-content-con">
        <div className="view-content-row-first">
          <div className="view-con-row-1-topic">
            <span className="topic-one">{courseName}</span>
          </div>
        </div>
        <div className="view-content-row-two">
          <div className="view-content-details-con-1">
            <div
              className="course-image-with-details"
              style={{ backgroundImage: `url(${courseImage})` }}
            ></div>
            <div className="course-other-details">
              <div className="course-name">
                <span className="course-name-text-cor">{courseName}</span>
              </div>
              <div className="course-name-text-int">
                <span className="course-des-text">{specialization}</span>
                <br></br>
                <span className="course-des-text">{courseId}</span>
              </div>
              <div className="course-name">
                <span className="course-des-text">{courseDescription}</span>
              </div>
              <div className="course-name" style={{ marginTop: "10px" }}>
                <span className="course-des-text">Skills</span>
              </div>
              <div className="skill-array-container">
                {skills.map((skill, index) => (
                  <div className="skill-array-item" key={index}>
                    <span className="skill-item-text">{skills[index]}</span>
                  </div>
                ))}
              </div>
              <div className="course-price">
                <div className="course-price-con">
                  <FaDollarSign size={25} color="#dcdcdd" />
                  <span className="course-price-tag">{coursePrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="view-content-details-con-2">
          <div className="view-content-details-con-2-topic">
            <span className="view-content-details-con-2-topic-text">
              Course Content
            </span>
          </div>
          <div className="view-content-details-con-2-contents">
            {courseContents.map((content, index) => (
              <div className="view-content-list">
                <div className="view-content-list-item">
                  <div className="view-content-list-item-image" key={index}>
                    {/* <iframe
                      style={{ width: "100%", height: "100%" }}
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                        content.lectureVideo
                      )}`}
                      allowFullScreen
                    ></iframe> */}
                    <iframe
                      style={{ width: "100%", height: "100%" }}
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                        content.lectureVideo
                      )}`}
                      title={`Lecture Video: ${content.lectureName}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="view-content-list-item-details">
                    <FaRegCirclePlay
                      className="play-icon-content"
                      size={20}
                      color="#5f5e5f"
                    />
                    <div className="course-name">
                      <span className="course-des-text">
                        {content.lectureName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasedCourse;
