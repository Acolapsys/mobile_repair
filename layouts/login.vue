<template>
  <v-app>
    <v-container>
      <v-row style="height: 100vh; max-height: 100%">
        <v-col cols="6">
          <div class="logo">
            <span class="display-1">Mobile</span>
            <span class="blue--text display-1">REPAIR</span>
          </div>

          <div
            class="d-flex justify-center text-h2 px-10 pt-15"
            style="height: 100%; max-height: 100%"
          >
            Управляйте вашими заказами легко
          </div>
        </v-col>
        <v-col cols="6">
          <nuxt />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped></style>
