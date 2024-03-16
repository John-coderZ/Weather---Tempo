date();

document.querySelector('.mode').addEventListener('click',()=>{
    let section = document.querySelector('body');
    if(section){
        section.classList.toggle('dark')
    }
})


document.querySelector(".busca").addEventListener('submit', async (event)=>{
    event.preventDefault();

    input = document.querySelector('#searchInput').value;

    if(input !== ''){

        document.querySelector('.resultado').style.display = 'none';

        imgCase();
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=8fba752b58a3835f409864fe8198cd33&units=metric&lang=pt_br`

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){

            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min
            })

        }else{
            clearInfo();
            showCase('Localização não encontrada')
        }
    }
})
function showInfo(json){
    imgNull();
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C<sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h<span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`;
    document.querySelector('.tempMax').innerHTML = `${json.tempMax} <sup>°C<sup>`;
    document.querySelector('.tempMin').innerHTML = `${json.tempMin} <sup>°C<sup>`;
}
function showCase(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function imgCase(){
    document.querySelector('.aviso img').style.display = 'flex';
}
function imgNull(){
    document.querySelector('.aviso img').style.display = 'none';
}


//horários do dia

function date(){
    let now = new Date();
    let hours = now.getHours();
    let body = document.querySelector('body');

    if(hours >= 6 && hours <= 11){
        body.classList.replace('dark','day');
        document.querySelector('h1').innerHTML = 'Bom Dia'
    }
    if(hours >= 12 && hours <= 17){
        body.classList.replace('dark','day');
        document.querySelector('h1').innerHTML = 'Boa Tarde'
    }
    if(hours >= 18 && hours <= 23){
        body.classList.replace('day','dark');
        document.querySelector('h1').innerHTML = 'Boa Noite'
    }
    if(hours >= 0 && hours <= 6){
        body.classList.replace('day','dark');
        document.querySelector('h1').innerHTML = 'Boa Madrugada'
    }
}

//letras de inicio

const arq = document.querySelector("p");
const text = "Vamos ver o clima de hoje...";
const time = 100;

function showtime(arq,text,time){
    const char = text.split("").reverse();

    const type = setInterval(() => {

    if(!char.length) {
        return clearInterval(type);
    }

    const next = char.pop();

    arq.innerHTML += next;

     }, time);
}
showtime(arq,text,time);