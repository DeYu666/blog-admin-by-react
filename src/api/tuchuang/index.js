import http from "../http";

/**
 * 上传图片到服务器
 */
function uploadImageFromPost(file){
    return new Promise((resolve, reject) => {
        blobToDataURL(file, function(dataurl){ 
            var data = {imgBase64:dataurl}
            http("post",'/tuchuang/uploadImageFromPost',data).then(res => {
                resolve(res);
            },error => {
                console.log("网络异常~",error);
                reject(error)
            })
        });    
    })
}


function blobToDataURL(blob, callback) { 
    var a = new FileReader(); 
    a.onload = function (e) { callback(e.target.result); } 
    a.readAsDataURL(blob); 
} 

export {
    uploadImageFromPost,
}