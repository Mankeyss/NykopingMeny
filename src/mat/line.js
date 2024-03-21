document.getElementById('nav-bar-line').style.marginLeft = document.getElementById('at-nav-bar-button').offsetLeft - 2 + "px";
document.getElementById('nav-bar-line').style.width = document.getElementById('at-nav-bar-button').clientWidth + 4 + "px";

const parameters = new URLSearchParams(window.location.search);

if(parameters.has('restaurang')) {
    switch(parameters.get('restaurang')) {
        case 'at':
            break;
        case 'hemkop':
            document.getElementById('nav-bar-line').style.marginLeft = document.getElementById('hemkop-nav-bar-button').offsetLeft - 2 + "px";
            document.getElementById('nav-bar-line').style.width = document.getElementById('hemkop-nav-bar-button').clientWidth + 4 + "px";
            break;
        case 'nsu':
            document.getElementById('nav-bar-line').style.marginLeft = document.getElementById('nsu-nav-bar-button').offsetLeft - 2 + "px";
            document.getElementById('nav-bar-line').style.width = document.getElementById('nsu-nav-bar-button').clientWidth + 4 + "px";
            break;
    }
}

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

    setTimeout(function(){
        switch (id) {
            case 'at-nav-bar-button':
                window.location = '?restaurang=at';
                break;
            case 'hemkop-nav-bar-button':
                window.location = '?restaurang=hemkop';
                break;
            case 'nsu-nav-bar-button':
                window.location = '?restaurang=nsu';
                break;
        }
    },200)
}

setTimeout(function(){
    document.getElementById('nav-bar-line').classList.remove('invisible-line');
},500);