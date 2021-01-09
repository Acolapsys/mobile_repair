<template>
  <v-app>
    <v-navigation-drawer fixed app>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-img src="avatar1.jpg"></v-img>
          </v-avatar>
          <p class="mt-1 subheading text-center">{{ name }}</p>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-exit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <NewOrder v-if="String(currentModalName) === 'newOrder'" @close="close" />
  </v-app>
</template>

<script>
import NewOrder from '@/components/Order/NewOrder'
import { mapGetters } from 'vuex'
export default {
  middleware({ store, redirect }) {
    if (!store.getters['auth/isAuth']) {
      return redirect('/login')
    }
  },
  components: { NewOrder },
  data() {
    return {
      menuItems: [
        {
          icon: 'mdi-apps',
          title: 'Заказы',
          to: '/orders',
        },
        {
          icon: 'mdi-cart-outline',
          title: 'Магазин',
          to: '/shop',
        },
        {
          icon: 'mdi-cash',
          title: 'Касса',
          to: '/payments',
        },
        {
          icon: 'mdi-warehouse',
          title: 'Склад',
          to: '/warehouse',
        },
        {
          icon: 'mdi-account',
          title: 'Клиенты',
          to: '/clients',
        },
        {
          icon: 'mdi-chart-line',
          title: 'Отчеты',
          to: '/reports',
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Настройки',
          to: '/settings',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuth', 'userName']),
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
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
    close() {
      this.$store.dispatch('ui/setModal', false)
      this.currentModalName = ''
    },
  },
}
</script>
