<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Новый заказ</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-template>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-row class="pt-5" align="center">
                  <v-col col="2"> </v-col>
                  <v-col col="4"><h4 color="blue--text">Клиент</h4></v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"
                    ><span>Имя клиента</span><span class="red--text">*</span>
                  </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="clientName"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"
                    ><span>Телефон</span><span class="red--text">*</span>
                  </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="phoneNumber"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="pt-5" align="center">
                  <v-col col="2"> </v-col>
                  <v-col col="4"
                    ><h4 color="blue--text">Изделие и неисправности</h4></v-col
                  >
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Тип устройства</span> </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="kindofgood"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Бренд</span> </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="brandName"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"
                    ><span>Модель</span><span class="red--text">*</span>
                  </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="modelOfGood"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"
                    ><span>Неисправность</span><span class="red--text">*</span>
                  </v-col>
                  <v-col col="4">
                    <v-textarea
                      v-model="malfunction"
                      outlined
                      rows="3"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Внешний вид</span> </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="appearance"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pt-5" align="center">
                  <v-col col="2"> </v-col>
                  <v-col col="4"
                    ><h4 color="blue--text">
                      Дополнительная информация
                    </h4></v-col
                  >
                </v-row>

                <v-row align="center">
                  <v-col col="2"><span>Заметки приемщика</span> </v-col>
                  <v-col col="4">
                    <v-textarea v-model="notes" outlined rows="3"></v-textarea>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Ориентировочная цена</span> </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="estimatedPrice"
                      outlined
                      dense
                      number
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row align="center">
                  <v-col col="2"><span>Предоплата</span> </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="prepayment"
                      outlined
                      dense
                      number
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Менеджер</span> </v-col>
                  <v-col col="4">
                    <v-text-field
                      v-model="managerName"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row align="center" class="mt-5" style="font-size: 0.7rem">
                  <v-btn
                    depressed
                    color="primary"
                    class="mr-5"
                    small
                    @click="createOrder"
                  >
                    Создать
                  </v-btn>
                  <v-btn depressed small class="mr-2" @click="close">
                    Закрыть
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-template>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
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
  methods: {
    async createOrder() {
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
      this.$emit('close')
      this.dialog = false
    },
  },
}
</script>
<style scoped>
.v-btn {
  font-size: 0.6rem;
}
</style>
