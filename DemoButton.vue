<script>
import ButtonStyleable from './mixin/ButtonStyleable';

export default {
  name: 'BlueButton' ,
  mixins: [
    ButtonStyleable ,
  ],
};
</script>

<template>
  <BaseButton
    :text='text'
    :outline='outline'
    :link='link'
    :size='size'
    color='primary'
    @click='$emit("click", $event)'
    >

    <slot>{{text}}</slot>

  </BaseButton>
</template>
