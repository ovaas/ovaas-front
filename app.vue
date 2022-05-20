<script setup>
import { isDev } from '@/lib/utils'

import '@unocss/reset/tailwind.css'
import 'assets/styles/main.postcss'
// import 'uno.css'

setupVeeValidate()
</script>

<template>
  <Body bg-light-500 text-true-gray-700 dark="bg-dark-800 text-gray-100" />
  <Head>
    <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <Link rel="canonical" href="https://ovaas.netlify.app" />
    <Meta name="mobile-web-app-capable" content="yes" />
    <Meta name="apple-mobile-web-app-capable" content="yes" />
    <Meta name="msapplication-starturl" content="/" />
    <Meta name="msapplication-TileColor" content="#00aba9" />
    <Meta property="og:url" content="https://ovaas.netlify.app" />
    <Meta property="og:type" content="website" />
    <Meta property="og:site_name" content="OVAAS" />
    <Meta property="og:image" content="https://ovaas.netlify.app/og.png" />
    <Meta property="og:locale" content="en_US" />
    <Meta property="og:locale:alternate" content="ja_JP" />
    <Meta name="twitter:card" content="Summary Card" />
  </Head>
  <TheHeader />
  <main mx-auto max-w-screen-xl px2 pt8 lg="px6 pt12">
    <NuxtPage />
  </main>
  <TheFooter />
  <FlashMessage />
  <MessageButtons v-if="isDev" />
</template>

<style>
:root {
  --header-height: 4.5rem;
}
/* html {
  @apply bg-light-500 text-true-gray-700;
}

html.dark {
  @apply bg-dark-800 text-gray-100;
} */
</style>
