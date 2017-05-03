window.basicRequest = function basicRequest(method, url, data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (data.token) {
        xhr.setRequestHeader('Token', data.token);
    }
    xhr.send(JSON.stringify(data.body));
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var data = xhr.response;
            try {
                data = JSON.parse(data);
                console.log(data)

            } catch (e) {
            }

            fn(data);
        }
    }
}

window.getRequest = function getRequest(url, fn) {
    basicRequest('GET', url, {}, fn);
}