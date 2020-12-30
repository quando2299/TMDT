import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";

const NotFound = ({ history }) => {
  return (
    <>
      <Helmet>
        <title>Nike shop | 404 not found</title>
        <meta
          name="description"
          content="Multikart – Nike shop eCommerce Template."
        />
      </Helmet>
      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="error-section">
                <h1>404</h1>
                <h2>page not found</h2>
                <CustomButton onClick={() => history.push("/")}>
                  back to home
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withRouter(NotFound);
