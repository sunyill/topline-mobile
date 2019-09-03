import request from '@/utils/request'

/**
 * 封装的是user请求的部分
 */
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}
