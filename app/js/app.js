/*
____________________________________
/ The index JS file, using babel and \
\ browserify.                       /
------------------------------------
       \   ^__^
        \  (oo)\_______
           (__)\       )\/\
               ||----w |
               ||     ||
*/

import getURLParameter from './modules/geturlparams';

// set defaults
let b = [];
let s = [];
let m = 6;
let y = 2015;
let t = '';
let container = document.querySelector("textarea");


// Get URL arguments if passed
//     b   bounds sw.lng, sw.lat, ne.lng, le.lat
//     m   metric number
//     y   year
//     s   selected
//     t   map title
if (getURLParameter('b') !== 'null') {
    b = getURLParameter('b').split(',');
}
if (getURLParameter('m') !== 'null') {
    m = getURLParameter('m');
}
if (getURLParameter('y') !== 'null') {
    y = getURLParameter('y');
}
if (getURLParameter('s') !== 'null') {
    s = getURLParameter('s').split(",");
}
if (getURLParameter('t') !== 'null') {
    t = getURLParameter('t');
}

// set iframe src
document.querySelector('.embed iframe').src = setURL(m, y, b, s, t);
setEmbed(setURL(m, y, b, s, t), container);

function setURL(m, y, b, s, t) {
    let url = `${window.location.href.substring(0, window.location.href.lastIndexOf("/")) + '/embed.html'}?m=${m}&y=${y}&b=${b}&s=${s}&t=${encodeURI(t)}`;
    return url;
}

function setEmbed(url, con) {
    con.value = `<iframe src="${url}" width="500px" height="600px"></iframe>`;
}

window.titleChange = function (title) {
    t = title;
    document.querySelector("iframe").contentWindow.postMessage(t, '*');
    setEmbed(setURL(m, y, b, s, t), container);
};



window.onmessage = function(e){
    let data = e.data;
    if (data.bounds) {
        b = data.bounds;
    }
    if (data.maptitle) {
        t = data.maptitle;
        document.querySelector("#maptitle").value = t;
    }
    setEmbed(setURL(m, y, b, s, t), container);
};
