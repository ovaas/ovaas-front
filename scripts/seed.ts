import { TableClient } from '@azure/data-tables'
import dotenv from 'dotenv'
import { demoPartitionKey } from '../lib/table'
import type { Demo } from '../lib/schema'

dotenv.config()

const demos: Demo[] = [
  {
    slug: 'human-pose-estimation',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/humanpose',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/human-pose-estimation.webp',
    title_ja: '骨格推定',
    description_ja: 'AIによる人間の骨格を推定するデモです。皆さんの写真をアップロードしてお試しください。',
    title_en: 'Human Pose Estimation',
    description_en: 'This is a demo to estimate human\'s pose by AI. Try it with uploading your picture.',
  },
  {
    slug: 'handwritten-ocr',
    type: 'canvas',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/handwritten',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/handwriting-ocr.webp',
    title_ja: '日本語手書き文字OCR',
    description_ja: '日本語の手書き文字をAIが認識します。お好きな文字を書いてお試しください。',
    title_en: 'Japanese Handwritten OCR',
    description_en: 'AI will recognize what is written in Japanese. Try it with writing some character in Japanese.',
  },
  {
    slug: 'colorization',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/colorization',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/draw-colors.webp',
    title_ja: '白黒画像のカラー化',
    description_ja: '白黒画像に対してAIが自動で色を塗り、カラー画像に変換します。白黒画像をアップロードしてお試しください。',
    title_en: 'Colorization',
    description_en: 'This is a demo to convert a monochrome image to a colorized image by AI. Try it with uploading your monochrome image.',
  },
  {
    slug: 'face-age',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/faceage',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/face-age.webp',
    title_ja: '年齢推定',
    description_ja: 'AIが画像内に写っている人物の年齢を推定します。人が写っている画像をアップロードしてお試しください。',
    title_en: 'Face Age',
    description_en: 'This is a demo to estimate age of a person in a picture by AI. Try it with your picture!',
  },
  {
    slug: 'mono-depth',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/monodepth',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/mono-depth.webp',
    title_ja: '深度推定',
    description_ja: 'AIが画像内の相対的な距離を推定し、距離が近いものはカラーのままで、遠いものはグレースケールに変換します。',
    title_en: 'Mono Depth',
    description_en: 'AI estimates the relative distances in a picture. The farther objects in a picture are converted to grayscale. Try it with your picture!',
  },
  {
    slug: 'object-detection',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/objectdetection',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/object-detection.webp',
    title_ja: '物体検出',
    description_ja: '画像の中の点字マークとトイレマークをAIが検出します。',
    title_en: 'Object Detection',
    description_en: 'AI will detect TENJI mark and Toilet mark in a picture. Try it with your picture!',
  },
  {
    slug: 'segmentation',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/humansegmentation',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/segmentation.webp',
    title_ja: 'セグメンテーション',
    description_ja: 'AIが画像内に写っている人物を発見します。人物はカラーのままで、他のモノはグレースケールになります。',
    title_en: 'Segmentation',
    description_en: 'AI finds people in a picture. People remain in color, while the others are converted to grayscale. Try it with your picture!',
  },
  {
    slug: 'super-resolution',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/superresolution',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/super_resolution.webp',
    title_ja: '超解像',
    description_ja: 'AIが画像内に写っているモノの種類を推定します。画像をアップロードしてお試しください。',
    title_en: 'Super Resolution',
    description_en: 'AI corrects a fuzzy image to high resolution image. Try it with your image!',
  },
  {
    slug: 'object-detection-yolo',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/yolov3',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/object-detection-yolo.webp',
    title_ja: '物体検出(Yolo)',
    description_ja: 'AIが画像内に写っているモノの種類を推定します。画像をアップロードしてお試しください。',
    title_en: 'Object Detection Yolo',
    description_en: 'AI estimates the type of objects in a picture. This AI can estimate 80 kinds of objects. Try it with your picture!',
  },
  {
    slug: 'hide-distant-person',
    type: 'imageUpload',
    apiUrl: 'https://ovaas-backend.azurewebsites.net/api/hide-distant-person',
    thumbnailUrl: 'https://ovaasbackend.blob.core.windows.net/images/hide-distant-person.webp',
    title_ja: 'セグメンテーションと距離推定',
    description_ja: 'AIが画像内の人物と距離を推定し、距離に応じて人物のみ明暗を変更します。',
    title_en: 'Segmentation & Mono Depth',
    description_en: 'AI estimates shape of person and distance in a picture. The brightness of only person changes according to the distance.',
  },
]

async function main() {
  const table = TableClient.fromConnectionString(process.env.NUXT_TABLE_STORAGE_CONNECTION_STRING!, 'demos')

  for (const demo of demos) {
    const result = await table.createEntity({
      partitionKey: demoPartitionKey,
      rowKey: demo.slug,
      ...demo,
    })
    console.log(result)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
