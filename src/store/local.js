import { useStorage } from "@vueuse/core";

export const localeSchema = useStorage("locales", "en");
