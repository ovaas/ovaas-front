<template>
  <MainContant :title="t('demos.hand-write-ocr.title')" :back-btn="true">
    <div class="relative flex-auto flex w-full items-stretch">
      <div class="absolute transform -translate-y-14 w-full text-gray-600 flex space-x-4 text-md justify-end">
        <RoundedFullBtn icon="bx:bx-undo" :is-disable="disableUndo || disableAllBtn" @click="undo()" />
        <RoundedFullBtn icon="bx:bx-redo" :is-disable="disableRedo || disableAllBtn" @click="redo()" />
        <RoundedFullBtn icon="bx:bx-trash" :is-disable="disableUndo && disableRedo || disableAllBtn" @click="clearAll()" />
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none" :disabled="disableUndo || disableAllBtn" :class="{ 'opacity-50 cursor-not-allowed': disableUndo || disableAllBtn }" @click="sendImage()">
          <Icon v-if="uploading" class="iconify mr-2 -ml-1 animate-spin" icon="mdi:loading" />
          <Icon v-else icon="bx:bx-cloud-upload" class="mr-2 -ml-1" />
          {{ t('upload.text') }}
        </button>
      </div>
      <div ref="box" class="w-full relative rounded-lg overflow-hidden">
        <canvas
          ref="canvas"
          class="absolute bg-gray-200 cursor-pen"
          @mousedown="doMouseDown"
          @mousemove="doMouseMove"
          @mouseup="doMouseUp"
        />
        <div v-if="isModelOpen" class="absolute object-cover h-full w-full bg-gray-800 bg-opacity-50">
          <div class="text-white flex h-full items-center justify-center text-5xl font-semibold relative">
            {{ modelText }}
            <div class="absolute top-0 right-0 p-6 text-lg">
              <div class="h-10 w-10 inline-flex items-center justify-center rounded-full bg-gray-800 hover:bg-opacity-50 text-gray-300 border border-gray-500" @click="isModelOpen = false">
                <Icon icon="mdi:close" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainContant>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()
export { t }

export const canvas = ref(null)
export const box = ref(null)
export const uploading = ref(false)
export const isModelOpen = ref(false)
export const modelText = ref('')
export const disableAllBtn = ref(false)
const isProd = process.env.NODE_ENV === 'production' ? true : false

export const disableUndo = computed(() => {
  return undoDataStack.value.length === 0
})
export const disableRedo = computed(() => {
  return redoDataStack.value.length === 0
})

watch(isModelOpen, value => {
  disableAllBtn.value = value ? true : false
})

let ctx = null

onMounted(() => {
  window.addEventListener('resize',() => {
    canvas.value.width = box.value.offsetWidth;
    canvas.value.height = box.value.offsetHeight;
  })
  canvas.value.width = box.value.offsetWidth;
  canvas.value.height = box.value.offsetHeight;
  ctx = canvas.value.getContext('2d')
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
})

let draw = false
const color = '#000000'
const lineWidth = 10

const STACK_MAX_SIZE = 30;
export const undoDataStack = ref([]);
export const redoDataStack = ref([]);

export const clearAll = () => {
  undoDataStack.value = []
  redoDataStack.value = []
  console.log(undoDataStack);
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
}

const saveDraw = () => {
  redoDataStack.value = [];
  if (undoDataStack.value.length >= STACK_MAX_SIZE) {
    undoDataStack.value.pop();
  }
  undoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height));
};

export const undo = () => {
  if (undoDataStack.value.length <= 0) return;
  redoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height));
  const imageData = undoDataStack.value.shift();
  ctx.putImageData(imageData, 0, 0);
};

export const redo = () => {
  if (redoDataStack.value.length <= 0) return;
  undoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height));
  const imageData = redoDataStack.value.shift();
  ctx.putImageData(imageData, 0, 0);
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

export const sendImage = async () => {
  uploading.value = true

  const mimeType = 'image/jpeg'
  const url = process.env.HUMAN_POSE_API || 'https://ovaashumanpose-test.azurewebsites.net/api/handwitten'
  const formData = new FormData();

  canvas.value.toBlob(async (blob) => {
    formData.append('image', blob);
    if (!isProd) {
      for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
      }
    }

    await axios.post(url, formData, { 
      responseType:"blob",
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        if (!isProd) console.log(response);
        modelText.value = response.data
        isModelOpen.value = true
        uploading.value = false
      })
      .catch(error => {
        if(error.response.code === 408) {
          alert('Server Timeout')
        } else if(error.response.code === 500) {
          alert('Server Error')
        } else {
          alert('Error')
        }
        uploading.value = false
        throw error
      })
  }, mimeType);
}

</script>

<style>

</style>