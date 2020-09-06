<!--
  コンポーネントの機能
    - form group の役割
    - 様々なform部品をslotにより挟み込める
    - 構成
      - top : fieldset
      - label : legend
      - content : slot
  interface
    - input : props
      - label : string
-->

<script>
export default {
  name: 'Group',
  props: {
    label : String ,
  },
};
</script>

<template>
  <fieldset class='form-group'>
    <legend v-if='label'>{{label}}</legend>

    <slot/>

  </fieldset>
</template>

<style scoped>
fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  display: block;
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin-bottom: .5rem;
  /* font-size: 1.5rem; */
  line-height: inherit;
  color: inherit;
  white-space: normal;
}

.form-group {
  margin-bottom: 1rem;
}
</style>
