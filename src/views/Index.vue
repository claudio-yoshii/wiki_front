<template>
  <div>
    <div class="wrapper">
      <router-view class="w-100" />
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style>
.wrapper {
  overflow-x: hidden;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: stretch;
  background-color: #efeeea !important;
}
</style>