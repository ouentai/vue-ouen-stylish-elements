<template>
  <div>
    <BaseGroup label='button'>
      <BaseButton color='primary' outline @click='clicked("button")'>
        button
      </BaseButton>
    </BaseGroup>

    <BaseGroup label='select'>
      <BaseSelect v-model='selectData'>
        <option value='aaa'>aaa</option>
        <option value='bbb'>bbb</option>
      </BaseSelect>
    </BaseGroup>

    <BaseGroup label='input'>
      <BaseInputValidator
        v-model='inputData'
        :max='10'
        invalidMessage='under 10 characters'
        />
    </BaseGroup>

    <BaseGroup label='input number'>
      <BaseInputNumber
        v-model='inputNumber'
        :max='100000'
        :min='-1000'
        int
        class='is-valid'
        />
    </BaseGroup>

    <BaseGroup label='tel'>
      <BaseInputValidator
        v-model='telData'
        :validator='telValidator'
        :formatter='telFormatter'
        validMessage='you can use 2 hyphens and numbers'
        invalidMessage='not tel style'
        />
    </BaseGroup>

    <BaseGroup label='mixin button'>
      <DemoButton text='mixin' @click='clicked("mixin")'/>
    </BaseGroup>

  </div>
</template>

<script>
import {
  BaseButton ,
  BaseSelect ,
  BaseGroup  ,
  BaseInputValidator ,
  BaseInputNumber ,
  // ButtonStyleable ,
} from './index.js';

import DemoButton from './DemoButton';

export default {
  name: 'Demo',
  components: {
    BaseButton ,
    BaseSelect ,
    BaseGroup  ,
    BaseInputValidator ,
    BaseInputNumber ,
    // ButtonStyleable ,
    DemoButton ,
  },
  props: {},
  data () {
    return {
      selectData : 'aaa' ,
      inputData : 'ddd' ,
      inputNumber : null ,
      telData : '012-345-444' ,
    };
  },
  computed: {},
  methods: {
    clicked (val) {alert(val)},
    telValidator(val) { return /^\d{0,4}-{0,1}\d{0,5}-{0,1}\d{0,5}$/.test(val) ; },
    telFormatter(val) {
      return (val||'').replace(/[０-９]/g , (s) => String.fromCharCode(s.charCodeAt(0)-65248) ) // 数字の半角化 : string
                      .replace(/\D+/g   , '-' ) // 半角数字以外をハイフン化 : 連続しているものは1つのハイフンへ
                      .replace(/^-/g    , ''  ) // 先頭のハイフンを削除 : 末尾のハイフンを削ると入力できない
                      .slice(0,16) // 16文字以内に丸める : validatorに合わせた
                      ;
    },
  },
};
</script>
