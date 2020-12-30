import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import AdminTable from "../../../components/Admin/AdminTable/AdminTable";
import { getFeedbackRequest } from "../../../redux/contact/contact.actions";

const AdminFeedback = () => {
  const dispatch = useDispatch();
  const contactSelector = useSelector((state) => state.contact);
  const { feedbacks } = contactSelector;

  const getFeedbacks = useCallback(() => {
    dispatch(getFeedbackRequest());
  }, [dispatch]);

  useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);

  const [editValue, setEditValue] = useState({});

  const isEmptyObj = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  if (!isEmptyObj(editValue)) {
    return <Redirect to={`/admin/feedback-detail/${editValue._id}`} />;
  }

  const getEditValue = (item) => {
    setEditValue(item);
  };

  const convertData = (data) => {
    let newData = [...data];

    // eslint-disable-next-line
    newData.map((item) => {
      delete item.review;
      delete item.updatedAt;
    });

    return newData;
  };

  return (
    <>
      <AdminBreadcrumb title="Feedback" parent="Feedback" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>Feedback</h5>
          </div>
          <div className="card-body">
            <div id="basicScenario" className="product-physical">
              {feedbacks.length > 0 && (
                <AdminTable
                  multiSelectOption={false}
                  myData={convertData(feedbacks)}
                  pageSize={10}
                  pagination={true}
                  getEditValue={(item) => getEditValue(item)}
                  class="-striped -highlight"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFeedback;
