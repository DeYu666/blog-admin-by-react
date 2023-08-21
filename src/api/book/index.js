import http from "../http";


/**
 * 获取书籍
 */
function getBooksList(){
    return new Promise((resolve, reject) => {
        http("get",'/books_list').then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加书籍
 */
function addBooksList(data){

    return new Promise((resolve, reject) => {
        http("post",'/inner/books_list', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改书籍
 */
function modifyBooksList(data){
    return new Promise((resolve, reject) => {
        http("put",'/inner/books_list', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除书籍
 */
function deleteBooksList(id){
    return new Promise((resolve, reject) => {
        http("delete",'/inner/books_list/'+id, {id:id}).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}








/**
 * 获取书籍内容
 */
function getBookContent(bookId){
    return new Promise((resolve, reject) => {
        http("get",'/book_content/'+bookId).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 增加书籍内容
 */
function addBookContent(data){

    return new Promise((resolve, reject) => {
        http("post",'/inner/book_content', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 * 修改书籍内容
 */
function modifyBookContent(data){
    return new Promise((resolve, reject) => {
        http("put",'/inner/book_content', data).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}

/**
 *  删除书籍内容
 */
function deleteBookContent(id){
    return new Promise((resolve, reject) => {
        http("delete",'/inner/book_content/' + id).then(res => {
            resolve (res);
        },error => {
            console.log("网络异常~",error);
            reject(error)
        })
    })
}




export {
    getBooksList,
    addBooksList,
    modifyBooksList,
    deleteBooksList,

    getBookContent,
    addBookContent,
    modifyBookContent,
    deleteBookContent,
}