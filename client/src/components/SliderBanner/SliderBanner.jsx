import React from "react";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import CustomButton from "../CustomButton/CustomButton";
import "./SliderBanner.scss";

const SliderBanner = ({ history }) => {
  return (
    <section className="p-0 small-slider">
      <Slider className="slide-1 home-slider">
        <div>
          <div className="home home--1">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="slider-contain">
                    <div>
                      <h4>Welcome to Nike Shop</h4>
                      <h1>let's shop</h1>

                      <CustomButton onClick={() => history.push("/shop")}>
                        shop now
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="home home--2">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="slider-contain">
                    <div>
                      <h4>Any thing that you want</h4>
                      <h1>save 20%</h1>
                      <CustomButton onClick={() => history.push("/shop")}>
                        shop now
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="home home--3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="slider-contain">
                    <div>
                      <h4>Special offer</h4>
                      <h1>let's shop</h1>

                      <CustomButton onClick={() => history.push("/shop")}>
                        shop now
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default withRouter(SliderBanner);
