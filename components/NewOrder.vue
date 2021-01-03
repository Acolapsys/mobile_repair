<template>
  <v-card width="100%" class="pa-3">
    <v-card-title>Новый заказ</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-form @submit.prevent="createOrder">
            <v-row class="pt-5" align="center">
              <v-col col="2" class="col-left"> </v-col>
              <v-col col="4"><h4 color="blue--text">Клиент</h4></v-col>
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"
                ><span>Имя клиента</span><span class="red--text">*</span>
              </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="clientName"
                  outlined
                  dense
                  required
                  :error-messages="nameErrors"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"
                ><span>Телефон</span><span class="red--text">*</span>
              </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="phoneNumber"
                  outlined
                  dense
                  required
                  :error-messages="phoneErrors"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="pt-5" align="center">
              <v-col col="2" class="col-left"> </v-col>
              <v-col col="4"
                ><h4 color="blue--text">Изделие и неисправности</h4></v-col
              >
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"
                ><span>Тип устройства</span>
              </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="kindofgood"
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"><span>Бренд</span> </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="brandName"
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"
                ><span>Модель</span><span class="red--text">*</span>
              </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="modelOfGood"
                  outlined
                  dense
                  required
                  :error-messages="modelErrors"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"
                ><span>Неисправность</span><span class="red--text">*</span>
              </v-col>
              <v-col col="4">
                <v-textarea
                  v-model="malfunction"
                  outlined
                  rows="3"
                  required
                  :error-messages="malfunctionErrors"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"><span>Внешний вид</span> </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="appearance"
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="pt-5" align="center">
              <v-col col="2" class="col-left"> </v-col>
              <v-col col="4"
                ><h4 color="blue--text">Дополнительная информация</h4></v-col
              >
            </v-row>

            <v-row align="center">
              <v-col col="2" class="col-left"
                ><span>Заметки приемщика</span>
              </v-col>
              <v-col col="4">
                <v-textarea v-model="notes" outlined rows="3"></v-textarea>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"
                ><span>Ориентировочная цена</span>
              </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="estimatedPrice"
                  outlined
                  dense
                  number
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center">
              <v-col col="2" class="col-left"><span>Предоплата</span> </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="prepayment"
                  outlined
                  dense
                  number
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col col="2" class="col-left"><span>Менеджер</span> </v-col>
              <v-col col="4">
                <v-text-field
                  v-model="managerName"
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" class="ma-5" style="font-size: 0.7rem">
              <v-btn depressed color="primary" class="mr-5" small type="submit">
                Создать
              </v-btn>
              <v-btn depressed small class="mr-2" @click="close">
                Закрыть
              </v-btn>
              <v-spacer></v-spacer>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  numeric,
} from 'vuelidate/lib/validators'
export default {
  name: 'NewOrder',
  validations: {
    clientName: { required },
    phoneNumber: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
      numeric,
    },
    modelOfGood: { required },
    malfunction: { required },
  },
  data() {
    return {
      clientName: '',
      phoneNumber: null,
      kindofgood: '',
      brandName: '',
      modelOfGood: '',
      malfunction: '',
      appearance: '',
      notes: '',
      estimatedPrice: 0,
      prepayment: 0,
      managerName: '',
    }
  },
  computed: {
    nameErrors() {
      if (this.$v.clientName.$dirty && !this.$v.clientName.required) {
        return 'Введите имя'
      }
      return ''
    },
    phoneErrors() {
      if (this.$v.phoneNumber.$dirty && !this.$v.phoneNumber.required) {
        return 'Введите телефон'
      }
      if (
        (this.$v.phoneNumber.$dirty && !this.$v.phoneNumber.minLength) ||
        (this.$v.phoneNumber.$dirty && !this.$v.phoneNumber.maxLength) ||
        (this.$v.phoneNumber.$dirty && !this.$v.phoneNumber.numeric)
      ) {
        return 'Некорректный номер'
      }
      return ''
    },
    modelErrors() {
      if (this.$v.modelOfGood.$dirty && !this.$v.modelOfGood.required) {
        return 'Введите модель'
      }
      return ''
    },
    malfunctionErrors() {
      if (this.$v.malfunction.$dirty && !this.$v.malfunction.required) {
        return 'Опишите неисправность'
      }
      return ''
    },
  },
  methods: {
    async createOrder() {
      if (this.$v.$invalid) {
        this.$v.$touch()

        return
      }
      const orderData = {
        clientName: this.clientName,
        phoneNumber: this.phoneNumber,
        kindofgood: this.kindofgood,
        brandName: this.brandName,
        modelOfGood: this.modelOfGood,
        malfunction: this.malfunction,
        appearance: this.appearance,
        notes: this.notes,
        estimatedPrice: this.estimatedPrice,
        prepayment: this.prepayment,
        managerName: this.managerName,
      }
      await this.$store.dispatch('orders/createOrder', orderData)
      this.close()
    },
    close() {
      this.$store.commit('orders/setOpenedOrder', false)
    },
  },
}
</script>
<style scoped>
.v-btn {
  font-size: 0.6rem;
}
.col-left {
  text-align: right;
}
</style>
