var container = document.getElementById('container');
document.body.style.backgroundColor = '#2c3338';
document.body.style.color = '#606468';

window.navigatePage = function (page) {
    window.location.hash = page;

    getRequest('/page/' + page + '.html', function (html) {
        container.innerHTML = html;
    });
}

var last;
setInterval(function () {
    if (window.location.hash != last) {
        navigatePage(window.location.hash.substring(1));
        last = window.location.hash;
    }
}, 500);