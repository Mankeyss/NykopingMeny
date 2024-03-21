document.getElementById('nav-bar-line').style.marginLeft = document.getElementById('at-nav-bar-button').offsetLeft - 2 + "px";
document.getElementById('nav-bar-line').style.width = document.getElementById('at-nav-bar-button').clientWidth + 4 + "px";

document.getElementById('at-nav-bar-button').addEventListener("click", function(e) {
    e.preventDefault();
    changePos('at-nav-bar-button');
})

document.getElementById('hemkop-nav-bar-button').addEventListener("click", function(e) {
    e.preventDefault();
    changePos('hemkop-nav-bar-button');
})

document.getElementById('nsu-nav-bar-button').addEventListener("click", function(e) {
    e.preventDefault();
    changePos('nsu-nav-bar-button');
})

function changePos(id) {
    document.getElementById('nav-bar-line').style.marginLeft = document.getElementById(id).offsetLeft - 2 + "px";
    document.getElementById('nav-bar-line').style.width = document.getElementById(id).clientWidth + 4 + "px";
}