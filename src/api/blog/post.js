import http from "../http";

/**
 * 获取博客文章
 */
function getPostsList(){
    return new Promise((resolve, reject) => {
        http("get",'/blog/getPostsList').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

function getPostByPostId(id){
    return new Promise((resolve, reject) => {
        http("get",'/blog/getPostByPostId/'+id).then(res => {
            resolve(res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


/**
 * 增加博客文章
 */
function addPost(data){

    return new Promise((resolve, reject) => {
        http("post",'/blog/addPost', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改博客文章
 */
function modifyPost(data){
    return new Promise((resolve, reject) => {
        http("post",'/blog/modifyPost', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除博客文章
 */
function deletePost(id){
    return new Promise((resolve, reject) => {
        http("post",'/blog/deletePost', {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}




/**
 * 获取博客文章观看密码
 */
function getBlogPostPs(){
    return new Promise((resolve, reject) => {
        http("get",'/blog/getBlogPostPs').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改博客文章观看密码
 */
function modifyBlogPostPs(data){
    return new Promise((resolve, reject) => {
        http("post",'/blog/modifyBlogPostPs', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

export {
    getPostsList,
    getPostByPostId,
    addPost,
    modifyPost,
    deletePost,

    getBlogPostPs,
    modifyBlogPostPs,
}