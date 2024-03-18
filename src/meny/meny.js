const params = new URLSearchParams(window.location.search)
if(params.has('restaurang')) {
    const restaurang = params.get('restaurang');
    if(restaurang != 'at' && restaurang != 'hemkop' && restaurang != 'NSU') window.location.href = '../home.html';
} else {
    //window.location.href = '../home.html';
}

let restaurang = params.get('restaurang');

//Set logo
switch(params.get('restaurang')) {
    case 'at':
        document.getElementById('restaurang-icon').src = '../assets/at-logga.png'
        break;
    case 'hemkop':
        document.getElementById('restaurang-icon').src = '../assets/hemköp-logga.png'
        break;
    case 'NSU':
        document.getElementById('restaurang-icon').src = '../assets/NSU-logga.png'
        break;
}

//Retrieve time
let time = new Date();

const hour = time.getHours()
console.log(hour);
const timeOfDay = hour >= 16 ? 'dinner' : 'lunch';
console.log(timeOfDay);



fetch('../assets/json/mat.json')
  .then(res => res.json())
  .then(data => {
    const menu = data[0]["menu"][timeOfDay];
    //Create Item Displays
    menu.forEach(item => {
        //Create Item Div
        const foodItem = document.createElement("div");
        foodItem.classList.add('item');
        document.getElementById('rätter').appendChild(foodItem);

        //Create Food Image
        const foodImage = document.createElement('img');
        foodImage.src = '../assets/food/grilled-chicken.jpg';
        foodImage.classList.add('item-img');
        foodItem.appendChild(foodImage);

        //Create Name Paragraph
        const name = document.createElement('p');
        const nameText = document.createTextNode(item["name"]);
        name.appendChild(nameText)
        name.classList.add('item-name');
        foodItem.appendChild(name);
        
        //Create Price Paragraph
        const price = document.createElement('p');
        const priceText = document.createTextNode(item["price"]);
        price.appendChild(priceText)
        price.classList.add('item-price');
        foodItem.appendChild(price);
    });
   });

if(restaurang == 'hemkop') {
    let test = fetch('http://spelhagenscatering.se', {"mode":"no-cors"}).then((response) => {
            console.log(response.text());
            return response.text();
        }
    );

    console.log(test);

    (async () => {
        const worker = await Tesseract.createWorker('swe');
        const ret = await worker.recognize('http://files.builder.misssite.com/67/bd/67bd64b0-ac82-4204-893f-fd436f1f605a.jpeg');
        console.log(ret.data.text);
        await worker.terminate();
      })();
}