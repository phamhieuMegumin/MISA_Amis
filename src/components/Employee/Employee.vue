<template>
  <!-- employee detail -->
  <tr @dblclick="getEmployeeInfoId(employee.employeeId)">
    <td class="table-checkbox">
      <CheckboxField />
    </td>
    <td>{{ employee.employeeCode }}</td>
    <td>{{ employee.fullName }}</td>
    <td>{{ employee.genderName }}</td>
    <td>{{ formatDateOfBirth }}</td>
    <td>{{ employee.identityNumber }}</td>
    <td>{{ employee.positionName }}</td>
    <td>{{ formatDeparmentName }}</td>
    <td>{{ employee.bankAccount }}</td>
    <td>{{ employee.bankName }}</td>
    <td class="no--right-border">{{ employee.bankBranch }}</td>
    <td class="sticky no--right-border">
      <div class="border-left border-left--dotted"></div>
      <div class="fix-container">
        <span @click="getEmployeeInfoId(employee.employeeId)">Sửa</span>

        <div class="choose-btn">
          <!-- dropdown -->
          <v-select
            :items="selectOptions"
            item-value="id"
            v-model="selectedValue"
            item-text="name"
            label="Solo field"
            dense
            solo
          ></v-select>
          <!-- Dialog confirm -->
          <v-dialog v-model="dialogConfirm" width="444px">
            <DialogNotify
              :employeeCode="employee.employeeCode"
              @closeDialog="handleCloseDialog"
              @onDelete="deleteEmployee(employee.employeeId)"
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
import CheckboxField from "../commons/CheckboxField.vue";
import DialogNotify from "../commons/DialogNotify.vue";
import axios from "axios";
export default {
  props: ["employee", "listDeparment"],
  components: {
    CheckboxField,
    DialogNotify,
  },
  data() {
    return {
      // Các chức năng
      selectOptions: [
        {
          id: 1,
          name: "Nhân bản",
        },
        {
          id: 2,
          name: "Xóa",
        },
        {
          id: 3,
          name: "Ngừng sử dụng",
        },
      ],
      selectedValue: null, // lựa chọn các chức năng
      dialogConfirm: false,
    };
  },
  computed: {
    // format dữ liệu ngày tháng
    // CreateBy : PQHieu(11/06/2021)
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

    // format dữ liệu tên phòng ban theo id nhận được
    // CreateBy : PQHieu(11/06/2021)
    formatDeparmentName() {
      for (let i = 0; i < this.listDeparment.length; i++) {
        if (this.listDeparment[i].deparmentId === this.employee.deparmentId)
          return this.listDeparment[i].deparmentName;
      }
      return null;
    },
  },
  watch: {
    selectedValue() {
      if (this.selectedValue == 2) {
        this.dialogConfirm = true;
        // this.deleteEmployee(this.employee.employeeId);
      }
      setTimeout(() => {
        this.selectedValue = 0;
      }, 200);
    },
  },
  methods: {
    // Lấy id nhân viên
    // CreateBy : PQHieu(11/06/2021)
    getEmployeeInfoId(id) {
      this.$emit("handleGetEmployeeID", id);
    },

    // Xóa nhân viên theo id
    // CreatedBy : PQHieu(11/06/2021)
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

    // đóng dialog confirm
    // CreatedBy : PQHieu(13/06/2021)
    handleCloseDialog() {
      this.dialogConfirm = false;
    },
  },
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
</style>
