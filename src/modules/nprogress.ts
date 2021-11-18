import NProgress from 'nprogress'
import type { UserModule } from '@/types'

// progress bar
export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(() => { NProgress.start() })
    router.afterEach(() => { NProgress.done() })
  }
}
