import http from "../http";

/**
 * 获取用户
 */
function getUser(){
    return new Promise((resolve, reject) => {
        http("get",'/user/getUser').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加用户
 */
function addUser(data){
    return new Promise((resolve, reject) => {
        http("post",'/user/addUser',data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改用户
 */
function modifyUser(data){
    return new Promise((resolve, reject) => {
        http("post",'/user/modifyUser',data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除用户
 */
function deleteUser(id){
    return new Promise((resolve, reject) => {
        http("post",'/user/deleteUser', {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


export {
    getUser,
    addUser,
    modifyUser,
    deleteUser,
}