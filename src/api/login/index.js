import http from "../http";



/**
 * 获取用户
 */
function LoginForm(username, password){
    return new Promise((resolve, reject) => {
        http("post",'/login', {username:username, password:password}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}



export {
    LoginForm,
}