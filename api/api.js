import $http from "@/utils/request.js"

export const reqHomeSwiperList = () => $http.get('/api/public/v1/home/swiperdata')

export const reqHomeCatitemsList = () => $http.get('/api/public/v1/home/catitems')

export const reqHomeFloordataList = () => $http.get('/api/public/v1/home/floordata')

export const reqCategoriesList = () => $http.get('/api/public/v1/categories')

export const reqPublicCategoriesList = () => $http.get('/api/public/v1/categories')

export const reqGoodsQsSearchList = (params) => $http.get('/api/public/v1/goods/qsearch', params)

export const reqGoodsSearchList = (params) => $http.get('/api/public/v1/goods/search', params)

export const reqGoodsDetail = (params) => $http.get('/api/public/v1/goods/detail', params)

export const login = (query) => $http.post('/api/public/v1/users/wxlogin', query)

export const reqCreateOrders = (params) => $http.post('/api/public/v1/my/orders/create', params)

export const reqUnifiedOrder = (params) => $http.post('/api/public/v1/my/orders/req_unifiedorder', params)

export const reqChkOrder = (params) => $http.post('/api/public/v1/my/orders/chkOrder', params)
