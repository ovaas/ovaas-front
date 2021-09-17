<script setup lang="ts">
import { Head } from '@vueuse/head'
import { useHead } from '@/logics/head'

useHead(computed(() => ({
  title: 'OVaaS - OpenVINO as a service',
  description: 'No setup! No command! No code! Easy to use OpenVINO™ demo website.',
})))
const isDev = import.meta.env.DEV
</script>

<template>
  <Head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="canonical" href="https://ovaas.netlify.app">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="msapplication-starturl" content="/">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta property="og:url" content="https://ovaas.netlify.app">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="OVaaS">
    <meta property="og:image" content="https://ovaas.netlify.app/og.png">
    <meta property="og:locale" content="en_US">
    <meta property="og:locale:alternate" content="ja_JP">
    <meta name="twitter:card" content="Summary Card">
  </Head>
  <TheHeader />
  <main class="d-container">
    <router-view />
  </main>
  <TheFooter />
  <FlashMessage />
  <MessageButtons v-if="isDev" />
</template>
