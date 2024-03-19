const params = new URLSearchParams(window.location.search)
if(params.has('restaurang')) {
    const restaurang = params.get('restaurang').toLowerCase();
    if(restaurang != 'at' && restaurang != 'hemkop' && restaurang != 'nsu') window.location.href = '/meny';
} else {
    window.location.href = '/meny';
}

let restaurang = params.get('restaurang');

//Set logo and location
switch(params.get('restaurang')) {
    case 'at':
        document.getElementById('restaurang-icon').src = 'src/assets/at-logga.png'
        document.getElementById('location-button').href = 'https://www.google.com/maps/place/Restaurang+%C3%A4t./@58.7517052,17.0034565,17.54z/data=!4m6!3m5!1s0x465f2d6d8a1f5749:0xeccb616bb5be87e0!8m2!3d58.7516791!4d17.0045203!16s%2Fg%2F11hzsvtp19?entry=ttu';
        break;
    case 'hemkop':
        document.getElementById('restaurang-icon').src = 'src/assets/hemköp-logga.png'
        document.getElementById('location-button').href = 'https://www.google.com/maps/place/Hemk%C3%B6p+Spelhagen/@58.7454867,17.0043087,17z/data=!3m1!4b1!4m6!3m5!1s0x465f2d6895555555:0x2fac3c6ad13d38d9!8m2!3d58.7454867!4d17.0068836!16s%2Fg%2F1q6295007?entry=ttu';
        break;
    case 'nsu':
        document.getElementById('restaurang-icon').src = 'src/assets/NSU-logga.png'
        document.getElementById('location-button').href = 'https://www.google.se/maps/place/Nyk%C3%B6ping+Strand+Utbildningscentrum+AB/@58.7450334,17.0126474,18z/data=!4m6!3m5!1s0x465f2d65ff5e94dd:0xdbc3c5a40d5b0d7b!8m2!3d58.7450266!4d17.0127049!16s%2Fg%2F1hc6xjvk5?entry=ttu';
        break;
}

//Retrieve time
let time = new Date();

const hour = time.getHours()
console.log(hour);
const timeOfDay = hour >= 16 ? 'dinner' : 'lunch';
console.log(timeOfDay);



/*fetch('../assets/json/mat.json')
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
   });*/

   function matchWords(str1, str2) {
    str1 = str1.trim();
    str2 = str2.trim();
    let len = str1.length > str2.length ? str1.length : str2.length;
    let score = 0;
    for(i = 0; i < len; i++) {
      if(str1[i] && str2[i] && str1[i] == str2[i]) score++;
    }
    return score/len;
   }

   function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

if(restaurang == 'hemkop') {
    
    fetch('https://corsproxy.io/?' + encodeURIComponent('http://spelhagenscatering.se'))
      .then((response) => response.text())
      .then((result) => {
        //Create Element
        const code = document.createElement('html');
        code.innerHTML = result;

        //Read image
      (async () => {
        const worker = await Tesseract.createWorker('swe');
        const ret = await worker.recognize(code.querySelector("#page-zones__main .bk-image.imagewidget figure a").href);
        const text = ret.data.text.split(" ");
        console.log(text);
        text.forEach(word=>{
          let veckodagar = ["måndag","tisdag","onsdag","torsdag","fredag"]
          //if(veckodagar.includes(word)) console.log(word, x)
          veckodagar.map(x=>{
            if(similarity(x, word) > 0.4){
              console.log(x, word);
            }}
            //console.log(similarity(word, x), word, x);
            )})
        //Skapa objekt

        await worker.terminate();
      })();
      })
      .catch((error) => console.error(error));

    
} else if(restaurang == 'at') {
  fetch('https://cors.sizable.workers.dev/https://www.restaurang.at/')
      .then((response) => response.text())
      .then((result) => {
        //Create Element
        const code = document.createElement('html');
        code.innerHTML = result;
        code.querySelector('.entry-content').remove();
        code.querySelector('.woocommerce-add-lunches').remove();
        code.querySelector('.lunch-wrapper h2').classList.add('week-h2');
        document.body.appendChild(code.querySelector('.lunch-wrapper h2'));
        const flexDiv = document.createElement('div');
        flexDiv.classList.add('flex-container');
        flexDiv.appendChild(code.querySelector('.lunch-wrapper'))
        document.body.appendChild(flexDiv);
      })
} else if(restaurang == 'nsu') {
  fetch('https://cors.sizable.workers.dev/https://nsutbildning.se/restaurang/')
    .then((response) => response.text())
    .then((result) => {
      //Create Element
      const code = document.createElement('html');
      code.innerHTML = result;
      const menuPart = code.querySelector(".page-content section:nth-child(5) .row .row div .spb_wrapper");
      code.remove();
      menuPart.querySelector('h3').remove();
      menuPart.querySelector('ul').remove();
      for(i = 0; i < 10; i++) {
        menuPart.querySelector('p:last-child').remove();
      }
      menuPart.querySelector('p:first-child').remove();
      menuPart.querySelector('p:first-child').classList.add('week-h2');

      menuPart.classList.add('lunch-wrapper')
      const leftDiv = document.createElement('div');
      const rightDiv = document.createElement('div');
      leftDiv.classList.add('lunch-block');
      rightDiv.classList.add('lunch-block');
      leftDiv.classList.add('right');
      rightDiv.classList.add('left');

      let secondPart = false;
      menuPart.firstChild.classList.add('nsu-week')
      document.body.appendChild(menuPart.childNodes[0])
      for(i = 0; i < menuPart.childNodes.length; i++) {
        if(menuPart.childNodes[i].innerHTML.startsWith('<em>')) {
        }
        console.log(menuPart.childNodes[i].childNodes);
          let latestDay = null;
          let latestDayInt = 0;
          while (menuPart.childNodes.length > 1) {
            if(menuPart.childNodes[0].innerHTML.startsWith('<strong>')) {
              if(latestDayInt == 3) secondPart = true;
              latestDayInt++;
              latestDay = menuPart.childNodes[0];
              if(!secondPart) {
                leftDiv.appendChild(menuPart.childNodes[0]);
              } else {
                rightDiv.appendChild(menuPart.childNodes[0]);
              }
            } else {
              latestDay.appendChild(menuPart.childNodes[0]);
            }
            
          }
      menuPart.appendChild(leftDiv);
      menuPart.appendChild(rightDiv);
      menuPart.querySelector('p:first-child').remove();
      document.body.appendChild(menuPart);
    }})
}