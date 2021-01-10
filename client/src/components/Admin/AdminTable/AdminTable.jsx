import React from "react";
import { useDispatch } from "react-redux";
import ReactTable from "react-table";
import Swal from "sweetalert2";
import "./AdminTable.scss";

const AdminTable = ({
  myClass,
  multiSelectOption,
  allSelectOption,
  pagination,
  myData,
  pageSize,
  deteleRequest,
  getEditValue,
}) => {
  const dispatch = useDispatch();

  const confirmPopup = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deteleRequest(id));
      }
    });
  };

  const renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        dangerouslySetInnerHTML={
          cellInfo.column.id !== "createdAt" &&
          cellInfo.column.id !== "updatedAt"
            ? {
                __html: myData[cellInfo.index][cellInfo.column.id],
              }
            : {
                __html: new Date(myData[cellInfo.index][cellInfo.column.id])
                  .toISOString()
                  .substring(0, 10),
              }
        }
      />
    );
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getEditValueRow = (item, action) => {
    getEditValue(item, action);
  };

  const columns = [];
  for (var key in myData[0]) {
    let editable = renderEditable;
    if (key === "image") {
      editable = null;
    }
    if (key === "status") {
      editable = null;
    }
    if (key === "role") {
      editable = null;
    }
    if (key === "checked"){
      editable = null;
    }
    if (key !== "__v") {
      columns.push({
        Header: <b>{Capitalize(key.toString())}</b>,
        accessor: key,
        Cell: editable,
        style: {
          textAlign: "center",
        },
      });
    }
  }
  if (allSelectOption) {
    columns.push({
      Header: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      Cell: (row) => (
        <div>
          <span onClick={() => getEditValueRow(myData[row.index], "detail")}>
            <i
              className="far fa-eye"
              style={{
                cursor: "pointer",
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "#ff9944",
              }}
            ></i>
          </span>
          <span
            onClick={() => {
              confirmPopup(myData[row.index]._id);
            }}
          >
            <i
              className="fa fa-trash"
              style={{
                cursor: "pointer",
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "#e4566e",
              }}
            ></i>
          </span>
          <span onClick={() => getEditValueRow(myData[row.index], "update")}>
            <i
              className="fas fa-pencil-alt"
              style={{
                cursor: "pointer",
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "rgb(40, 167, 69)",
              }}
            ></i>
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else if (multiSelectOption === false) {
    columns.push({
      Header: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      Cell: (row) => (
        <div>
          <span onClick={() => getEditValueRow(myData[row.index], "detail")}>
            <i
              className="far fa-eye"
              style={{
                cursor: "pointer",
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "#ff9944",
              }}
            ></i>
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else {
    columns.push({
      Header: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      Cell: (row) => (
        <div>
          <span
            onClick={() => {
              confirmPopup(myData[row.index]._id);
            }}
          >
            <i
              className="fa fa-trash"
              style={{
                cursor: "pointer",
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "#e4566e",
              }}
            ></i>
          </span>
          <span onClick={() => getEditValueRow(myData[row.index], "update")}>
            <i
              className="fas fa-pencil-alt"
              style={{
                cursor: "pointer",
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "rgb(40, 167, 69)",
              }}
            ></i>
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  }
  return (
    <ReactTable
      data={myData}
      columns={columns}
      defaultPageSize={pageSize}
      className={myClass}
      showPagination={pagination}
    />
  );
};

AdminTable.defaultProps = {
  allSelectOption: false,
};

export default AdminTable;
