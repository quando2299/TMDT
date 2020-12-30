import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import AdminBreadcrumb from "../../../components/Admin/AdminBreadcrumb/AdminBreadcrumb";
import AdminTable from "../../../components/Admin/AdminTable/AdminTable";
import {
  categoryRequest,
  createCategoryRequest,
  deleteCategoryRequest,
  updateCategoryRequest,
} from "../../../redux/category/category.actions";

const AdminCategory = () => {
  const dispatch = useDispatch();
  const categorySelector = useSelector((state) => state.category);
  const { categories } = categorySelector;

  const getCategories = useCallback(() => {
    dispatch(categoryRequest());
  }, [dispatch]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [editValue, setEditValue] = useState({});

  const onOpenModal = () => {
    setEditValue({});
    setName("");
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const isEmptyObj = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (isEmptyObj(editValue)) {
      dispatch(createCategoryRequest({ name }));
    } else {
      dispatch(updateCategoryRequest({ name }, editValue._id));
    }

    setName("");
    setOpen(false);
  };

  const getEditValue = (item) => {
    setEditValue(item);
    setName(item.name);
    setOpen(true);
  };

  return (
    <>
      <AdminBreadcrumb title="Category List" parent="Categories" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>Category List</h5>
          </div>
          <div className="card-body">
            <div className="btn-popup pull-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onOpenModal}
                data-toggle="modal"
                data-original-title="test"
                data-target="#exampleModal"
              >
                Add Category
              </button>
              <Modal open={open} onClose={onCloseModal}>
                <div className="modal-header">
                  <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                    {!isEmptyObj(editValue)
                      ? "Update Category"
                      : "Add Category"}
                  </h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name" className="col-form-label">
                        Category Name :
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {!isEmptyObj(editValue) ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCloseModal}
                  >
                    Close
                  </button>
                </div>
              </Modal>
            </div>
            <div className="clearfix"></div>
            <div id="basicScenario" className="product-physical">
              {categories.length > 0 && (
                <AdminTable
                  multiSelectOption={true}
                  myData={categories}
                  pageSize={10}
                  pagination={true}
                  deteleRequest={deleteCategoryRequest}
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

export default AdminCategory;
