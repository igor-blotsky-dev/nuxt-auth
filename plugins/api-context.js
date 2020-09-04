export default (context, inject) => {
  inject('api', async (controller, method, params) => {
    const httpMethod = params ? '$post' : '$get'
    const path = `/api/${controller}/${method}`

    return await context.$axios[httpMethod](path, params)
  })
}
