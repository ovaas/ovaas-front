<template>
  <div
    ref="el"
    :class="$attrs.class"
    style="vertical-align: text-bottom"
  />
</template>

<script setup="props">
import { watch, ref, onMounted, nextTick } from "vue";
import Iconify from "@purge-icons/generated";

export default {
  props: {
    icon: String,
    size: {
      type: Number,
      default: 1.6,
    },
  },
};

export const el = ref(null);
const update = async () => {
  if (el.value) {
    await nextTick();
    const svg = Iconify.renderSVG(props.icon, {});
    if (svg) {
      svg.attributes.width.value = props.size + "em";
      svg.attributes.height.value = props.size + "em";
      el.value.textContent = "";
      el.value.appendChild(svg);
    } else {
      const span = document.createElement("span");
      span.style.width = props.size + "em";
      span.style.height = props.size + "em";
      span.className = "iconify";
      span.dataset.icon = props.icon;
      el.value.textContent = "";
      el.value.appendChild(span);
    }
  }
};
watch(() => props.icon, update, { flush: "post" });
onMounted(update);
</script>

<style>
  span.iconify {
    background: #5551;
    border-radius: 100%;
    min-width: 1em;
    min-height: 1em;
    display: block;
  }
</style>