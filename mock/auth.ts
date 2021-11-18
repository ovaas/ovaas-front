import jwt from 'jsonwebtoken'

import type { MockMethod } from 'vite-plugin-mock'

let token = ''

const mock: MockMethod[] = [
  {
    url: '/api/v1/auth',
    method: 'post',
    response: ({ body }: { body: Record<string, string>}) => {
      const { user, password } = body
      if (user && password) {
        token = jwt.sign({ user }, 'privateKey')
        return {
          access_token: token,
        }
      }
      return {
        success: false,
        error: 'Server error.',
      }
    },
  },
]

export default mock
