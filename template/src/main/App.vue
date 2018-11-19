<template>
  <div id="app">
    <phanel/>
    <div class="screen">
        Home
      <router-view/>
    </div>
  </div>
</template>

<script>
import phanel from "@/components/phanel.vue";

export default {
  name: 'app',
  components: {
    phanel
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }
  html {
    border: 1px solid black;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #24292e;
  }


body {
  overflow: scroll;
  margin: 0;
  border: 1px solid #24292e;
}

.screen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  padding-top: 36px
}

.text-right {
  text-align: right;
  padding-right: 20px !important;
}

</style>
