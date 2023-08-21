import http from "../http";

/**
 * 获取博客文章
 */
function getPostsList(){
    return new Promise((resolve, reject) => {
        http("get",'/blog/post').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

function getPostByPostId(id){
    return new Promise((resolve, reject) => {
        http("get",'/blog/post/'+id).then(res => {
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
        http("post",'/inner/blog/post', data).then(res => {
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
        http("put",'/inner/blog/post', data).then(res => {
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
        http("delete",'/inner/blog/post/'+id).then(res => {
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
        http("get",'/inner/blog/post_ps').then(res => {
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
        http("put",'/inner/blog/post_ps', data).then(res => {
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