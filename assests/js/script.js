loadData();
createEvent();

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
            var errorMsg = error.responseJSON.userMsg;
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
  } catch (e) {
    console.log(e);
  }
}

/**
 * Lập trình cho các sự kiện
 * Author : NTHUNG(12/12/2022)
 * Edit by : NTHUNG(12/12/2022)
 */
function createEvent() {
  try {
    //Add:
    //Hiển thị form thêm mới dữ liệu
    $("#btn-add").click(btnAddOnClick);
    //Tắt form thêm mới dữ liệu
    $("#btn-close").click(btnCloseOnClick);
    $("#btn-close-form-detail").click(btnCloseOnClick);
    //Hiện thông báo dialog khi bấm nút Lưu ở form chi tiết nhân viên
    $("#btn-save").click(btnSaveOnClick);
    //Đóng form Dialog khi bấm nút Đóng hoặc Không
    $("#btn-cancel-dialog").click(btnCloseDialogOnClick);
    $("#btn-close-dialog").click(btnCloseDialogOnClick);
    $(".dialog__button").click(btnCloseDialogOnClick);
    //Thực hiện hàm cho các trường bắt buộc nhập
    $("[m-required]").blur(onValidateFieldRequired);
    $("#dialog-notice button.dialog__button--accept").click(
      btnConfirmErrorDialog
    );
  } catch (e) {
    console.log(e);
  }
}

function onValidateFieldRequired() {
  try {
    var value = this.value;
    var label = $(this).attr("field-label");
    if (value.trim() == "" || value == null || value == undefined) {
      this.classList.add("field--error");
      var errorTextEls = $(this).siblings(".error-text");
      if (errorTextEls.length == 0) {
        var errorElHTML = `<div class="error-text" hidden>
                            ${label} không được để trống
                          </div> `;
        $(this).after(errorElHTML);
      }
    } else {
      this.classList.remove("field--error");
      $(this).siblings(".error-text").remove();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 */
function btnConfirmErrorDialog() {
  try {
    $("#dialog-notice").hide();
    if (fieldErrors.length > 0) {
      //Set focus vào ô lỗi đầu tiên
      fieldErrors[0].focus();
      for (const field of fieldErrors) {
        //add style lỗi :
        field.classList.add("field--error");
        var fieldLabel = $(field).attr("field-label");
        //Bổ sung element thông tin lỗi sau input:
        var errorElHTML = `<div class="error-text" hidden>
                                ${fieldLabel} không được để trống
                            </div> `;
        $(field).after(errorElHTML);
      }
    }
  } catch (eror) {
    console.log(error);
  }
}

//Thay đổi hình ảnh
function changeImage() {}

/**
 * Hiển thị form thêm mới dữ liệu
 * Author : NTHUNG (12/12/2022)
 * EditBy : NTHUNG (12/12/2022)
 */
function btnAddOnClick() {
  //Hiển thị form chi tiết
  try {
    document.getElementById("popup-teacher-detail").style.display = "flex";
    //Lấy mã nhân viên mới / Set các giá trị mặc định (nếu có):
    $.ajax({
      type: "GET",
      async: true,
      url: "https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode",
      success: function (response) {
        $("#txtTeacherCode").val(response);
      },
    });

    //Focus vào ô nhập liệu họ tên
    $("#txtTeacherName").focus();
  } catch (e) {
    console.log(e);
  }
}

/**
 * Đóng form thêm mới dữ liệu
 * Author : NTHUNG (12/12/2022)
 * EditBy : NTHUNG (12/12/2022)
 */
function btnCloseOnClick() {
  //Đóng form chi tiết
  try {
    document.getElementById("popup-teacher-detail").style.display = "none";
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 * Mở form Dialog
 * Author : NTHUNG (12/12/2022)
 * EditBy : NTHUNG (12/12/2022)
 */
function btnSaveOnClick() {
  //Mở form dialog
  try {
    //Lấy ra tất cả các field có attribute là property-name:
    let fields = $("[property-name]");
    let employee = {};
    //Duyệt các fields:
    for (const field of fields) {
      //Lấy ra value:
      const value = field.value; //const value = $(field).val() -- jquery
      const propertyName = $(field).attr("property-name");
      employee[propertyName] = value; //gán giá trị vừa nhập vào property-name
    }
    let errorMsgs = [];
    fieldErrors = [];
    //Lấy ra tất cả các trường bắt buộc:
    var fieldRequireds = $("[m-required]");
    for (const field of fieldRequireds) {
      const value = field.value; //$(field).val();
      const fieldLabel = $(field).attr("field-label");
      if (value.trim() == "" || value == null || value == undefined) {
        errorMsgs.push(`${fieldLabel} không được để trống`);
        fieldErrors.push(field);
      }
    }

    //Kiểm tra errorMsg xem có lỗi không ?
    if (errorMsgs.length > 0) {
      //Hiển thị thông báo lỗi
      //1. Build dialog thông báo:
      let dialogNotice = $("#dialog-notice");
      //2. Thay đổi nội dung thông báo
      $("#dialog-notice .dialog__content").empty();
      for (const msg of errorMsgs) {
        $("#dialog-notice .dialog__content").append(`<li>${msg}</li>`);
      }
      // -- Hiển thị:
      // dialogNotice.show();
      document.getElementById("dialog-notice").style.display = "flex";
      return;
    }

    //3. Gọi API cất dữ liệu
    $.ajax({
      type: "POST",
      url: "https://amis.manhnv.net/api/v1/Employees",
      data: JSON.stringify(employee),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        alert("Thêm thành công");
      },
      error: function (error) {
        alert("Lỗi !!!!!!!!!!!!");
        console.log(error);
        var statusCode = error.status;
        switch (statusCode) {
          case 400:
            var errorMsg = error.responseJSON.userMsg;
            alert(errorMsg);
            break;

          case 500:
            break;

          default:
            break;
        }
      },
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 * Đóng form Dialog
 * Author : NTHUNG (12/12/2022)
 * EditBy : NTHUNG (12/12/2022)
 */
function btnCloseDialogOnClick() {
  //Mở form dialog
  try {
    document.getElementById("dialog-notice").style.display = "none";
  } catch (e) {
    console.log(e);
  }
}
