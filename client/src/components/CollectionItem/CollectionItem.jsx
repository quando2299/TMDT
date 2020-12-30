import React from "react";
import { withRouter } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import "./CollectionItem.scss";

const CollectionItem = ({ item, history }) => {
  const { name } = item;

  return (
    <div className="collection-block">
      <img src="" alt={name} className="img-fluid" />
      <div className="collection-content text-center">
        <h3>{name}</h3>
        <CustomButton onClick={() => history.push("/shop")}>
          shop now
        </CustomButton>
      </div>
    </div>
  );
};

export default withRouter(CollectionItem);
