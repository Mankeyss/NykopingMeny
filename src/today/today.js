const days = ['Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag','Söndag'];
const day = new Date().getDay()-1;
document.getElementById('title-p').innerHTML = days[day];

function handleError() {
    //Handle error
    window.location.href = "";
}

//Retrieve foods
if(day <= 4) {
    //Get html file
    (async function(){
        let info = [];
        await fetch('https://cors.sizable.workers.dev/https://prao.8m.se/mat-at.html', {"method":"get"})
        .then((response) => response.text())
        .then((result) => info.push(JSON.parse(result)))
        .catch((error) => handleError);
    
        await fetch('https://cors.sizable.workers.dev/https://prao.8m.se/mat-hemkop.html', {"method":"get"})
        .then((response) => response.text())
        .then((result) => info.push(result))
        .catch((error) => handleError);
    
        await fetch('https://cors.sizable.workers.dev/https://prao.8m.se/mat-nsu.html', {"method":"get"})
        .then((response) => response.text())
        .then((result) => info.push(result))
        .catch((error) => handleError);

        //Ät.
        const atCode = document.createElement('html');
        atCode.innerHTML = info[0];
        if(day <= 2) {
            atCode.innerHTML = atCode.querySelector(`.left p:nth-child(${day*2})`).innerHTML;
        } else {
            atCode.innerHTML = atCode.querySelector(`.right p:nth-child(${(day-2)*2})`).innerHTML;
        }
        
        const atParagraph = document.createElement('p');
        atParagraph.innerHTML = `<strong>Ät.</strong>`;
        atParagraph.appendChild(atCode);
        document.getElementById('food-container').appendChild(atParagraph);
    
        //Hemköp
        const hemkopText = document.createElement('p');
        
        hemkopText.innerHTML = JSON.parse(info[1])[day];
        
        const hemkopParagraph = document.createElement('p');
        hemkopParagraph.innerHTML = `<strong>Hemköp</strong>`;
        hemkopParagraph.appendChild(hemkopText);
        document.getElementById('food-container').appendChild(hemkopParagraph);


        //NSU
        const nsuCode = document.createElement('p');
        nsuCode.innerHTML = info[2];
        if(day <= 2) {
            nsuCode.innerHTML = nsuCode.querySelector(`.left p:nth-child(${day*2})`).innerHTML;
        } else {
            nsuCode.innerHTML = nsuCode.querySelector(`div p:nth-child(${(day*4)+3})`).innerHTML;
        }
        
        const nsuParagraph = document.createElement('p');
        nsuParagraph.innerHTML = `<strong>Restaurang Skolan</strong>`;
        nsuParagraph.appendChild(nsuCode);
        document.getElementById('food-container').appendChild(nsuParagraph);
    })();
} else {
    //Saturday or sunday
}