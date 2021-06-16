<template>
  <div class="content-container">
    <div class="content-title">
      <h3 class="title-name">Nhân viên</h3>
      <!-- Dialog add  -->
      <div class="dialog-add-update">
        <v-dialog v-model="dialogAddOrUpdate" width="900px" :persistent="true">
          <template v-slot:activator="{ on, attrs }">
            <div class="btn-add" v-bind="attrs" v-on="on">
              <Button content="Thêm mới nhân viên" />
            </div>
          </template>
          <v-card height="calc(100vh - 34px)">
            <Dialog
              :employeeDetail="employeeDetail"
              @handleCloseDialog="closeDialog"
              @handleShowDialog="showDialog"
              @handleReload="getListEmployee"
              @resetEmployeeDetail="resetEmployeeDetail"
              :modeUpdate="modeUpdate"
              :dialogAddOrUpdate="dialogAddOrUpdate"
              :listDepartment="listDepartment"
              @onNotify="handleNotify"
            />
          </v-card>
        </v-dialog>
      </div>
      <!-- End of dialog add -->

      <!-- Dialog notify -->
      <!--  -->
      <v-dialog v-model="dialogNotify" width="444px">
        <DialogNotify
          @closeDialog="handleCloseDialog"
          type="notify-success"
          :notifyMessage="notifyMessage"
        />
      </v-dialog>
      <!--  -->
      <!-- End of dialog notify -->
    </div>
    <!-- main content -->
    <Loading ref="controlLoading" :controlShowLoading="showLoading" />
    <div class="main-content">
      <div class="search-content">
        <div class="search-wrapper">
          <InputField
            :placeholder="'Tìm theo mã, tên nhân viên'"
            :searchField="true"
            v-model="filterValue"
            v-debounce:300ms="getListEmployee"
          />
        </div>
        <div class="refresh-btn" @click="getListEmployee">
          <div class="refresh-icon"></div>
        </div>
        <div class="export-btn" @click="exportExcel">
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
            <Employee
              v-for="(employee, index) in listEmployee"
              :key="index"
              :employee="employee"
              @handleGetEmployeeID="getEmployeeID"
              @handleReload="getListEmployee"
              :listDeparment="listDepartment"
              @duplicateEmployee="handleDuplicateEmployee"
            />
            <!-- End of employee detail -->
          </tbody>
        </table>
        <div class="pagination-container">
          <div class="total-item">
            Tổng số : <span class="total-value">{{ totalItem }}</span> bản ghi
          </div>
          <div class="pagination-wrapper">
            <div class="dropdown-pagiantion">
              <CustomSelect
                tabindex="0"
                label_key="name"
                value_key="value"
                :options="options"
                v-model="pageSize"
                @changeValue="handleChangeValue"
              />
            </div>
            <div class="paginations">
              <button
                class="pagination-prev-btn"
                :class="[pageInt > 1 ? 'active' : null]"
                @click="handlePrev"
              >
                Trước
              </button>
              <v-pagination
                v-model="pageInt"
                :length="totalPage"
                color="#fff"
              ></v-pagination>
              <button
                class="pagination-next-btn"
                :class="[pageInt < totalPage ? 'active' : null]"
                @click="handleNext"
              >
                Sau
              </button>
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
import Employee from "../Employee/Employee.vue";
import queryString from "query-string";
import CustomSelect from "../commons/CustomSelect.vue";
import DialogNotify from "../commons/DialogNotify.vue";
export default {
  components: {
    CheckboxField,
    Button,
    InputField,
    Dialog,
    Loading,
    Employee,
    CustomSelect,
    DialogNotify,
  },
  data() {
    return {
      filterValue: null, // giá trị ô filter
      dialogAddOrUpdate: false, // ẩn hiện dialog
      isShowTableSelect: false,
      listEmployee: [], // Danh sách nhân viên
      showLoading: false, // ẩn hiện loading
      listDepartment: [], // danh sách phòng ban
      employeeDetail: null, // thông tin nhân viên dùng để sửa
      modeUpdate: false, // thay đổi thêm sang update mode
      pageInt: 1, // trang hiện tại
      pageSize: 20, // số bản ghi trên page
      totalItem: 0, // số lượng bản ghi được trả về
      dialogNotify: false, // hiển thị dialog thông báo cho người dùng
      notifyMessage: "", // message được hiển thị trên dialog
      // Giá trị option truyền vào customSelect
      options: [
        {
          value: 10,
          name: "10 bản ghi trên 1 trang",
        },
        {
          value: 20,
          name: "20 bản ghi trên 1 trang",
        },
        {
          value: 30,
          name: "30 bản ghi trên 1 trang",
        },
        {
          value: 50,
          name: "50 bản ghi trên 1 trang",
        },
        {
          value: 100,
          name: "100 bản ghi trên 1 trang",
        },
      ],
    };
  },
  mounted() {
    this.getListEmployee(); // lấy danh sách nhân viên
    this.getListDepartment(); // lấy danh sách phòng ban
  },
  watch: {
    // bắt thay đổi của pageInt
    pageInt() {
      this.getListEmployee();
    },
    // bắt thay đổi của pageSize
    pageSize() {
      this.getListEmployee();
      this.pageInt = 1; // set lại về trang đầu tiên
    },
  },
  computed: {
    dataFilter() {
      const data = {
        pageInt: this.pageInt,
        pageSize: this.pageSize,
        filterString: this.filterValue,
      };
      return queryString.stringify(data);
    },
    totalPage() {
      return Math.ceil(this.totalItem / this.pageSize);
    },
  },
  methods: {
    // bắt sự kiện đóng dialog của dialog con
    // CreateBy : PQHieu(11/06/2021)
    closeDialog() {
      this.dialogAddOrUpdate = false;
    },

    // bắt sự kiện mở dialog của dialog con
    // CreateBy : PQHieu(11/06/2021)
    showDialog() {
      this.dialogAddOrUpdate = true;
    },

    // đóng dialog notify
    // CreatedBy : PQHieu(13/06/2021)
    handleCloseDialog() {
      this.dialogNotify = false;
    },

    // Bắt dự kiện chỉnh sửa
    // CreateBy : PQHieu(12/06/2021)
    getEmployeeID(id) {
      this.modeUpdate = true; //thay đổi sang updateMode khi thực hiện chỉnh sửa;
      this.getEmployeeInfo(id);
    },

    // Reset EmployeeDetail and mode update
    // CreateBy : PQHieu(12/06/2021)
    resetEmployeeDetail() {
      this.employeeDetail = null;
      this.modeUpdate = false;
    },

    // Chuyển đến page đằng trước
    // CreatedBy : PQHieu(12/6/2021)
    handlePrev() {
      if (this.pageInt > 1) {
        this.pageInt--;
      }
    },

    // Chuyển đến page phía sau
    // CreatedBy : PQHieu(12/6/2021)
    handleNext() {
      if (this.pageInt < this.totalPage) {
        this.pageInt++;
      }
    },

    // lấy giá trị pageSize mới
    // CreatedBy : PQHieu(13/6/2021)
    handleChangeValue(value) {
      this.pageSize = value;
    },

    // Hiển thị thông bán cho người dùng
    // CreatedBy : PQHieu(13/6/2021)
    handleNotify(message) {
      this.notifyMessage = message;
      this.dialogNotify = true;
    },

    // thực hiện nhân bản thông tin nhân viên
    // CreatedBy : PQHieu(15/6/2021)
    handleDuplicateEmployee(employeeId) {
      this.getEmployeeInfo(employeeId);
    },

    // các hàm gọi API
    // Lấy danh sách nhân viên
    // CreateBy : PQHieu(11/06/2021)
    async getListEmployee() {
      try {
        this.showLoading = true; // hiện loading
        const data = await axios.get(
          `https://localhost:44376/api/v1/Employees/Filter?${this.dataFilter}`
        );
        this.listEmployee = data.data.data;
        this.totalItem = data.data.total;
        if (data.status == "204") {
          this.totalItem = 0;
        }
        this.showLoading = false; // ẩn loading
      } catch (error) {
        this.showLoading = false; // ẩn loading khi có lỗi
        console.log(error);
      }
    },

    // Lấy danh sách phòng ban
    // CreateBy : PQHieu(11/06/2021)
    async getListDepartment() {
      try {
        this.showLoading = true; // hiện loading
        const data = await axios.get(
          "https://localhost:44376/api/v1/Departments"
        );
        this.listDepartment = data.data;
        this.showLoading = false; // ẩn loading
      } catch (error) {
        this.showLoading = false; // ẩn loading khi có lỗi
        console.log(error);
      }
    },

    // Lấy thông tin nhân viên theo id
    // CreatedBy : PQHieu(11/06/2021)
    async getEmployeeInfo(employeeId) {
      try {
        this.showLoading = true; // hiện loading
        const data = await axios.get(
          `https://localhost:44376/api/v1/Employees/${employeeId}`
        );
        this.employeeDetail = data.data;
        this.showLoading = false; // ẩn loading
        this.showDialog();
      } catch (error) {
        console.log(error);
      }
    },

    exportExcel() {
      window.open("https://localhost:44376/api/v1/Employees/Export");
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
  align-items: center;
}
.paginations {
  display: flex;
  align-items: center;
  min-width: 350px;
}
.dropdown-pagiantion {
  position: relative;
  margin: 0 16px;
  left: 42px;
  width: 198px;
}
/* Pagionation */
.pagination-prev-btn,
.pagination-next-btn {
  position: relative;
  color: #9e9e9e;
  cursor: default;
  user-select: none;
}
.pagination-prev-btn {
  left: 42px;
}
.pagination-next-btn {
  right: 42px;
}
.pagination-prev-btn.active,
.pagination-next-btn.active {
  cursor: pointer;
  color: #111;
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
