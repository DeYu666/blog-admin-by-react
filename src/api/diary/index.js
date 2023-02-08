import http from "../http";


/**
 * 获取日记
 */
function getDiary(){
    return new Promise((resolve, reject) => {
        http("get",'/diary/getDiary').then(res => {
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
        http("post",'/diary/addDiary', data).then(res => {
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
        http("post",'/diary/modifyDiary', data).then(res => {
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
        http("post",'/diary/deleteDiary', {id:id}).then(res => {
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
        http("get",'/diary/getDiaryPs').then(res => {
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
        http("post",'/diary/modifyDiaryPs', data).then(res => {
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