var container = document.getElementById('container');
document.body.style.backgroundColor = '#2c3338';
document.body.style.color = '#606468';


var last;
window.navigatePage = function (page, fn) {
    window.location.hash = page;
    last = window.location.hash;

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

setInterval(function () {
    if (window.location.hash != last) {
        console.log(last, window.location.hash);
        navigatePage(window.location.hash.substring(1));
    }
}, 250);

if (window.location.hash == "" || window.location.hash == "#") {
    window.location.hash = "#login";
}