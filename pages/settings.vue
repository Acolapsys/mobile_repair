<template>
  <v-container>
    <v-row>
      <span class="text-h4">Настройки</span>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pt-5">
      <v-sheet elevation="4" width="100%" class="mx-6 pa-6" height="80vh">
        <h4 class="text-h6 font-weight-medium">Пользователь</h4>
        <v-divider></v-divider>
        <div class="d-flex align-center mt-10">
          <h5 class="text-body-1 mr-4">Имя:</h5>
          <v-text-field
            v-model="name"
            outlined
            dense
            hide-details
            style="max-width: 300px"
            class="mr-4"
          >
          </v-text-field>
          <v-btn class="primary font-weight-normal" @click.prevent="updateName"
            >Сохранить</v-btn
          >
        </div>
        <h4 class="text-h6 font-weight-medium">Компания</h4>
        <v-divider></v-divider>
        <div v-if="!isCompanyExist" class="d-flex align-center mt-10">
          <h5 class="text-body-1 mr-4">Название:</h5>
          <v-text-field
            v-model="companyName"
            outlined
            dense
            hide-details
            style="max-width: 300px"
            class="mr-4"
          >
          </v-text-field>
          <v-btn
            class="primary font-weight-normal"
            @click.prevent="createCompany"
            >Сохранить</v-btn
          >
        </div>
        <div v-else class="d-flex align-center mt-10">
          <h5 class="text-body-1 mr-4">Название:</h5>
          <span>Здесь будет название фирмы</span>
        </div>
        <h4 class="text-h6 font-weight-medium">Статусы заказов</h4>
        <v-divider></v-divider>
        <div class="d-flex align-center mt-10">
          <h5 class="text-body-1 mr-4">Новый статус:</h5>
          <v-text-field
            v-model="status"
            outlined
            dense
            hide-details
            style="max-width: 300px"
            class="mr-4"
          >
          </v-text-field>
          <v-btn class="primary font-weight-normal" @click.prevent="addStatus"
            >Добавить</v-btn
          >
        </div>
        <div class="d-flex align-center">
          <span class="mr-5">Статусы: </span>
          <v-select :items="statuses" style="max-width: 200px"></v-select>
        </div>
      </v-sheet>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Settings',
  data: () => ({
    name: null,
    companyName: null,
    status: null,
  }),
  methods: {
    async updateName() {
      await this.$store.dispatch('auth/updateName', this.name)
    },
    async createCompany() {
      await this.$store.dispatch('company/createCompany', this.companyName)
    },
    async addStatus() {
      await this.$store.dispatch('options/addStatus', this.status)
      this.status = null
    },
  },
  computed: {
    ...mapGetters('company', ['isCompanyExist']),
    ...mapGetters('options', ['statuses']),
  },
}
</script>
