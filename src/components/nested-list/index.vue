<template lang="pug">

v-list(expand)
  child-list(v-for="(item, index) in props.items", :key="index", :items="item")

</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'

import NestedListMixins from './mixins'

export default {
  extends: NestedListMixins
}
</script>
