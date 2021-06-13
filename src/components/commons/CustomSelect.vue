<template>
  <div
    class="combobox-container"
    :class="isShow ? 'active' : null"
    @focusout="closeOptions"
    @keyup.up="handleKeyUp"
    @keyup.down="handleKeyDown"
    @keyup.enter="handleEnter"
  >
    <div class="combobox-options" v-if="isShow">
      <div
        v-for="(item, index) in options"
        :key="index"
        @click="handleSelectValue(item, index)"
        class="option"
        :class="[
          item[value_key] == value ? 'active' : null,
          index == currentIndex ? 'selected' : null,
        ]"
      >
        {{ item[label_key] }}
      </div>
    </div>
    <div class="combobox-field" @click="isShow = !isShow">
      {{ label_value }}
      <div class="select-container">
        <div class="dropdown-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["options", "value_key", "label_key", "value"],
  data() {
    return {
      isShow: false,
      label_value: null,
      currentIndex: -1,
    };
  },
  methods: {
    // đóng hiển thị option
    // CreatedBy : PQHieu(10/6/2021)
    closeOptions() {
      this.isShow = false;
    },

    // Bắt sự kiện chọn giá trị
    // CreatedBy : PQHieu(10/6/2021)
    handleSelectValue(item, index) {
      this.setValue(item);
      this.currentIndex = index;
    },

    // Cập nhật giá trị đã chọn
    // CreatedBy : PQHieu(10/6/2021)
    setValue(item) {
      this.closeOptions();
      this.label_value = item[this.label_key];
      this.$emit("changeValue", item[this.value_key]);
    },

    // Bắt sự kiện nhấn phím lên
    // CreatedBy : PQHieu(10/6/2021)
    handleKeyUp() {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.options.length - 1;
      }
      this.isShow = true;
    },

    // Bắt sự kiện nhấn phím xuống
    // CreatedBy : PQHieu(10/6/2021)
    handleKeyDown() {
      this.currentIndex++;
      if (this.currentIndex > this.options.length - 1) {
        this.currentIndex = 0;
      }
      this.isShow = true;
    },

    // Bắt sự kiện nhấn phím enter
    // CreatedBy : PQHieu(10/6/2021)
    handleEnter() {
      this.isShow = false;
      this.setValue(this.options[this.currentIndex]);
    },

    // Set giá trị khi khởi tạo
    // CreatedBy : PQHieu(10/6/2021)
    setDefaultValue() {
      this.options.forEach((option) => {
        if (option[this.value_key] == this.value) {
          this.label_value = option[this.label_key];
        }
      });
    },
  },
  created() {
    this.setDefaultValue();
  },
};
</script>

<style scoped>
.combobox-container {
  width: 198px;
  position: relative;
}
.combobox-container.active .combobox-field {
  border-color: #2ca01c;
}
.combobox-field {
  width: 198px;
  height: 32px;
  border: 1px solid #babec5;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0px 6px 12px;
}

.combobox-options {
  position: absolute;
  width: 100%;
  bottom: calc(100% + 3px);
  border: 1px solid #babec5;
  border-radius: 3px;
  overflow: hidden;
  background: #fff;
}
.option {
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  padding: 0 14px 0 10px;
}

.option.selected {
  background: #ebedf0;
}
.option.active {
  background: #2ca01c;
  color: #fff;
}
.option.selected:not(.active) {
  background: #ebedf0;
}
.option:hover:not(.active) {
  background: #ebedf0;
}
.select-container {
  width: 31px;
  height: 30px;
  min-height: 30px;
  min-width: 31px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.dropdown-icon {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -552px -351px;
}
.select-container:hover {
  background: #e0e0e0;
}
</style>
