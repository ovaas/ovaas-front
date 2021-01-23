import { Ref, ref } from 'vue'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import NProgress from 'nprogress'
import { flash, EmitTypes } from './emitter'

const isProd = import.meta.env.PROD

axios.interceptors.request.use((config) => {
  NProgress.start()
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  NProgress.done()
  return response
}, (error) => {
  NProgress.done()
  if (typeof error.response === 'undefined')
    flash(EmitTypes.Danger, 'Network Error')
  else if (error.response?.status === 408)
    flash(EmitTypes.Danger, 'Server Timeout')
  else if (error.response?.status === 500)
    flash(EmitTypes.Danger, 'Server Error')
  else if (error.request)
    flash(EmitTypes.Danger, 'Request Error')
  else flash(EmitTypes.Danger, 'Umm... Something goes wrong')
  return Promise.reject(error)
})

/**
 * Wrapper for axios.
 *
 * @see   {@link https://vueuse.js.org/useAxios}
 * @param url
 * @param postData
 * @param config
 */
export function useApi<T = any>(
  url: string,
  config?: AxiosRequestConfig,
) {
  const response = ref<any>(null) as Ref<AxiosResponse<T> | undefined>
  const data = ref<any>(undefined) as Ref<T | undefined>
  const finished = ref(false)
  const loading = ref(false)
  const canceled = ref(false)
  const error = ref<AxiosError<T> | undefined>()

  const cancelToken: CancelTokenSource = axios.CancelToken.source()
  const cancel = (message?: string) => {
    cancelToken.cancel(message)
    canceled.value = true
    finished.value = true
    loading.value = false
  }
  const post = async(postData: any): Promise<void> => {
    loading.value = true
    flash(EmitTypes.Info, 'Uploading...')
    await axios.post(url, postData, { ...config, cancelToken: cancelToken.token })
      .then((r: AxiosResponse<T>) => {
        response.value = r
        data.value = r.data
        finished.value = true
        loading.value = false
        flash(EmitTypes.Success, 'Upload successful')
      })
      .catch((e) => {
        error.value = e
        finished.value = true
        loading.value = false
      })
  }

  return {
    response,
    data,
    error,
    finished,
    loading,
    cancel,
    canceled,
    post,
  }
}

export function useFromData(name: string, file: File | Blob, filename?: string): FormData {
  const formData = new FormData()
  formData.append(name, file, filename)
  if (!isProd) {
    for (const pair of formData.entries())
      console.log(`${pair[0]}, ${pair[1]}`)
  }
  return formData
}
