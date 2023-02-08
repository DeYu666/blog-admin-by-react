import http from "../http";

/**
 * 获取博客总类
 */
function getGeneralCate(){
    return new Promise((resolve, reject) => {
        http("get",'/blog/getGeneralCate').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}




/**
 * 增加博客总类
 */
function addGeneralCate(data){

    return new Promise((resolve, reject) => {
        http("post",'/blog/addGeneralCate', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改博客总类
 */
function modifyGeneralCate(data){
    return new Promise((resolve, reject) => {
        http("post",'/blog/modifyGeneralCate', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除博客总类
 */
function deleteGeneralCate(id){
    return new Promise((resolve, reject) => {
        http("post",'/blog/deleteGeneralCate', {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}



/**
 * 获取博客分类
 */
function getCategory(){
    return new Promise((resolve, reject) => {
        http("get",'/blog/getCategory').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}




/**
 * 增加博客总类
 */
function addCategory(data){
    return new Promise((resolve, reject) => {
        http("post",'/blog/addCategory', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改博客总类
 */
function modifyCategory(data){
    return new Promise((resolve, reject) => {
        http("post",'/blog/modifyCategory', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除博客总类
 */
function deleteCategory(id){
    return new Promise((resolve, reject) => {
        http("post",'/blog/deleteCategory', {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


export {
    getGeneralCate,
    addGeneralCate,
    modifyGeneralCate,
    deleteGeneralCate,

    getCategory,
    addCategory,
    modifyCategory,
    deleteCategory,


}
