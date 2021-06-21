<template>
  <!-- employee detail -->
  <tr @dblclick="getEmployeeInfoId(employee.employeeId)">
    <td class="table-checkbox">
      <CheckboxField />
    </td>
    <td>{{ employee.employeeCode }}</td>
    <td>{{ employee.fullName }}</td>
    <td>{{ employee.genderName }}</td>
    <td class="date-col">{{ formatDateOfBirth }}</td>
    <td>{{ employee.identityNumber }}</td>
    <td>{{ employee.positionName }}</td>
    <td>{{ formatDeparmentName }}</td>
    <td>{{ employee.bankAccount }}</td>
    <td>{{ employee.bankName }}</td>
    <td class="no--right-border">{{ employee.bankBranch }}</td>
    <td
      class="sticky no--right-border"
      :style="
        showDropTop
          ? { 'z-index': 100 - index + 5 }
          : { 'z-index': 100 - index }
      "
    >
      <div class="border-left border-left--dotted"></div>
      <div class="fix-container">
        <span @click="getEmployeeInfoId(employee.employeeId)">Sửa</span>

        <div class="choose-btn">
          <!-- dropdown -->
          <div class="drop-container" tabindex="0" @focusout="closeDrop">
            <div
              class="drop-icon-wrap"
              @click="handelShowDrop"
              :class="showDrop ? 'active' : null"
            >
              <div class="drop-icon"></div>
            </div>
            <div
              class="drop-option"
              :class="[
                showDropTop ? 'drop-top' : null,
                showDrop ? 'active' : null,
              ]"
            >
              <div
                class="option"
                @click="$emit('duplicateEmployee', employee.employeeId)"
              >
                Nhân bản
              </div>
              <div class="option" @click="dialogConfirm = true">Xóa</div>
              <div class="option">Ngừng sử dụng</div>
            </div>
          </div>
          <!-- Dialog confirm -->
          <v-dialog :persistent="true" v-model="dialogConfirm" width="444px">
            <DialogNotify
              :employeeCode="employee.employeeCode"
              @closeDialog="handleCloseDialog"
              @onDelete="deleteEmployee(employee.employeeId)"
              type="confirm"
            />
          </v-dialog>
          <!-- End of dialog test -->
          <!-- End of dropdown -->
        </div>
      </div>
      <!-- <div class="line"></div> -->
    </td>
  </tr>
  <!-- End of employee detail -->
</template>

<script>
//#region Import dữ liệu
import CheckboxField from "../commons/CheckboxField.vue";
import DialogNotify from "../commons/DialogNotify.vue";
import axios from "axios";
//#endregion

export default {
  //#region Props
  props: ["employee", "listDeparment", "index"],
  //#endregion

  //#region Components
  components: {
    CheckboxField,
    DialogNotify,
  },
  //#endregion

  //#region Data
  data() {
    return {
      dialogConfirm: false,
      showDrop: false, // đóng mở dropdown
      showDropTop: false, // điều chỉnh hướng mở option lên trên
    };
  },
  //#endregion

  //#region Computed
  computed: {
    /**
     * format dữ liệu ngày tháng
     * CreateBy : PQHieu(11/06/2021)
     */
    formatDateOfBirth() {
      if (this.employee.dateOfBirth) {
        const newDate = new Date(this.employee.dateOfBirth);
        let strDay = newDate.getDate();
        let strMonth = newDate.getMonth() + 1;
        let strYear = newDate.getFullYear();
        if (strDay < 10) strDay = `0${strDay}`;
        if (strMonth < 10) strMonth = `0${strMonth}`;
        return `${strDay}/${strMonth}/${strYear}`;
      }
      return null;
    },

    /**
     * format dữ liệu tên phòng ban theo id nhận được
     * CreateBy : PQHieu(11/06/2021)
     */
    formatDeparmentName() {
      for (let i = 0; i < this.listDeparment.length; i++) {
        if (this.listDeparment[i].deparmentId === this.employee.deparmentId)
          return this.listDeparment[i].deparmentName;
      }
      return null;
    },
  },
  //#endregion

  //#region Methods
  methods: {
    /**
     * Lấy id nhân viên
     * @param="id" : id nhân viên cần lấy thông tin
     * CreateBy : PQHieu(11/06/2021)
     */
    getEmployeeInfoId(id) {
      this.$emit("handleGetEmployeeID", id);
    },

    /**
     * Xóa nhân viên theo id
     * @param="employeeId" : mã nhân viên cần xóa
     * CreatedBy : PQHieu(11/06/2021)
     */
    async deleteEmployee(employeeId) {
      try {
        this.showLoading = true; // hiện loading
        await axios({
          method: "delete",
          url: `https://localhost:44376/api/v1/Employees/${this.employee.employeeId}`,
          data: employeeId,
        });
        this.showLoading = false; // ẩn loading
        this.dialogConfirm = false; // đóng dialog confirm
        this.$emit("handleReload"); // reload sau khi xóa
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * đóng dialog confirm
     * CreatedBy : PQHieu(13/06/2021)
     */
    handleCloseDialog() {
      this.dialogConfirm = false;
    },

    /**
     * dóng mở dropdown
     * CreatedBy : PQHieu(13/06/2021)
     */
    handelShowDrop(e) {
      if (e.screenY > 550) {
        this.showDropTop = true;
      }
      this.showDrop = !this.showDrop;
      if (!this.showDrop) {
        this.showDropTop = false;
      }
    },

    /**
     * đóng option và reset các thuộc tính
     * CreatedBy : PQHieu(13/06/2021)
     */
    closeDrop() {
      this.showDrop = false;
      this.showDropTop = false;
    },
  },
  //#endregion
};
</script>

<style scoped>
.fix-container {
  position: relative;
  z-index: 5;
}
.fix-container span {
  cursor: pointer;
}
.drop-container {
  position: relative;
}
.drop-icon-wrap {
  padding: 0 5px;
  border: 1px solid transparent;
  width: 26px;
}
.drop-icon-wrap.active {
  border-color: #0075c0;
}
.drop-option {
  position: absolute;
  top: calc(100% + 10px);
  right: -10px;
  visibility: hidden;
  opacity: 0;
}

.drop-option.active {
  visibility: visible;
  opacity: 1;
  top: calc(100% + 7px);
  transition: 0.2s linear;
}
.drop-option.drop-top {
  position: absolute;
  bottom: calc(100% + 10px);
  right: -10px;
  top: auto;
}
.drop-option.drop-top.active {
  bottom: calc(100% + 7px);
}
.drop-icon {
  width: 16px;
  height: 14px;
  max-height: 16px;
  max-width: 16px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -897px -360px;
}
.drop-option {
  border: 1px solid #babec5;
  width: 120.6px;
  border-radius: 3px;
  background: #fff;
  padding: 2px 1px;
}
.option {
  padding: 5px 10px;
  text-align: left;
}
.option:hover {
  background: #e8e9ec;
  color: #08bf1e;
}
</style>
