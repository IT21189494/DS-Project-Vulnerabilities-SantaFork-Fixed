import React, { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./instructor-incs.styles.css";

function InstructorIncs() {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:3500/learnup/api/course-management/contact-admin/admin/contacts`
      // );
      const response = await axios.get(
        "http://localhost:3500/learnup/api/course-management/contact-admin/admin/contacts"
      );
      

      if (response.data) {
        setInquiries(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort inquiries by createdAt in descending order
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="instructor-inqs-page-container">
      <span className="partition-heading">Received Inquiries</span>
      <div className="inquiry-display-container">
        
        {inquiries.length < 1 ? (
          <Loading passer={{ message: "No Inquiries" }} />
        ) : (
          <div className="instructor-inqs-partition-canvas">
            <table>
              <tr>
                <th>Created At</th>
                <th>Topic</th>
                <th>State</th>
                <th>Action</th>
              </tr>
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id}> 
                  <td>
                    {format(new Date(inquiry.createdAt), "dd MMM yyyy HH:mm")}
                  </td>
                  <td>{inquiry.topic}</td>
                  <td>
                    <span
                      className={`instructor-inqs-status-badge ${
                        inquiry.status === "pending"
                          ? "pending-msg"
                          : "resolved-msg"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/dashboard/inquiries/${inquiry._id}`}>
                      <button>Inspect</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorIncs;