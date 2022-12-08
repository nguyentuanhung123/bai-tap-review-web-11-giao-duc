loadData();

// Load data:
/*
  Lấy dữ liệu
  Author : NTHUNG (08/12/2022)
  EditBy : NTHUNG (08/12/2022) - Sửa lại API lấy dữ liệu
*/

function loadData() {
  try {
    // Gọi API lấy dữ liệu
    $.ajax({
      type: "GET",
      url: "https://amis.manhnv.net/api/v1/Employees",
      success: function (response) {
        console.log(response);
        // Xử lý dữ liệu
        // 1. Định dạng ngày tháng ===> ngày/tháng/năm
        $("#teacher tbody").empty();
        for (const emp of response) {
          var teacherCode = emp.EmployeeCode;
          var fullName = emp["EmployeeName"];
          var trHTML = `<tr>
          <td class="text-align--center">
              <img src="../assests/Icons/ic_Checkbox_Inactive.png" alt="">
          </td>
          <td class="text-align--left">
              ${teacherCode || ""}
          </td>
          <td class="c-aside">
              ${fullName || ""}
          </td>
          <td class="text-align--center">
              0360368999
          </td>
          <td>
              Tổ Toán - Tin
          </td>
          <td>
              Lý
          </td>
          <td>
              Phòng Tin , phòng TN Hoá học
          </td>
          <td class="text-align--center">
              <img src="../assests/Icons/ic_Check.png" alt="">
          </td>
          <td class="text-align--center">
              <img src="../assests/Icons/ic_Check.png" alt="">
          </td>
          <td>
              <img src="../assests/Icons/ic_Edit.png" alt="" tabindex="0">
              <img src="../assests/Icons/ic_Remove.png" alt="" tabindex="0">
          </td>
      </tr>`;
          $("#teacher tbody").append(trHTML);
        }
        // 2. Định dạng tiền tệ (1000000 -> 1.000.000)

        // Hiển thị dữ liệu lên table
      },
      error: function (error) {
        console.log(error);
        var statusCode = error.status;
        switch (statusCode) {
          case 400:
            var errorMsg = error.response.userMsg;
            alert(errorMsg);
            break;

          case 500:
            break;

          default:
            break;
        }
      },
    });

    // Handle lỗi từ API (nếu có)
  } catch (e) {}
}

//Thay đổi hình ảnh
function changeImage() {}
