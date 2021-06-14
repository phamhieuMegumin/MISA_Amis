<template>
  <div class="modal-container">
    <!-- Dialog error -->
    <!--  -->
    <v-dialog v-model="dialogNotifyError" width="444px">
      <DialogNotify
        @closeDialog="handleCloseErrorDialog"
        type="notify-error"
        :notifyMessage="notifyMessage"
      />
    </v-dialog>
    <!--  -->
    <!-- End of dialog error -->
    <!-- Dialog danger -->
    <!--  -->
    <v-dialog v-model="dialogNotifyDanger" width="444px">
      <DialogNotify
        @closeDialog="handleCloseDangerDialog"
        type="notify-danger"
        :notifyMessage="notifyMessage"
      />
    </v-dialog>
    <!--  -->
    <!-- End of dialog danger -->
    <!-- Dialog danger -->
    <!--  -->
    <v-dialog v-model="dialogNotifyConfirm" width="444px">
      <DialogNotify
        @closeDialog="handleCloseConfirmDialog"
        type="notify-note"
        :notifyMessage="notifyMessage"
        @closeAllDialog="handleCloseAllDialog"
        @onAddOrUpdate="handleAddOrUpdate"
      />
    </v-dialog>
    <!--  -->
    <!-- End of dialog danger -->
    <div class="modal-header-container">
      <div class="modal-header">
        <h3 class="modal-title">Thông tin nhân viên</h3>
        <div class="modal-combobox">
          <div class="combobox-customer">
            <CheckboxField :content="'Là khách hàng'" />
          </div>
          <div class="combobox-provider">
            <CheckboxField :content="'Là nhà cung cấp'" />
          </div>
        </div>
      </div>
      <div class="modal-close">
        <div class="modal-icon help-icon"></div>
        <div class="modal-icon close-icon" @click="onClose"></div>
      </div>
    </div>
    <!--  -->
    <!-- end modal header -->
    <!-- modal content -->
    <!--  -->
    <div class="modal-content-wrapper">
      <div class="modal-content">
        <!-- modal content left -->
        <!--  -->
        <div class="modal-content-left">
          <div class="p-12 group-input">
            <div class="input-code pr-6">
              <InputField
                :label="'Mã'"
                :required="true"
                v-model="employee.employeeCode"
                :errorNotify="errorNotifyCode"
              />
            </div>
            <div class="input-name">
              <InputField
                :label="'Tên'"
                :required="true"
                :autofocus="true"
                v-model="employee.fullName"
                :errorNotify="errorNotifyFullName"
              />
            </div>
          </div>
          <div class="p-12">
            <label>Đơn vị</label>
            <v-autocomplete
              solo
              v-model="employee.deparmentId"
              :items="listDepartment"
              item-text="deparmentName"
              item-value="deparmentId"
              no-data-text="Không có dữ liệu"
              :error="errorNotifyDepartment.status"
              :error-messages="errorNotifyDepartment.errorMessage"
            ></v-autocomplete>
          </div>
          <div class="p-12">
            <InputField :label="'Chức danh'" v-model="employee.positionName" />
          </div>
        </div>
        <!--  -->
        <!-- end modal content left -->
        <!-- modal content right -->
        <!--  -->
        <div class="modal-content-right">
          <div class="p-12 group-input">
            <div class="input-date pr-6">
              <InputField
                :label="'Ngày sinh'"
                type="date"
                v-model="employee.dateOfBirth"
              />
            </div>
            <!-- gender -->
            <!--  -->
            <v-radio-group v-model="employee.gender">
              <label class="gender-label">Giới tính</label>
              <div class="radio-container">
                <v-radio :label="'Nam'" :value="1" color="#2ca01c"></v-radio>
                <v-radio :label="'Nữ'" :value="0" color="#2ca01c"></v-radio>
                <v-radio :label="'Khác'" :value="2" color="#2ca01c"></v-radio>
              </div>
            </v-radio-group>
            <!--  -->
            <!-- end gender -->
          </div>
          <div class="p-12 group-input">
            <div class="input-editer pr-6">
              <InputField
                :label="'Số CMND'"
                v-model="employee.identityNumber"
              />
            </div>
            <div class="input-date-rage">
              <InputField
                :label="'Ngày cấp'"
                type="date"
                v-model="employee.identityDate"
              />
            </div>
          </div>
          <div class=" pr-6">
            <InputField :label="'Nơi cấp'" v-model="employee.identityPlace" />
          </div>
        </div>
        <!--  -->
        <!-- end modal content right -->
      </div>
      <!-- modal content bottom-->
      <!--  -->
      <div class="modal-content-bottom pt-24">
        <div class="p-12">
          <InputField :label="'Địa chỉ'" v-model="employee.address" />
        </div>
        <div class="p-12 group-input">
          <div class=" pr-6">
            <InputField :label="'ĐT di động'" v-model="employee.phoneNumber" />
          </div>
          <div class=" pr-6">
            <InputField
              :label="'ĐT cố định'"
              v-model="employee.landlinePhone"
            />
          </div>
          <div class=" pr-6">
            <InputField :label="'Email'" v-model="employee.email" />
          </div>
        </div>
        <div class="p-12 group-input">
          <div class=" pr-6">
            <InputField
              :label="'Tài khoản ngân hàng'"
              v-model="employee.bankAccount"
            />
          </div>
          <div class=" pr-6">
            <InputField :label="'Tên ngân hàng'" v-model="employee.bankName" />
          </div>
          <div class=" pr-6">
            <InputField :label="'Chi nhánh'" v-model="employee.bankBranch" />
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- end modal content -->
    <!-- modal footer -->
    <!--  -->
    <div class="modal-footer-container">
      <div class="modal-footer">
        <div class="btn-cancel" @click="onClose">
          <Button :content="'Hủy'" :btnWhite="true" />
        </div>
        <div class="btn-group">
          <div class="pr-12" @click="handleAddOrUpdate">
            <Button :content="'Cất'" :btnWhite="true" />
          </div>
          <div @click="handleSaveAndAdd">
            <Button :content="'Cất và Thêm'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../commons/Button.vue";
