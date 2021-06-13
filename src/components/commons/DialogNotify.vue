<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="logo-message"></div>
      <div class="modal-message">
        <p v-if="type === 'confirm'">
          Bạn có thực sự muốn xóa Nhân viên
          <span> {{ employeeCode }}</span>
          không?
        </p>
        <p v-if="type === 'notify'">
          Mã nhân viên {{ employeeCodeNotify }} đã tồn tại trong hệ thống, vui
          lòng kiểm tra lại
        </p>
      </div>
    </div>
    <div class="line"></div>
    <div class="modal-bottom" :class="type === 'notify' ? 'notify-bottom' : ''">
      <div v-if="type == 'confirm'" @click="$emit('closeDialog')">
        <Button :content="'Không'" :btnWhite="true" />
      </div>
      <div v-if="type === 'confirm'" @click="$emit('onDelete')">
        <Button :content="'Có'" />
      </div>
      <div class="notify-btn" v-if="type === 'notify'">
        <Button :content="'Đồng ý'" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: { Button },
  props: ["employeeCode"],
  data() {
    return {
      confirmEmployeeCode: "111",
      type: "confirm",
      employeeCodeNotify: "111",
    };
  },
};
</script>

<style scoped>
.modal-container {
  background-color: #fff;
  padding: 32px;
}
.modal-content {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
.logo-message {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -592px -456px;
}
.modal-message {
  overflow: auto;
  max-height: 400px;
  padding-left: 16px;
  position: relative;
  top: 10px;
}
.line {
  height: 1px;
  background: #b8bcc3;
  margin-bottom: 20px;
}
.modal-bottom {
  display: flex;
  justify-content: space-between;
}
.modal-bottom.notify-bottom {
  justify-content: flex-end;
}
</style>
