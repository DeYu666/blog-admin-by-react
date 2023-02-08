import http from "../http"






/**
 * 获取简历经历
 */
function getCvExperience(){
    return new Promise((resolve, reject) => {
        http("get",'/cv/getCvExperience').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加简历经历
 */
function addCvExperience(data){

    return new Promise((resolve, reject) => {
        http("post",'/cv/addCvExperience', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改简历经历
 */
function modifyCvExperience(data){
    return new Promise((resolve, reject) => {
        http("post",'/cv/modifyCvExperience', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除简历经历
 */
function deleteCvExperience(id){
    return new Promise((resolve, reject) => {
        http("post",'/cv/deleteCvExperience', {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}




/**
 * 获取简历技能
 */
function getCvSkill(){
    return new Promise((resolve, reject) => {
        http("get",'/cv/getCvSkill').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加简历技能
 */
function addCvSkill(data){
    return new Promise((resolve, reject) => {
        http("post",'/cv/addCvSkill',data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改简历技能
 */
function modifyCvSkill(data){
    return new Promise((resolve, reject) => {
        http("post",'/cv/modifyCvSkill',data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除简历技能
 */
function deleteCvSkill(id){
    return new Promise((resolve, reject) => {
        http("post",'/cv/deleteCvSkill', {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}






/**
 * 获取简历项目
 */
function getCvProject(){
    return new Promise((resolve, reject) => {
        http("get",'/cv/getCvProject').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


function getCvProjectById(id) {
    return new Promise((resolve, reject) => {
        http("get",'/cv/getCvProjectById/'+id).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


/**
 * 增加简历项目
 */
function addCvProject(data){
    return new Promise((resolve, reject) => {
        http("post",'/cv/addCvProject', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改简历项目
 */
function modifyCvProject(data){
    return new Promise((resolve, reject) => {
        http("post",'/cv/modifyCvProject', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除简历项目
 */
function deleteCvProject(id){
    return new Promise((resolve, reject) => {
        http("post",'/cv/deleteCvProject', {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


/**
 * 获取简历项目观看密码
 */
function getCvProjectPs(){
    return new Promise((resolve, reject) => {
        http("get",'/cv/getCvProjectPs').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改简历项目观看密码
 */
function modifyCvProjectPs(data){
    return new Promise((resolve, reject) => {
        http("post",'/cv/modifyCvProjectPs', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


export {
    getCvExperience,
    addCvExperience,
    modifyCvExperience,
    deleteCvExperience,


    getCvSkill,
    addCvSkill,
    modifyCvSkill,
    deleteCvSkill,


    getCvProject,
    addCvProject,
    modifyCvProject,
    deleteCvProject,
    getCvProjectById,


    getCvProjectPs,
    modifyCvProjectPs,
}