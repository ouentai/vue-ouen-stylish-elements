/**
  ミックスインの機能
    - BaseButtonを拡張する場合

  使い方
    - mixinしたあとに
    - コンポーネントの好きな場所にBaseButtonを配置する : importはmixinで行っている
          <BaseButton
            :text='text'
            :outline='outline'
            :link='link'
            :color='color'
            :size='size'
            @click='$emit("click", $event)'
            >
            <slot>{{text}}</slot>  // slotはコンポーネントをネストしないなら必要ない
          </BaseButton>
    - 上の例を参考にして、各propsや@clickを自由に変更する
    - @clickなしではイベントが伝播されない : $eventは必要なければ省略/変更可能
    - 親コンポーネントでpropsを指定する

  interface : BaseButtonのprops
    - input : props
      - text : string : buttonのテキスト : slot優先
      - outline : boolean : 枠線とtextのみ表示 : colorがなければ無視される
      - link : boolean : textを<a>のように見せる
      - color : string : buttonの色 : primary/secondary/success/info/warning/danger/light/dark
      - size : stirng : ボタンの大きさ : sm/md/lg
*/

import BaseButton from '../components/BaseButton';

export default {
  components: {
    BaseButton ,
  },
  props: {
    text : String ,
    outline : Boolean ,
    link : Boolean ,
    color : String ,
    size : String ,
  },
};
