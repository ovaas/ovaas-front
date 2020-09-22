<template>
  <MainContant :title="t('demos.hand-write-ocr.title')" :back-btn="true">
    <div class="flex-auto flex w-full rounded-lg items-stretch overflow-hidden">
      <div ref="box" class="w-full relative">
        <canvas
          ref="canvas"
          class="absolute bg-gray-200"
          @mousedown="doMouseDown"
          @mousemove="doMouseMove"
          @mouseup="doMouseUp"
        />
      </div>
    </div>
  </MainContant>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
export { t }

export const canvas = ref(null)
export const box = ref(null)
export const disableUndo = ref(true)
export const disableRedo = ref(true)

let ctx = null

onMounted(() => {
  console.log(canvas);
  canvas.value.width = box.value.offsetWidth;
  canvas.value.height = box.value.offsetHeight;
  ctx = canvas.value.getContext('2d')
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
})

export let draw = false
const color = '#000000'
const lineWidth = 10

const STACK_MAX_SIZE = 30;
let undoDataStack = [];
let redoDataStack = [];
const saveDraw = () => {
  redoDataStack = [];
  disableRedo.value = true
  if (undoDataStack.length >= STACK_MAX_SIZE) {
    undoDataStack.pop();
  }
  undoDataStack.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height));
  disableUndo.value = false
};
const undo = () => {
  if (undoDataStack.length <= 0) return;
  redoDataStack.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height));
  disableRedo.value = true
  const imageData = undoDataStack.shift();
  ctx.putImageData(imageData, 0, 0);
  if (undoDataStack.length <= 0) {
    disableUndo.value = true
  }
};
const redo = () => {
  if (redoDataStack.length <= 0) return;
  undoDataStack.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height));
  disableUndo.value = false
  const imageData = redoDataStack.shift();
  ctx.putImageData(imageData, 0, 0);
  if (redoDataStack.length <= 0) {
    disableRedo.value = true
  }
};

export const doMouseDown = (e) => {
  saveDraw()
  draw = true;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}
export const doMouseMove = (e) => {
  if (!draw) return
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}
export const doMouseUp = () => {
  draw = false;
}


</script>

<style>

</style>