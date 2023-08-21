import http from "../http";

/**
 * 获取用户
 */
function getUser(){
    return new Promise((resolve, reject) => {
        http("get",'/inner/users').then(res => {
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
        http("post",'/inner/register',data).then(res => {
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
        http("put",'/inner/user',data).then(res => {
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
        http("delete",'/inner/user/'+id).then(res => {
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