var container = document.getElementById('container');
document.body.style.backgroundColor = '#2c3338';
document.body.style.color = '#606468';

window.navigatePage = function (page, fn) {
    window.location.hash = page;

    var subPages = page.split('/');

    getRequest('/page/' + subPages[0] + '.html', function (html) {
        window.pageParts = subPages;
        container.innerHTML = html;
        Array.from(container.getElementsByTagName('script')).forEach(function (e) {
            if (!e.getAttribute('executed')) {
                eval(e.innerHTML);
                e.setAttribute('executed', 'true');
            }
        })
        if (fn) fn();
    });
}

var last;
setInterval(function () {
    if (window.location.hash != last) {
        console.log(last, window.location.hash);
        navigatePage(window.location.hash.substring(1));
        last = window.location.hash;
    }
}, 250);

if (window.location.hash == "" || window.location.hash == "#") {
    window.location.hash = "#login";
}