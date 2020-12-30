import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { useDispatch, useSelector } from "react-redux";
import SlideToggle from "react-slide-toggle";
import {
  toggleCategoryFilter,
  setPriceRangeFilter,
  setSkip,
} from "../../redux/filter/filter.actions";
import "./Filter.scss";

const Filter = ({ categories }) => {
  const dispatch = useDispatch();
  const filterSelector = useSelector((state) => state.filter);
  const { filter } = filterSelector;
  const { category: categoryArr } = filter;

  const [price, setPrice] = useState({
    min: 0,
    max: 500,
  });

  const handleToggle = (id) => {
    const currentIndex = categoryArr.indexOf(id);
    const newChecked = [...categoryArr];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    dispatch(toggleCategoryFilter(newChecked));
    dispatch(setSkip(0));
  };

  const handleSetPrice = (value) => {
    setPrice(value);
    dispatch(setSkip(0));
    dispatch(setPriceRangeFilter(Object.values(value)));
  };

  const closeFilter = () => {
    document.querySelector(".collection-filter").style = "left: -365px";
  };

  return (
    <>
      <div className="collection-filter-block">
        <div className="collection-mobile-back">
          <span className="filter-back" onClick={closeFilter}>
            <i className="fa fa-angle-left" aria-hidden="true"></i> back
          </span>
        </div>
        <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block">
              <h3 className="collapse-block-title" onClick={onToggle}>
                category
              </h3>
              <div
                className="collection-collapse-block-content"
                ref={setCollapsibleElement}
              >
                <div className="collection-brand-filter">
                  {categories &&
                    categories.map((item, index) => {
                      return (
                        <div
                          className="custom-control custom-checkbox collection-filter-checkbox"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            onChange={() => handleToggle(item._id)}
                            checked={
                              categoryArr.indexOf(item._id) === -1
                                ? false
                                : true
                            }
                            className="custom-control-input"
                            id={item.name}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.name}
                          >
                            {item.name}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </SlideToggle>
        <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block open">
              <h3 className="collapse-block-title" onClick={onToggle}>
                price
              </h3>
              <div
                className="collection-collapse-block-content block-price-content"
                ref={setCollapsibleElement}
              >
                <div className="collection-brand-filter">
                  <div className="custom-control custom-checkbox collection-filter-checkbox">
                    <InputRange
                      maxValue={1000}
                      minValue={0}
                      value={price}
                      onChange={(value) => handleSetPrice(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </SlideToggle>
      </div>
    </>
  );
};

export default Filter;
