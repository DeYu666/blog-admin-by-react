import http from "../http";


/**
 * 获取日记
 */
function getDiary(){
    return new Promise((resolve, reject) => {
        http("get",'/diary').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加日记
 */
function addDiary(data){

    return new Promise((resolve, reject) => {
        http("post",'/inner/diary', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改日记
 */
function modifyDiary(data){
    return new Promise((resolve, reject) => {
        http("put",'/inner/diary', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除日记
 */
function deleteDiary(id){
    return new Promise((resolve, reject) => {
        http("delete",'/inner/diary/' + id).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}




/**
 * 获取日记观看密码
 */
function getDiaryPs(){
    return new Promise((resolve, reject) => {
        http("get",'/inner/diary_ps').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改日记观看密码
 */
function modifyDiaryPs(data){
    return new Promise((resolve, reject) => {
        http("put",'/inner/diary_ps', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

export {
    getDiary,
    addDiary,
    modifyDiary,
    deleteDiary,

    getDiaryPs,
    modifyDiaryPs,
}