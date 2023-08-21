import http from "../http"






/**
 * 获取简历经历
 */
function getCvExperience(){
    return new Promise((resolve, reject) => {
        http("get",'/profile/experience').then(res => {
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
        http("post",'/inner/profile/experience', data).then(res => {
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
        http("put",'/inner/profile/experience', data).then(res => {
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
        http("delete",'/inner/profile/experience/' + id, {id:id}).then(res => {
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
        http("get",'/profile/skill').then(res => {
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
        http("post",'/inner/profile/skill',data).then(res => {
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
        http("put",'/inner/profile/skill',data).then(res => {
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
        http("delete",'/inner/profile/skill/'+id).then(res => {
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
        http("get",'/profile/project').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}


function getCvProjectById(id) {
    return new Promise((resolve, reject) => {
        http("get",'/profile/projectById/'+id).then(res => {
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
        http("post",'/inner/profile/project', data).then(res => {
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
        http("put",'/inner/profile/project', data).then(res => {
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
        http("delete",'/inner/profile/project/' + id, {id:id}).then(res => {
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
        http("get",'/inner/profile/projectPs').then(res => {
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
        http("put",'/inner/profile/projectPs', data).then(res => {
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