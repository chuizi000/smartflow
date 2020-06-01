<template>
  <div class="CodeViewPanel">
    <el-card class="CodeCard" shadow="hover">
      <!-- <pre class="line-numbers language-js" id="CodeView"><code>{{solcode}}</code></pre> -->
      <prism id="CodeView" language="solidity" :plugins="['line-numbers']" :code="solcode"></prism>
    </el-card>
  </div>
</template>

<script>
import Prism from 'vue-prismjs';
import 'prismjs/themes/prism.css';
  
    
export default {
  components: {
      Prism
  },
  name: "CodeViewPanel",
  props: ["solcode"]
};
</script>

<style>
.codeview {
  align-content: center;
}
div.CodeViewPanel {
  padding-right: 5%;
  /* padding-top: 20px; */
  margin-top: 20px;
  height: 90%;
}
.CodeCard {
  height: 100%;
}
.el-card__body {
  height: 100%;
}
#CodeView {
  height: 90%;
}
</style>