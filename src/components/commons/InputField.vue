<template>
  <div class="field-input-container">
    <label> {{ label }}<span v-if="required" class="required"> *</span></label>
    <div
      @mouseover="handleValidate"
      @mouseleave="handleLeave"
      class="input-field"
      :class="[searchField ? 'search-field' : '']"
    >
      <input
        :type="type ? type : 'text'"
        :placeholder="placeholder"
        :value="value ? value : inputValue"
        @input="getValue"
        :class="[required && errorNotify.status ? 'errorInput' : '']"
        ref="onAutofocus"
      />
      <div v-if="searchField" class="search-icon"></div>
      <div v-if="required && errorNotify.status" class="validateMessage">
        <p>{{ errorNotify.errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "placeholder",
    "searchField",
    "label",
    "type",
    "value",
    "required",
    "autofocus",
    "errorNotify",
  ],
  mounted() {
    if (this.autofocus) {
      this.$refs.onAutofocus.focus();
    }
  },
  data() {
    return {
      inputValue: "",
      validate: false,
      errorMessage: "",
      showMessage: false,
    };
  },

  methods: {
    getValue(e) {
      this.$emit("input", e.target.value);
    },
    handleValidate() {
      if (this.required && this.validate) {
        this.showMessage = true;
      }
    },
    handleLeave() {
      if (this.required && this.validate) {
        this.showMessage = false;
      }
    },
  },
};
</script>

<style scoped>
.input-field {
  position: relative;
  max-height: 32px;
}
.input-field input {
  padding: 6px 11px;
  border-radius: 2px;
  border: 1px solid #babec5;
  outline: none;
  width: 100%;
  max-height: 32px;
}
.input-field input:focus {
  border-color: #2ca01c;
}
::placeholder {
  font-style: italic;
}
.search-icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -992px -357px;
  cursor: pointer;
}

.validateMessage {
  position: absolute;
  background: #443e3e;
  left: 50%;
  top: 50%;
  width: 150px;
  color: #fff;
  transform: translateX(-50%);
  user-select: none;
  padding: 3px 3px;
  display: none;
}
.validateMessage p {
  font-size: 12px;
  margin-bottom: 0;
}
.input-field:hover .validateMessage {
  display: block;
}
.required {
  color: red;
}
.errorInput {
  border-color: red !important;
}
</style>
