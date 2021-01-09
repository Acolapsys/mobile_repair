<template>
  <transition :name="animationName">
    <div v-if="isModalVisible" class="overlay">
      <div ref="modal" class="modal px-3">
        <slot />
      </div>
    </div>
  </transition>
</template>
<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import { mapGetters } from 'vuex'
export default {
  name: 'Modal',
  props: {
    animationName: {
      type: String,
      default: 'fade-in-right',
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
  //   watch: {
  //     isModalVisible(value) {
  //       if (value) {
  //         disableBodyScroll(this.$refs.modal)
  //       }
  //     }
  //   },

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
  overflow-y: auto;
}
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }

// $motion-main: cubic-bezier(0.4, 0, 0.2, 1);
// $duration-main: 0.25s;

// $motion-exit: cubic-bezier(0.4, 0, 1, 1);
// $duration-exit: 0.2s;

// .fade-in {
//   &-down-enter-active,
//   &-up-enter-active,
//   &-left-enter-active,
//   &-right-enter-active {
//     transition: all $duration-main $motion-main;
//   }

//   &-down-leave-active,
//   &-up-leave-active,
//   &-left-leave-active,
//   &-right-leave-active {
//     transition: all $duration-exit $motion-exit;
//   }

//   &-down-enter,
//   &-down-leave-to,
//   &-up-enter,
//   &-up-leave-to,
//   &-right-enter,
//   &-right-leave-to,
//   &-left-enter,
//   &-left-leave-to {
//     opacity: 0;
//   }

//   &-down-enter,
//   &-down-leave-to {
//     transform: translateY(-100%);
//   }

//   &-up-enter,
//   &-up-leave-to {
//     transform: translateY(100%);
//   }

//   &-left-enter,
//   &-left-leave-to {
//     transform: translateX(-100%);
//   }

//   &-right-enter,
//   &-right-leave-to {
//     transform: translateX(100%);
//   }
// }
// .transition-element,
// .transition-element-no-overflow {
//   transition: max-height 0.5s ease-in-out 0.4s, opacity 0.8s;
//   max-height: 100000px;
//   opacity: 1;
// }
// .transition-element {
//     overflow: hidden;
// }

// .transition-hide {
//   max-height: 0;
//   opacity: 0.01;
//   transition: max-height 0.5s ease-in-out 0.4s, opacity 0.8s;
// }
</style>
