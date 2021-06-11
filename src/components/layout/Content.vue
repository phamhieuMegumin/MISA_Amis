<template>
  <div class="content-container">
    <div class="content-title">
      <h3 class="title-name">Nhân viên</h3>
      <!-- Dialog add  -->
      <v-dialog v-model="dialogAddOrUpdate" width="900px">
        <template v-slot:activator="{ on, attrs }">
          <div class="btn-add" v-bind="attrs" v-on="on">
            <Button content="Thêm mới nhân viên" />
          </div>
        </template>
        <Dialog @handleCloseDialog="closeDialog" />
      </v-dialog>
      <!-- End of dialog add -->
    </div>
    <!-- main content -->
    <Loading ref="controlLoading" />
    <div class="main-content">
      <div class="search-content">
        <div class="search-wrapper">
          <InputField
            :placeholder="'Tìm theo mã, tên nhân viên'"
            :searchField="true"
            v-model="filterValue"
          />
        </div>
        <div class="refresh-btn" @click="getListEmployee">
          <div class="refresh-icon"></div>
        </div>
        <div class="export-btn">
          <div class="excel-icon"></div>
        </div>
      </div>
      <!-- Table -->
      <div class="table-content">
        <table class="table">
          <thead>
            <tr>
              <th class="table-head-checkbox"><CheckboxField /></th>
              <th class="m-150">
                Mã nhân viên
                <div class="line"></div>
              </th>
              <th class="m-250">
                Tên nhân viên
                <div class="line"></div>
              </th>
              <th class="m-120">
                Giới tính
                <div class="line"></div>
              </th>
              <th class="m-150">
                Ngày sinh
                <div class="line"></div>
              </th>
              <th class="m-250">
                Số CMND
                <div class="line"></div>
              </th>
              <th class="m-250">
                Chức danh
                <div class="line"></div>
              </th>
              <th class="m-250">
                Tên đơn vị
                <div class="line"></div>
              </th>
              <th class="m-150">
                Số tài khoản
                <div class="line"></div>
              </th>
              <th class="m-250">
                Tên ngân hàng
                <div class="line"></div>
              </th>
              <th class="m-250">
                Chi nhánh tài khoản ngân hàng
                <div class="line"></div>
              </th>
              <th class="th-sticky m-120">
                <div class="border-left"></div>
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- employee detail -->
            <tr v-for="(employee, index) in listEmployee" :key="index">
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
                  <span>Sửa</span>
                  <div class="choose-btn">
                    <!-- dropdown -->
                    <div
                      class="dropdown-icon"
                      tabindex="0"
                      @click="isShowTableSelect = !isShowTableSelect"
                      @focusout="isShowTableSelect = false"
                    >
                      <div v-if="isShowTableSelect" class="list-select">
                        <div class="list-select-item">Nhân bản</div>
                        <div class="list-select-item">
                          Xóa
                        </div>
                        <div class="list-select-item">Ngừng sử dụng</div>
                      </div>
                    </div>

                    <!-- End of dropdown -->
                  </div>
                </div>
                <!-- <div class="line"></div> -->
              </td>
            </tr>
            <!-- End of employee detail -->
          </tbody>
        </table>
        <div class="pagination-container">
          <div class="total-item">
            Tổng số : <span class="total-value"></span> bản ghi
          </div>
          <div class="pagination-wrapper">
            <div class="dropdown-pagiantion">
              <!-- <DropdownField :listOption="listOption" nameField="ItemPerPage" /> -->
            </div>
            <div class="paginations">
              <div>
                Trước
              </div>
              <div class="list-btn-pagination">
                <div>
                  1
                </div>
              </div>
              <div>
                Sau
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end table-->
    </div>
    <!-- end main content -->
  </div>
</template>

<script>
import CheckboxField from "../commons/CheckboxField.vue";
import Button from "../commons/Button.vue";
import InputField from "../commons/InputField.vue";
import Dialog from "../commons/Dialog.vue";
import Loading from "../commons/Loading.vue";
import axios from "axios";
import "../../css/table.css";
export default {
  components: { CheckboxField, Button, InputField, Dialog, Loading },
  data() {
    return {
      filterValue: null, // giá trị ô filter
      dialogAddOrUpdate: false, // ẩn hiện dialog
      isShowTableSelect: false,
      listEmployee: [], // Danh sách nhân viên
    };
  },
  created() {
    this.getListEmployee();
  },
  computed: {},

  methods: {
    // bắt sự kiện đóng mở dialog
    // CreateBy : PQHieu(11/06/2021)
    closeDialog() {
      this.dialogAddOrUpdate = false;
    },

    // Lấy danh sách nhân viên
    // CreateBy : PQHieu(11/06/2021)
    async getListEmployee() {
      try {
        const data = await axios.get(
          "https://localhost:44376/api/v1/Employees"
        );
        this.listEmployee = data.data;
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
.content-container {
  background: #f4f5f6;
  padding: 0 20px;
}
.content-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 94px;
}
.title-name {
  display: block;
  font-size: 24px;
  font-family: "notosans-bold";
  color: #111;
}
.main-content {
  background: #fff;
  padding: 0 20px;
}
.table-content {
  overflow-x: auto;
  height: calc(100vh - 94px - 48px - 64px);
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #fff;
}
::-webkit-scrollbar-thumb {
  background: #d4d7dc;
}
::-webkit-scrollbar-thumb:hover {
  background: #616164;
}
/* search content */
.search-content {
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.search-wrapper {
  width: 240px;
}
.refresh-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -423px -201px;
  margin-left: 18px;
}

.refresh-icon:hover {
  cursor: pointer;
  background-position: -1097px -88px;
}
.excel-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-left: 18px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -704px -200px;
}
.excel-icon:hover {
  background-position: -704px -256px;
}
/* Footer-pagination */
.pagination-container {
  position: sticky;
  bottom: 0;
  left: 0;
  background: #fff;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #c7c7c7;
  z-index: 102;
}
.pagination-wrapper {
  display: flex;
}
.paginations {
  display: flex;
  align-items: center;
}
.dropdown-pagiantion {
  margin: 0 16px;
  width: 200px;
}
.pag-btn {
  margin-right: 13px;
  cursor: pointer;
}
.btn-pagination {
  padding: 0 6.5px;
}
.btn-pagination.active {
  border: 1px solid #e0e0e0;
  font-weight: 700;
}
.next-btn,
.prev-btn {
  color: #9e9e9e;
  cursor: default;
  user-select: none;
}
.total-value {
  font-weight: 700;
}
.list-btn-pagination {
  display: flex;
}
.pag-btn.active {
  color: #111;
  cursor: pointer;
}
</style>
