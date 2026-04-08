<template>
  <v-app>
    <header>
      <div class="header">
        <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </div>
    </header>
    <v-main>
      <div class="main">
        <router-view />
      </div>
    </v-main>
    <v-bottom-navigation grow bg-color="#585123" color="#faedcd">
      <v-btn value="lists" to="/">
        <v-icon icon="mdi-home" />
        <span>Book Lists</span>
      </v-btn>
      <v-btn value="register" to="/book/detail">
        <v-icon icon="mdi-book-open-variant" />
        <span>Register Book</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
  const items = [
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' },
  ]
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: #585123;
  color: #faedcd;
  min-height: 60px
}

/* .main {
  background-color: #f6f4d2;
} */
</style>