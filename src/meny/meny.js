const params = new URLSearchParams(window.location.search)
if(params.has('restaurang')) {
    const restaurang = params.get('restaurang');
    if(restaurang != 'at' && restaurang != 'hemkop' && restaurang != 'NSU') window.location.href = '../home.html';
} else {
    //window.location.href = '../home.html';
}

//Retrieve foods
let time = new Date();

const hour = time.getHours()
console.log(hour);
const timeOfDay = hour >= 16 ? 'dinner' : 'lunch';
console.log(timeOfDay);

var menu;

fetch('../assets/json/mat.json')
  .then(res => res.json())
  .then(data => {
    menu = data[0];
   })
  .then(() => {
    console.log(menu);
   });