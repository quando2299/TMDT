import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../../assets/images/dropdown.png";
import { alertFailure } from "../../../common/utils";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import MyDropzone from "../../../components/Admin/MyDropzone/MyDropzone";
import Loading from "../../../components/Loading/Loading";
import { categoryRequest } from "../../../redux/category/category.actions";
import { createProductRequest } from "../../../redux/product/product.actions";
import "./AdminProductCreate.scss";

const AdminProductCreate = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    main_img: "",
    images: "",
    sale: 0,
  });
  const [loading, setLoading] = useState(false);

  const [validation, setValidation] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    main_img: "",
    images: "",
    sale: 0,
  });

  const { name, description, price, category, sale, images, main_img } = data;

  const handleChangeProduct = (e) => {
    const name = e.target.name;
    const value = name === "main_img" ? e.target.files[0] : e.target.value;

    setData({
      ...data,
      [name]: value,
    });

    switch (name) {
      case "name":
        validation.name = value.length === 0 ? "Name is required!" : "";
        break;
      case "category":
        validation.category = value === "" ? "Category must have value!" : "";
        break;
      case "price":
        validation.price = value <= 0 ? "Price is not valid!" : "";
        break;
      case "sale":
        validation.sale =
          value > 100 || value < 0 ? "Sale value is not valid!" : "";
        break;
      case "description":
        validation.description =
          value.length === 0 ? "Description is required!" : "";
        break;
      default:
        break;
    }

    setValidation({ ...validation });
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );

    if (
      name === "" ||
      description === "" ||
      price <= 0 ||
      sale < 0 ||
      sale > 100 ||
      main_img === "" ||
      images.length !== 3
    ) {
      return false;
    }

    return valid;
  };

  const dispatch = useDispatch();
  const categorySelector = useSelector((state) => state.category);
  const { categories } = categorySelector;

  useEffect(() => {
    dispatch(categoryRequest());
  }, [dispatch]);

  const getImagesDropzone = (images) => {
    setData({
      ...data,
      images,
    });
  };

  const uploadImagesCloud = async (e) => {
    if (validateForm(validation)) {
      setLoading(true);
      e.preventDefault();
      let pData = { name, description, price, category, sale, images: [] };

      // Upload main image of product
      let formMain = new FormData();
      formMain.append("file", main_img);
      formMain.append("tags", `codeinfuse, medium, gist`);
      formMain.append("upload_preset", process.env.REACT_APP_PRESET);
      formMain.append("timestamp", (Date.now() / 1000) | 0);
      let res_img = await axios({
        url: `${process.env.REACT_APP_UPLOAD_URL}/image/upload`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formMain,
      });
      pData.images.push(res_img.data.secure_url);

      // Upload thumbnail
      await Promise.all(
        images.map(async (image) => {
          let formValue = new FormData();

          formValue.append("file", image);
          formValue.append("tags", `codeinfuse, medium, gist`);
          formValue.append("upload_preset", process.env.REACT_APP_PRESET);
          formValue.append("timestamp", (Date.now() / 1000) | 0);

          let res_tn = await axios({
            url: `${process.env.REACT_APP_UPLOAD_URL}/image/upload`,
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: formValue,
          });
          pData.images.push(res_tn.data.secure_url);
        })
      );

      dispatch(createProductRequest(pData));

      setLoading(false);
    } else {
      alertFailure("Please prefill all fields!");
    }
  };

  return (
    <>
      {loading ? (
        <div className="overlay" style={{ width: "100%" }}>
          <Loading />
        </div>
      ) : null}

      <AdminBreadcrumb title="Add Product" parent="Products" />

      <div className="container-fluid">
        <div className="row product-adding">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5>Product Information</h5>
              </div>
              <div className="card-body product-info-section">
                <div className="digital-add needs-validation">
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="name">
                      <span>*</span> Name
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      required=""
                      value={name}
                      name="name"
                      onChange={handleChangeProduct}
                    />
                    {validation.name.length > 0 && (
                      <div className="error">{validation.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="price">
                      <span>*</span> Price
                    </label>
                    <input
                      className="form-control"
                      id="price"
                      type="number"
                      required=""
                      value={price}
                      name="price"
                      onChange={handleChangeProduct}
                    />
                    {validation.price.length > 0 && (
                      <div className="error">{validation.price}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="sale">
                      <span>*</span> Sale
                    </label>
                    <input
                      className="form-control"
                      id="sale"
                      type="number"
                      required=""
                      value={sale}
                      name="sale"
                      min="0"
                      max="100"
                      onChange={handleChangeProduct}
                    />
                    {validation.sale.length > 0 && (
                      <div className="error">{validation.sale}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="category">
                      <span>*</span> Categories
                    </label>
                    <select
                      className="custom-select"
                      id="category"
                      required=""
                      style={{
                        background: "url(" + icon + ") no-repeat 95%",
                      }}
                      value={category}
                      name="category"
                      onChange={handleChangeProduct}
                    >
                      <option value="">-- Select --</option>
                      {categories &&
                        categories.map((c, index) => (
                          <option value={c._id} key={index}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                    {validation.category.length > 0 && (
                      <div className="error">{validation.category}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="description">
                      <span>*</span> Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="5"
                      type="text"
                      required=""
                      value={description}
                      name="description"
                      onChange={handleChangeProduct}
                    />
                    {validation.description.length > 0 && (
                      <div className="error">{validation.description}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="product-buttons text-center">
                      <button
                        className="btn btn-primary"
                        onClick={uploadImagesCloud}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5>Product Images</h5>
              </div>
              <div className="card-body product-img-section">
                <div className="digital-add needs-validation">
                  <div className="form-group">
                    <label className="col-form-label pt-0" htmlFor="main_img">
                      {" "}
                      Product Image Upload
                    </label>
                    <input
                      id="main_img"
                      type="file"
                      name="main_img"
                      accept="image/*"
                      className="form-control"
                      onChange={handleChangeProduct}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="col-form-label pt-0"
                      htmlFor="dropzone-img"
                    >
                      {" "}
                      Product Thumbnail Upload
                    </label>
                    <MyDropzone
                      getImages={(images) => getImagesDropzone(images)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCreate;
