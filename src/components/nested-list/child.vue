<template functional lang="pug">

v-list-group(v-if="Array.isArray(props.items.items)")
  v-list-tile(slot="activator")
    v-list-tile-action
      v-icon
        | {{ props.items.icon }}
    v-list-tile-content
      v-list-tile-title
        | {{ props.items.text }}
  child-list(v-for="(item, index) in props.items.items", :key="index", :items="item")
v-list-tile(v-else, :to="props.items.link", ripple)
  v-list-tile-action
    v-icon
      | {{ props. items.icon }}
  v-list-tile-content
    v-list-tile-title
      | {{ props.items.text }}

</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'

import NestedListMixins from './mixins.js'

export default {
  extends: NestedListMixins
}
</script>
