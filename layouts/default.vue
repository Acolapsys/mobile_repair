<template>
  <v-app>
    <Sidebar />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  middleware({ store, redirect }) {
    if (!store.getters['auth/isAuth']) {
      return redirect('/login')
    }
  },
  components: { Sidebar },
  computed: {
    currentModalName: {
      get() {
        return this.$store.getters['ui/currentModalName']
      },
      set(value) {
        this.$store.dispatch('ui/setCurrentModalName', value)
      },
    },
  },
  methods: {
    close() {
      this.$store.dispatch('ui/setModal', false)
      this.currentModalName = ''
    },
  },
}
</script>
<style lang="scss" scoped>
*::-webkit-scrollbar {
  width: 7px;
}
</style>
