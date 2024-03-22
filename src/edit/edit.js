let selectedRestaurant = 'at-nav-bar-button';

document.getElementById('days-form').addEventListener("submit", function(event) {
    event.preventDefault();
    handleSubmit();
})

function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (8-d.getDay())*24*60*60*1000-d.getHours()*60*60*1000);
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function handleSubmit() {
    let restaurant;
    switch (selectedRestaurant) {
        case 'hemkop-nav-bar-button':
            restaurant = 'hemkop';
            break;
    }

    let changedData = [];
    document.getElementById('monday-textarea').value.length > 0 ? changedData.push(document.getElementById('monday-textarea').value): changedData.push('');
    document.getElementById('tuesday-textarea').value.length > 0 ? changedData.push(document.getElementById('tuesday-textarea').value): changedData.push('');
    document.getElementById('wednesday-textarea').value.length > 0 ? changedData.push(document.getElementById('wednesday-textarea').value): changedData.push('');
    document.getElementById('thursday-textarea').value.length > 0 ? changedData.push(document.getElementById('thursday-textarea').value): changedData.push('');
    document.getElementById('friday-textarea').value.length > 0 ? changedData.push(document.getElementById('friday-textarea').value): changedData.push('');

    if(restaurant === null) return;
    //if hemkop
    if(JSON.stringify(getCookie('hemkop')).length > 0) {
        let cookie = JSON.parse(getCookie('hemkop'));
    
        for(i = 0; i < changedData.length; i++) {
            if(changedData[i].length > 0) cookie[i] = changedData[i];
        }
    
        if(JSON.stringify(getCookie('hemkop')).length > 0) {
            setCookie('hemkop', JSON.stringify(cookie))
        }
    }
}