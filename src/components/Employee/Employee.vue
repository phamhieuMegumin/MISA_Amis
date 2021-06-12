<template>
  <!-- employee detail -->
  <tr @dblclick="getEmployeeInfoId(employee.employeeId)">
    <td class="table-checkbox">
      <CheckboxField />
    </td>
    <td>{{ employee.employeeCode }}</td>
    <td>{{ employee.fullName }}</td>
    <td>{{ employee.genderName }}</td>
    <td>{{ formatDateOfBirth(employee) }}</td>
    <td>{{ employee.identityNumber }}</td>
    <td>{{ employee.positionName }}</td>
    <td>asdfsdf</td>
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
import axios from "axios";
export default {
  props: ["employee"],
  components: {
    CheckboxField,
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
    };
  },
  watch: {
    selectedValue() {
      if (this.selectedValue == 2) {
        this.deleteEmployee(this.employee.employeeId);
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
        this.$emit("handleReload"); // reload sau khi xóa
      } catch (error) {
        console.log(error);
      }
    },

    // format dữ liệu ngày tháng
    // CreateBy : PQHieu(11/06/2021)
    formatDateOfBirth(employee) {
      if (employee.dateOfBirth) {
        const newDate = new Date(employee.dateOfBirth);
        let strDay = newDate.getDate();
        let strMonth = newDate.getMonth() + 1;
        let strYear = newDate.getFullYear();
        if (strDay < 10) strDay = `0${strDay}`;
        if (strMonth < 10) strMonth = `0${strMonth}`;
        return `${strDay}/${strMonth}/${strYear}`;
      }
      return null;
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
