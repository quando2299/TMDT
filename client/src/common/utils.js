import Swal from "sweetalert2";

export const alertSuccess = (msg) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: msg,
  });
};

export const alertFailure = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
  });
};

export const customAlertSuccess = (msg) => {
  Swal.fire({
    title: "Congratulation!",
    text: msg,
    icon: "success",
    confirmButtonColor: "#2778c4",
    confirmButtonText: "OK!",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
};

// export const confirmPopup = (fnCallback) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire("Deleted!", "Your file has been deleted.", "success");
//     }
//   });
// };
