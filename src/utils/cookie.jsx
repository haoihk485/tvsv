export const deleteCookie = () => {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + '=') === 0) {
            var cookieExpires = new Date(0).toUTCString();
            document.cookie = cookieName + '=; expires=' + cookieExpires + '; path=/';
            return;
        }
    }
}

export const deleteAllCookies = () => {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var cookieName = cookie.split('=')[0];
        var cookieExpires = new Date(0).toUTCString();
        document.cookie = cookieName + '=; expires=' + cookieExpires + '; path=/';
    }
}

export const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}