import InputField from "../commons/InputField.vue";
import CheckboxField from "../commons/CheckboxField.vue";
import DefaultEmployee from "../constant/DefaultEmployee";
import DialogNotify from "../commons/DialogNotify.vue";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default {
  props: [
    "dialogAddOrUpdate",
    "listDepartment",
    "employeeDetail",
    "modeUpdate",
  ],
  components: {
    Button,
    InputField,
    CheckboxField,
    DialogNotify,
  },
  created() {
    if (this.employeeDetail) {
      this.employee = { ...this.employeeDetail };
      this.compareObject = this.employeeDetail;
      // format giá trị ngày tháng
      this.employee.dateOfBirth = this.formatDateEmployee(
        this.employee.dateOfBirth
      );
      this.employee.identityDate = this.formatDateEmployee(
        this.employee.identityDate
      );
    } else this.getNewEmployeeCode();
  },

  data() {
    return {
      // Nhân viên và các trường của nhân viên
      employee: {
        employeeId: "",
        employeeCode: "",
        fullName: "",
        deparmentId: "",
        gender: 1,
        dateOfBirth: null,
        identityNumber: "",
        identityDate: null,
        identityPlace: "",
        positionName: "",
        address: "",
        phoneNumber: "",
        landlinePhone: "",
        email: "",
        bankAccount: "",
        bankName: "",
        bankBranch: "",
      },
      compareObject: null, // object lưu dữ liệu nhân viên để so sánh thay đổi
      notifyMessage: "", // Nội dùng dialog
      dialogNotifyError: false, // hiển thị dialog thông báo lỗi
      dialogNotifyDanger: false, // hiển thị dialog cảnh báo
      dialogNotifyConfirm: false, // hiển thị dialog thông báo
      errorNotifyCode: {
        status: false, // bắt validate Code field
        errorMessage: "",
      },
      errorNotifyFullName: {
        status: false, // bắt validate fullName field
        errorMessage: "",
      },
      errorNotifyDepartment: {
        status: false, // bắt validate đơn vị
        errorMessage: "",
      },
    };
  },

  watch: {
    // theo dõi đóng mở dialog và thực hiện các tác vụ
    dialogAddOrUpdate() {
      // đóng dialog
      // tác vụ : reset dialog, reset các lỗi validate của field, kiểm tra sự thay đổi của field
      if (!this.dialogAddOrUpdate) {
        this.employee = { ...DefaultEmployee }; // reset dialog
        const resetData = {
          status: false,
          errorMessage: "",
        };
        this.errorNotifyCode = { ...resetData }; // reset hiển thị validate Code
        this.errorNotifyFullName = { ...resetData }; // reset hiển thị validate fullName
        this.errorNotifyDepartment = { ...resetData }; // reset hiển thị validate department
        this.$emit("resetEmployeeDetail");
      }
      // Mở dialog
      // tác vụ : lấy mã nhân viên mới
      else {
        if (!this.employeeDetail) this.getNewEmployeeCode(); // lấy mã nhân viên khi dialog được show
      }
    },
    employeeDetail() {
      // format giá trị ngày tháng
      if (this.employeeDetail) {
        this.employee = { ...this.employeeDetail };
        this.employee.dateOfBirth = this.formatDateEmployee(
          this.employee.dateOfBirth
        );
        this.employee.identityDate = this.formatDateEmployee(
          this.employee.identityDate
        );
      }
      //
    },
    "employee.employeeCode"() {
      if (this.employee.employeeCode.length > 0) {
        this.errorNotifyCode.status = false;
      } else if (
        this.employee.employeeCode.length == 0 &&
        this.dialogAddOrUpdate
      ) {
        this.errorNotifyCode.status = true;
      }
    },
    "employee.fullName"() {
      if (this.employee.fullName.length > 0) {
        this.errorNotifyFullName.status = false;
      } else if (this.employee.fullName.length == 0 && this.dialogAddOrUpdate)
        this.errorNotifyFullName.status = true;
    },
    "employee.departmentId"() {
      if (this.employee.deparmentId.length > 0) {
        this.errorNotifyDepartment.status = false;
        this.errorNotifyDepartment.errorMessage = "";
      }
    },
  },

  methods: {
    // Thay đổi chế độ cất và thêm
    // CreatedBy : PQHieu(12/06/2021)
    handleSaveAndAdd() {
      this.handleSaveAndAdd();
      this.$emit("handleShowDialog"); // Hiển thị dialog sau khi cất
    },

    // đóng dialog cảnh báo
    // CreatedBy : PQHieu(12/6/2021)
    handleCloseDangerDialog() {
      this.dialogNotifyDanger = false;
    },

    // đóng dialog báo lỗi
    // CreatedBy : PQHieu(12/6/2021)
    handleCloseErrorDialog() {
      this.dialogNotifyError = false;
    },

    // đóng dialog báo lỗi
    // CreatedBy : PQHieu(12/6/2021)
    handleCloseConfirmDialog() {
      this.dialogNotifyConfirm = false;
    },

    // đóng tất cả dialog hiện tại
    // CreatedBy: PQhieu(12/6/2021)
    handleCloseAllDialog() {
      this.handleCloseConfirmDialog();
      this.$emit("handleCloseDialog");
    },

    // thêm hoặc sửa nhân viên
    // CreatedBy : PQHieu(12/06/2021)
    async handleAddOrUpdate() {
      // kiểm tra validate dữ liệu
      if (this.validate()) {
        if (!this.modeUpdate) {
          this.handleAdd();
        } else this.handelUpdate();
      }
    },

    // Kiểm tra dữ liệu
    // CreatedBy : PQHieu(13/06/2021)
    validate() {
      var isValid = true;
      if (this.employee.deparmentId.length == 0) {
        this.notifyMessage = "Đơn vị không được để trống";
        this.errorNotifyDepartment.status = true;
        this.errorNotifyDepartment.errorMessage = "Đơn vị không được để trống";
        this.dialogNotifyError = true;
        isValid = false;
      }

      if (this.employee.fullName.length == 0) {
        this.notifyMessage = "Tên không được để trống";
        this.errorNotifyFullName.status = true;
        this.errorNotifyFullName.errorMessage = "Tên không được để trống";
        this.dialogNotifyError = true; // hiển thị dialog báo lỗi
        isValid = false;
      }
      if (this.employee.employeeCode.length == 0) {
        this.notifyMessage = "Mã nhân viên không được để trống";
        this.errorNotifyCode.status = true;
        this.errorNotifyCode.errorMessage = "Mã không được để trống";
        this.dialogNotifyError = true; // hiển thị dialog báo lỗi
        isValid = false;
      }
      return isValid;
    },

    // thêm nhân viên
    // CreatedBy : PQHieu(12/06/2021)
    async handleAdd() {
      this.employee.employeeId = uuidv4();
      try {
        await axios({
          method: "post",
          url: "https://localhost:44376/api/v1/Employees",
          data: this.employee,
        });
        this.$emit("handleCloseDialog"); // Ẩn dialog là resetdialog
        this.$emit("onNotify", "Nhân viên đã được thêm thành công");
        this.$emit("handleReload"); // load laị dữ liệu
      } catch (error) {
        if (error.response.status == "400") {
          if (error.response.data.data.detail.fieldNotValid == "EmployeeCode") {
            this.notifyMessage = error.response.data.userMsg;
            this.dialogNotifyDanger = true; // hiển thị dialog cảnh báo
          }
        }
      }
    },

    // sửa nhân viên
    // CreatedBy : PQHieu(12/06/2021)
    async handelUpdate() {
      try {
        await axios({
          method: "put",
          url: `https://localhost:44376/api/v1/Employees/${this.employee.employeeId}`,
          data: this.employee,
        });
        this.$emit("handleCloseDialog"); // Ẩn dialog là resetdialog
        this.$emit("onNotify", "Nhân viên đã được cập nhật");
        this.$emit("handleReload"); // load laị dữ liệu
      } catch (error) {
        if (error.response.status == "400") {
          if (error.response.data.data.detail.fieldNotValid == "EmployeeCode") {
            this.notifyMessage = error.response.data.userMsg;
            this.dialogNotifyDanger = true; // hiển thị dialog cảnh báo
          }
        }
      }
    },

    // Lấy mã nhân viên mới
    // CreatedBy: PQHieu(12/06/2021)
    async getNewEmployeeCode() {
      try {
        this.showLoading = true; // hiện loading
        const data = await axios.get(
          "https://localhost:44376/api/v1/Employees/NewCode"
        );
        this.employee.employeeCode = data.data;
        this.showLoading = false; // ẩn loading
      } catch (error) {
        console.log(error);
      }
    },

    // format lại giá trị ngày tháng để hiển thị
    // CreatedBy : PQHieu(12/06/2021)
    formatDateEmployee(date) {
      if (date) {
        return this.formatDate(date);
      }
      return null;
    },

    // chuyển đổi giá trị ngày tháng về yyyy-mm-dd
    // CreatedBy : PQHieu(12/06/2021)
    formatDate(date) {
      if (date) {
        const newDate = new Date(date);
        let strDay = newDate.getDate();
        let strMonth = newDate.getMonth() + 1;
        let strYear = newDate.getFullYear();
        if (strDay < 10) strDay = `0${strDay}`;
        if (strMonth < 10) strMonth = `0${strMonth}`;
        return `${strYear}-${strMonth}-${strDay}`;
      }
      return null;
    },

    // bắt sự kiện đóng dialog và thự hiện so sánh dữ liệu để đưa ra thông báo
    // CreatedBy : PQhieu(14/06/2021)
    onClose() {
      if (this.modeUpdate) {
        var newOb = this.employeeDetail;
        newOb.dateOfBirth = this.formatDate(newOb.dateOfBirth);
        newOb.identityDate = this.formatDate(newOb.identityDate);
        if (!this.handleCompareObject(newOb, this.employee)) {
          this.dialogNotifyConfirm = true;
        } else this.$emit("handleCloseDialog");
      } else this.$emit("handleCloseDialog");
    },

    // so sánh 2 object
    // CreatedBy : PQhieu(14/06/2021)
    handleCompareObject(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (object1[key] !== object2[key]) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style scoped>
.modal-container {
  position: relative;
  background: #fff;
  height: 100%;
  overflow-y: auto;
}
.modal-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header {
  padding: 20px 12px 20px 32px;
  display: flex;
  align-items: center;
}
.modal-title {
  font-size: 24px;
  color: #111;
  font-weight: 700;
}
.radio-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-combobox {
  display: flex;
}

.modal-close {
  padding: 12px;
  display: flex;
  align-items: center;
}
.combobox-customer,
.combobox-provider {
  padding: 0 19.5px;
}
.modal-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
}
.help-icon {
  background-position: -89px -144px;
  margin-right: 10px;
}
.close-icon {
  background-position: -144px -144px;
}
/* modal content */
.modal-content-wrapper {
  padding: 0 32px 20px 32px;
}
.modal-content {
  display: flex;
}
/* input */
.group-input {
  display: flex;
  align-items: center;
}
.input-code,
.input-date-rage {
  width: 40%;
}
.input-name,
.input-editer {
  width: 60%;
}
.pr-6 {
  padding-right: 6px !important;
}
.v-application .pr-6 {
  padding-right: 6px !important;
}
.pr-12 {
  padding-right: 12px;
}
.p-12 {
  padding-bottom: 12px;
}
.pt-24 {
  padding-top: 24px;
}
.pb-24 {
  padding-bottom: 24px;
}
.modal-content-left {
  padding-right: 26px;
  width: calc(50% + 26px);
}
/* combobox */
.combobox-gender {
  display: flex;
  height: 32px;
  align-items: center;
  padding: 5px 0 6px 10px;
}
.combobox-icon {
  position: relative;
  width: 18px;
  height: 18px;
  border: 1px solid #b0b0b0;
  border-radius: 50%;
  cursor: pointer;
}
.combobox-icon.active {
  border-color: #2ca01c;
}
.combobox-icon.active::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2ca01c;
}
.comboxbox-item {
  display: flex;
}
.comboxbox-item:first-child {
  margin-right: 20px;
}
.combobox-content {
  margin-left: 10px;
}
.combobox-wrapper label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  padding-left: 10px;
  margin-bottom: 4px;
}
/* modal footer */
.modal-footer-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 77px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  background: #fff;
}
.modal-footer {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #babec5;
}
.btn-group {
  display: flex;
}

.gender-label {
  margin-bottom: 8px;
}
</style>
