<template>
  <div v-if="isModalVisible" class="overlay">
    <transition name="slide-fade" mode="">
      <div ref="modal" class="modal px-3">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import { mapGetters } from 'vuex'
export default {
  name: 'Modal',
  props: {
    animationName: {
      type: String,
      default: 'slide-fade',
    },
    modalName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['isAuth', 'userName']),
    ...mapGetters('ui', ['isModalVisible']),
    currentModalName: {
      get() {
        return this.$store.getters['ui/currentModalName']
      },
      set(value) {
        this.$store.dispatch('ui/setCurrentModalName', value)
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      disableBodyScroll(this.$refs.modal)
    })
  },
  beforeDestroy() {
    enableBodyScroll()
  },
}
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.46);
  z-index: 7;
}
.modal {
  position: absolute;
  right: 0;
  left: auto;
  top: 0;
  background-color: #fff;
  width: 1000px;
  height: 100vh;
  overflow-y: auto;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
