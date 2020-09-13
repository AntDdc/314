<template>
  <div class="dib">
    <el-cascader
      :options="options"
      v-model="selected_1"
      @change="change"
      clearable
      :props="{ expandTrigger: 'hover' }"
    />
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";

export default {
  props: {
    selected: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      options: regionData,
      selected_1: []
    };
  },
  methods: {
    change(arr) {
      if(!arr.length) return this.$emit('change',...['清空']);
      if (CodeToText[arr[0]] !== '台湾省') {
        this.$emit(
          "change",
          ...[[CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]], arr]
        )
      } else {
        this.$emit("change", ...[CodeToText[arr[0]]])
      }
    }
  },
  watch: {
    selected: {
      handler(val) {
        this.selected_1 = val;
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

