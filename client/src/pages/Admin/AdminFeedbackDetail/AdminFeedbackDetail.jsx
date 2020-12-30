import React, { useCallback, useEffect, useState } from "react";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import axiosService from "../../../helpers/axiosService";
import "./AdminFeedbackDetail.scss";

const AdminFeedbackDetail = (props) => {
  const [contact, setContact] = useState({});

  const loadContact = useCallback((contactId) => {
    axiosService
      .get(`/contact/${contactId}`)
      .then((response) => setContact(response.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.message);
        }
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const contactId = props.match.params.contactId;
    loadContact(contactId);
  }, [props, loadContact]);

  return (
    <>
      <AdminBreadcrumb title="Feedback Detail" parent="Feedback" />
      <div className="container-fluid admin-detail">
        <div className="card">
          <div className="card-header">
            <h5>Feedback Detail</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <h4>Feedback Summary</h4>
                <ul className="feedback-detail">
                  <li>Feedback ID: {contact._id}</li>
                  <li>First name: {contact.first_name}</li>
                  <li>Last name: {contact.last_name}</li>
                  <li>
                    Email:&nbsp;
                    <span style={{ textTransform: "lowercase" }}>
                      {contact.email}
                    </span>
                  </li>
                  <li>Phone: {contact.phone}</li>
                  <li>
                    Created at:{" "}
                    {contact.createdAt &&
                      new Date(contact.createdAt)
                        .toISOString()
                        .substring(0, 10)}
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <h4>Feedback review</h4>
                <p>{contact.review}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFeedbackDetail;
