import $http from "@/utils/request.js"

export const reqHomeSwiperList = () => $http.get('/api/public/v1/home/swiperdata')

export const reqHomeCatitemsList = () => $http.get('/api/public/v1/home/catitems')

export const reqHomeFloordataList = () => $http.get('/api/public/v1/home/floordata')

export const reqCategoriesList = () => $http.get('/api/public/v1/categories')

export const reqPublicCategoriesList = () => $http.get('/api/public/v1/categories')
