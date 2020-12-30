import React from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../assets/images/dropdown.png";
import { SORTING_OPTION } from "../../common/constant";
import { setOrderFilter } from "../../redux/filter/filter.actions";
import "./FilterBar.scss";

const FilterBar = () => {
  const dispatch = useDispatch();

  const productSelector = useSelector((state) => state.product);
  const { products } = productSelector;

  //Grid Layout View
  const gridLayout = () => {
    document.querySelector(".collection-grid-view").style = "opacity:1";
    document
      .querySelector(".product-wrapper-grid")
      .classList.remove("list-view");
    var elems = document.querySelector(".product-list-row.row").childNodes;
    [].forEach.call(elems, function (el) {
      el.className = "";
      el.classList.add("col-lg-3");
    });
  };

  // Layout Column View
  const LayoutView = (colSize) => {
    if (
      !document
        .querySelector(".product-wrapper-grid")
        .classList.contains("list-view")
    ) {
      var elems = document.querySelector(".product-list-row.row").childNodes;
      [].forEach.call(elems, function (el) {
        el.className = "";
        if (colSize === 3) {
          el.classList.add("col-lg-" + colSize, "col-md-6", "col-grid-box");
        } else {
          el.classList.add("col-lg-" + colSize);
        }
      });
    }

    // this.props.onLayoutViewClicked(colSize);
  };

  const changeSorting = (e) => {
    dispatch(setOrderFilter(SORTING_OPTION[e.target.value]));
  };

  return (
    <div className="product-filter-content">
      <div className="search-count">
        <h5>Showing Products 1-{products.length} Result</h5>
      </div>
      <div className="collection-view">
        <ul>
          <li>
            <i className="fas fa-th grid-layout-view" onClick={gridLayout}></i>
          </li>
        </ul>
      </div>
      <div className="collection-grid-view">
        <ul>
          <li>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/icon/2.png`}
              alt=""
              className="product-2-layout-view"
              onClick={() => LayoutView(6)}
            />
          </li>
          <li>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/icon/3.png`}
              alt=""
              className="product-3-layout-view"
              onClick={() => LayoutView(4)}
            />
          </li>
          <li>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/icon/4.png`}
              alt=""
              className="product-4-layout-view"
              onClick={() => LayoutView(3)}
            />
          </li>
          <li>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/icon/6.png`}
              alt=""
              className="product-6-layout-view"
              onClick={() => LayoutView(2)}
            />
          </li>
        </ul>
      </div>
      <div className="product-page-filter">
        <select
          onChange={changeSorting}
          style={{
            background: "url(" + icon + ") no-repeat 95%",
          }}
        >
          <option value="">Sorting items</option>
          <option value="HighToLow">Price: High to Low</option>
          <option value="LowToHigh">Price: Low to High</option>
          <option value="Newest">Newest Items</option>
          <option value="AscOrder">Sort By Name: A To Z</option>
          <option value="DescOrder">Sort By Name: Z To A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
