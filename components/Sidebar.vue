<template>
  <v-navigation-drawer fixed app>
    <v-layout column align-center>
      <v-flex class="mt-5">
        <v-avatar size="100">
          <v-img src="avatar1.jpg" />
        </v-avatar>
        <p class="mt-1 subheading text-center">
          {{ userName }}
        </p>
      </v-flex>
    </v-layout>

    <v-divider />
    <v-list nav>
      <v-list-item v-for="(item, i) in menuItems" :key="i" :to="item.to" exact>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-spacer />
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
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
  }),
  computed: {
    ...mapGetters('auth', ['userName']),
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  },
}
</script>
