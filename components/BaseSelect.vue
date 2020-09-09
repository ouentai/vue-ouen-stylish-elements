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

.custom-select:valid, .custom-select.is-valid {
  border-color: #28a745;
  padding-right: calc(0.75em + 2.3125rem);
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px, url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.custom-select:valid:focus, .custom-select.is-valid:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.custom-select:invalid, .custom-select.is-invalid {
  border-color: #dc3545;
  padding-right: calc(0.75em + 2.3125rem);
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px, url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.custom-select:invalid:focus, .custom-select.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>
