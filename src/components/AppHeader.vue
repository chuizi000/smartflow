<template>
  <div class="container">
    <img id="logo" :src="LogoImgPath" alt=""/>
  </div>
</template>

<script>
import LogoImgPath from "../assets/logo.png"

export default {
    name:"Header",
    data(){
      return {
        LogoImgPath
      };
    }
}
</script>

<style>
div.container{
  border-bottom: 1px solid #dcdfe6;
  height: 100%;
  margin-left:30px;
  margin-right:50px;
}

img#logo{
  padding-top: 30px;
  padding-left: 20px;
  padding-bottom: 5px;
  height: 45px;
}
</style>