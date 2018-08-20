function setStorage(objName, objValue, objHours) {
    localStorage.setItem(objName, objValue)
}

function getStorage(objName) {//获取指定名称的cookie的值

    return localStorage.getItem(objName)
}

function checkStorage(objName) {//获取指定名称的cookie的值
   // document.cookie="token="+username;
    var v = getStorage(objName);
    //alert(v);
    if (v == undefined || v == 'null' || v == null || v == '') {
        return false;
    } else {
        return true;
    }
}

function delStorage(objName) {//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
    localStorage.removeItem(objName);
}
function clearStorage() {
    localStorage.clear();
}