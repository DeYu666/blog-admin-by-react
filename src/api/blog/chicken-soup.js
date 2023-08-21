import http from "../http";

/**
 * 获取鸡汤语句
 */
function getChickenSoup(){
    return new Promise((resolve, reject) => {
        http("get",'/blog/chicken_soup').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}




/**
 * 增加鸡汤语句
 */
function addChickenSoup(data){

    return new Promise((resolve, reject) => {
        http("post",'/inner/blog/chicken_soup', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改鸡汤语句
 */
function modifyChickenSoup(data){
    return new Promise((resolve, reject) => {
        http("put",'/inner/blog/chicken_soup', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除鸡汤语句
 */
function deleteChickenSoup(id){
    return new Promise((resolve, reject) => {
        http("delete",'/inner/blog/chicken_soup/' + id).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


export {
    getChickenSoup,
    addChickenSoup,
    modifyChickenSoup,
    deleteChickenSoup,
}