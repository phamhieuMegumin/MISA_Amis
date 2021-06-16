<template>
  <div v-if="isShowLoading" class="loading-container">
    <div class="loading">
      <img src="../../assets/loading.svg" alt="loading" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["controlShowLoading"],
  data() {
    return {
      isShowLoading: false,
    };
  },
  methods: {
    showLoading() {
      this.isShowLoading = true;
    },
    hideLoading() {
      this.isShowLoading = false;
    },
  },
  watch: {
    controlShowLoading() {
      if (this.controlShowLoading) {
        this.showLoading();
      } else this.hideLoading();
    },
  },
};
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
}
.loading {
  width: 48px;
  height: 48px;
  animation: round 1s linear infinite;
}
.loading img {
  width: 100%;
}
@keyframes round {
  100% {
    transform: rotate(360deg);
  }
}
</style>
