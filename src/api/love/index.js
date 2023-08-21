import http from "../http";

/**
 * 获取嘿嘿嘿
 */
function getLoveInfo(){
    return new Promise((resolve, reject) => {
        http("get",'/love').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加嘿嘿嘿
 */
function addLoveInfo(data){

    return new Promise((resolve, reject) => {
        http("post",'/inner/love', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改嘿嘿嘿
 */
function modifyLoveInfo(data){
    console.log(data)
    return new Promise((resolve, reject) => {
        http("put",'/inner/love', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除嘿嘿嘿
 */
function deleteLoveInfo(id){
    return new Promise((resolve, reject) => {
        http("delete",'/inner/love/' + id, {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


export {
    getLoveInfo,
    addLoveInfo,
    modifyLoveInfo,
    deleteLoveInfo,

}