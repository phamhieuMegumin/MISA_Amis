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
        <Dialog />
        <!-- <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card> -->
      </v-dialog>
      <!-- End of dialog add -->
    </div>
    <!-- main content -->
    <div class="main-content">
      <div class="search-content">
        <div class="search-wrapper">
          <InputField
            :placeholder="'Tìm theo mã, tên nhân viên'"
            :searchField="true"
            v-model="filterValue"
          />
        </div>
        <div class="refresh-btn">
          <div class="refresh-icon"></div>
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
              <th class="m-120 th-sticky">
                Chức năng
                <div class="line"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- employee detail -->
            <tr>
              <td class="table-checkbox">
                <CheckboxField />
              </td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td>asfdasfadsfasdf</td>
              <td class="sticky">
                <div class="fix-container">
                  <span>Sửa</span>
                  <div class="choose-btn">
                    <div class="dropdown-icon"></div>
                  </div>
                  <!-- <div v-if="isShownFixSelect" class="list-select">
          <div class="list-select-item">Nhân bản</div>
          <div
            class="list-select-item"
            @click="handleDelete(employee.employeeId, employee.employeeCode)"
          >
            Xóa
          </div>
          <div class="list-select-item">Ngừng sử dụng</div>
        </div> -->
                </div>
                <div class="line"></div>
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
import "../../css/table.css";
export default {
  components: { CheckboxField, Button, InputField, Dialog },
  data() {
    return {
      filterValue: null, // giá trị ô filter
      dialogAddOrUpdate: false, // ẩn hiện dialog
    };
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
  background-position: -1097px -88px;
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
