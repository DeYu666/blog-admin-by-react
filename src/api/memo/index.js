import http from "../http";

/**
 * 获取备忘录内容
 */
function getMemos(statusId){
    return new Promise((resolve, reject) => {
        http("get",'/memo/status/'+statusId).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加备忘录内容
 */
function addMemoContent(data){
    return new Promise((resolve, reject) => {
        http("post",'/inner/memo', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改备忘录状态
 */
function modifyMemoStatus(data){
    return new Promise((resolve, reject) => {
        http("put",'/inner/memo', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除备忘录内容
 */
function deleteMemoContent(id){
    return new Promise((resolve, reject) => {
        http("delete",'/inner/memo', {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}



export {
    getMemos,
    addMemoContent,
    modifyMemoStatus,
    deleteMemoContent,
}