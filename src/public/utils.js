var token = localStorage.getItem('token');
if (token != null && token.constructor != String) {
    token = "";
}

window.setToken = function setToken(newToken) {
    token = newToken;
    localStorage.setItem('token', newToken);
}

window.basicRequest = function basicRequest(method, url, data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (token) {
        xhr.setRequestHeader('Token', token);
    }
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = xhr.response;
            try {
                data = JSON.parse(data);
                console.log(data)

            } catch (e) {
            }

            fn(data);
        } else if (this.readyState == 4 && (this.status == 401 || this.status == 408)) {
            if (window.location.hash != "#login") {
                navigatePage('login');
            }
        }
    }
}

window.getRequest = function getRequest(url, fn) {
    basicRequest('GET', url, null, fn);
}

window.postRequest = function postRequest(url, data, fn) {
    basicRequest('POST', url, data, fn);
}

window.waitMultiple = function () {
    var args = Array.from(arguments);
    if (args.length < 2) {
        throw new Error('provide at least one function with end function')
    }

    var count = 0;
    var datas = [];
    function finished(data) {
        count++;
        datas[this] = data;
        if (count == args.length - 1) {
            args[args.length - 1].apply(null, datas);
        }
    }

    for (var i = 0; i < args.length - 1; i++) {
        args[i](finished.bind(i));
    }
}