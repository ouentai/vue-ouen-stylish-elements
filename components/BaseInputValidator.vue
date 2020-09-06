<!--
  コンポーネントの機能
    - form input の役割
    - 入出力する値
      - input : props : value
      - output : emit : update:value
    - バリデーション : props : validator
      - function : @return Boolean
      - null : default validator : 文字数max以下 : maxの指定なしの場合はバリデーションなし
    - 値の整形 : prop : formatter
      - function : @return String
      - null : 整形せずに値をemit
  interface
    - input : props
      - value : formで扱う値
      - max : 最大文字数 : default validator用
      - required : 入力必須 : default validator用
      - validator : custom validator
      - formatter : 初期化時と入力時のデータ整形方法
      - validMessage   : バリデートtrue時のメッセージ
      - invalidMessage : バリデートfalse時のメッセージ
    - output : emit
      - update:value : String : :value.syncで使う用
      - input : String : v-modelで使う用
      - update:state : Boolean : validate結果 : passならtrue
      - event:failedValidation
-->

<script>
export default {
  name: 'InputValidator',
  components: {},
  props: {
    value  : { type : String , default : '' , },
    max   : Number ,
    required : Boolean ,
    validator : Function ,
    formatter : Function ,
    validMessage : String ,
    invalidMessage : String ,
  },
  data () {
    return {
      state : null ,
    };
  },
  computed: {
    selectedValidator() { return this.validator || this.defaultValidator ; },
    localValue: {
      get() { return this.getFlow(this.value) ; },
      set(val) { this.setFlow(val); },
    },
  },
  methods: {
    getFlow(val) {
      val = this.validate(val) ;
      this.updateValue(val);
      return val;
    },

    setFlow(val) {
      this.updateValue(this.formatValue(val));
    },

    validate(val) {
      const state = this.selectedValidator(val) ;

      if (!state) {
        this.$emit('event:failedValidation');
        val = this.formatValue(val);
      }

      this.updateState(state);
      return val ;
    },

    defaultValidator(val) {
      if (!this.max) return true ;
      const len = (val||'').length ;
      return len <= this.max && !(this.required && len===0) ;
    },

    updateValue(val) {
      if (this.value!==val) {
        this.$emit('update:value', val);
        this.$emit('input', val);
      }
    },

    updateState(val) {
      if (this.state!==val) {
        this.$emit('update:state', val);
        this.state = val ;
      }
    },

    formatValue(val) {
      if (!this.formatter) return val ;
      const formatted = this.formatter(val) ;
      this.rerenderInnerText(formatted);
      return formatted ;
    },

    rerenderInnerText(val) {
      const inputDom = this.$refs.inputDom;
      if (inputDom) {
        inputDom.value = val ;
      }
    },

  },
};
</script>

<template>
  <div>
    <input
      ref='inputDom'
      v-model='localValue'
      class='form-control'
      :class='{"is-valid":state, "is-invalid":!state}'
      />
    <div v-if='validMessage'   class='valid-feedback'  >{{validMessage}}</div>
    <div v-if='invalidMessage' class='invalid-feedback'>{{invalidMessage}}</div>
  </div>
</template>

<style scoped>
.form-control {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control.is-valid {
  border-color: #28a745;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.form-control.is-invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.is-valid ~ .valid-feedback ,
.is-invalid ~ .invalid-feedback {
  display: block;
}

.valid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #28a745;
}

.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>
