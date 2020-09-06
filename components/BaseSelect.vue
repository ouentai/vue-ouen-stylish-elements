<!--
  コンポーネントの機能
    - form select の役割
    - choice : props.options | custom option with slot
    - how to use
      - general use
        - <BaseSelect :options='options' v-model='val' />
        - <BaseSelect :options='options' :value.sync='val' />
        - <BaseSelect :options='options' :value='val' @input='val=$event' />
      - use slot instead of props.options
        - <BaseSelect v-model='val'>
            <option v-for='(o,index) of options' :key='o.text' :value='o.value'>{{o.text}}</option>
          </BaseSelect>
      - set default selected position after clear time without $emit data
        - <BaseSelect :options='options' v-model='val' :clearTime='5000' :defaultSelected='some value' />
    - clearTimeがあれば、clearTime後にdefaultSelectedに戻る
  interface
    - slot : selectタグの中のoptionタグが期待される場所
    - input : props
      - value : any : i/o対象
      - options : array <option>
        - option : object : { text : string , value : mixed , disabled : boolean }
      - defaultSelected : any like as props value :default value without props.value, set select position after clear time
      - clearTime : number : how long millisecond does it set defaultSelected back
    - output : emit
      - update:value
      - input
-->

<script>
export default {
  name: 'Select',
  props: {
    value : {},
    options : {
      type : Array ,
      default : () => [] ,
    },
    defaultSelected : {
      default : null ,
    },
    clearTime : {
      type : Number ,
      default : null ,
    },
  },
  data () {
    return {
      selected : this.value ?? this.defaultSelected ,
    };
  },
  watch: {
    defaultSelected() { this.selected = this.defaultSelected ; },
    value () { this.selected = this.value ; },
  },
  methods: {
    passValue() {
      this.$emit( 'update:value'   , this.selected );
      this.$emit( 'input'          , this.selected );
      if (this.clearTime!==null) {
        setTimeout( () => { this.selected = this.defaultSelected ; } , this.clearTime);
      }
    },
  },
};
</script>

<template>
  <select class='custom-select' v-model='selected' @change='passValue'>
    <slot>

      <option
        v-for='(o,i) of options'
        :key='"selectoption_"+i'
        :value='o.value'
        :disabled='o.disabled'
        >{{o.text}}</option>

    </slot>
  </select>
</template>

<style scoped>
.custom-select {
  display: inline-block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.custom-select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
