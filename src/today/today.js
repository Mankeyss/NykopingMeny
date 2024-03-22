const days = ['Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag','Söndag'];
const day = new Date().getDay()-1;
document.getElementById('title-p').innerHTML = days[day];

function handleError() {
    //Give error message
}

//Retrieve foods
if(day <= 4) {
    //Get html file
    /*fetch('https://cors.sizable.workers.dev/https://prao.8m.se/mat.html', {"method":"post","body":data})
    .then((response) => response.text())
    .then((result) => console.log(result));*/
    (async function(){
        let info = [];
        await fetch('https://cors.sizable.workers.dev/https://prao.8m.se/mat-at.html', {"method":"get"})
        .then((response) => response.text())
        .then((result) => info.push(result))
        .catch((error) => handleError);
    
        await fetch('https://cors.sizable.workers.dev/https://prao.8m.se/mat-hemkop.html', {"method":"get"})
        .then((response) => response.text())
        .then((result) => info.push(result))
        .catch((error) => handleError);
    
        await fetch('https://cors.sizable.workers.dev/https://prao.8m.se/mat-nsu.html', {"method":"get"})
        .then((response) => response.text())
        .then((result) => info.push(result))
        .catch((error) => handleError);
    
        console.log(info)
    
        //Make items visibile
        const atCode = document.createElement('div');
        atCode.innerHTML = info[0];
        if(day <= 2) {
            atCode.innerHTML = atCode.querySelector(`.left p:nth-child(${day*2})`).innerHTML;
        } else {
            atCode.innerHTML = atCode.querySelector(`.right p:nth-child(${(day-2)*2})`).innerHTML;
        }
        console.log(atCode.innerHTML);
        //const p
    })();
} else {
    //Saturday or sunday
}