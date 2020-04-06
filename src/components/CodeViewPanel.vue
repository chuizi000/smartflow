<template>
  <div class="CodeViewPanel">
    <el-card class="CodeCard" shadow="hover">
      <pre class="line-numbers language-js" id="CodeView"><code>{{solcode}}</code></pre>
    </el-card>
  </div>
</template>

<script>
import solcode from "../assets/code.sol";
export default {
  name: "CodeViewPanel",
  data() {
    return {
      solcode
    };
  }
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
  height: 95%;
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