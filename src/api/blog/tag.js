import http from "../http";

/**
 * 获取博客标签
 */
function getTags(){
    return new Promise((resolve, reject) => {
        http("get",'/blog/tag').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加博客标签
 */
function addTags(data){

    return new Promise((resolve, reject) => {
        http("post",'/inner/blog/tag', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改博客标签
 */
function modifyTags(data){
    return new Promise((resolve, reject) => {
        http("put",'/inner/blog/tag', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除博客标签
 */
function deleteTags(id){
    return new Promise((resolve, reject) => {
        http("delete",'/inner/blog/tag/' + id).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


export {
    getTags,
    addTags,
    modifyTags,
    deleteTags,


}