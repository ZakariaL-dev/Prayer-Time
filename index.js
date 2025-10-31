const miladiDisplay = document.getElementById("miladi");
const hijriDisplay = document.getElementById("hijri");
const citiesSelector = document.getElementById("cities");
const latitudeDisplay = document.getElementById("lat");
const longitudeDisplay = document.getElementById("long");
const FajrDisplay = document.getElementById("Fajr");
const SunriseDisplay = document.getElementById("Sunrise");
const DhuhrDisplay = document.getElementById("Dhuhr");
const AsrDisplay = document.getElementById("Asr");
const SunsetDisplay = document.getElementById("Sunset");
const MaghribDisplay = document.getElementById("Maghrib");
const IshaDisplay = document.getElementById("Isha");
let data;

citiesSelector.addEventListener('change', prayerExcute);

window.addEventListener('DOMContentLoaded', prayerExcute);

// 
function prayers() {
    return new Promise((resolve, reject) => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = String(today.getFullYear());
        const formattedDate = `${day}-${month}-${year}`;

        const apiUrl = `https://api.aladhan.com/timingsByAddress/${formattedDate}?address=${encodeURIComponent(citiesSelector.value)}`;
        
        axios.get("https://api.allorigins.win/get?url=" + encodeURIComponent(apiUrl))
        .then(function (response) {
            const data = JSON.parse(response.data.contents).data;
            resolve(data);
        })
        .catch(function (error) {
            alert(error);
            reject(error);
        });
    });
}

function prayerExcute(){
    prayers().then((data) => {

        const timings = data.timings;
        let position = data.meta.method.location;

        //today
        const miladi = `${data.date.gregorian.weekday.en}: ${data.date.gregorian.month.en} ${data.date.gregorian.day}, ${data.date.gregorian.year}`;
        const hijri = `${data.date.hijri.weekday.en}: ${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`;

        miladiDisplay.innerHTML = miladi;
        hijriDisplay.innerHTML = hijri;

        // position
        latitudeDisplay.innerHTML = position.latitude.toFixed(2);
        longitudeDisplay.innerHTML = position.longitude.toFixed(2);
                
        //salawat
        FajrDisplay.innerHTML = timings.Fajr;
        SunriseDisplay.innerHTML = timings.Sunrise;
        DhuhrDisplay.innerHTML = timings.Dhuhr;
        AsrDisplay.innerHTML = timings.Asr;
        SunsetDisplay.innerHTML = timings.Sunset;
        MaghribDisplay.innerHTML = timings.Maghrib;
        IshaDisplay.innerHTML = timings.Isha;

    })
    .catch((error) => {
        alert("Prayer times fetch failed:", error);
    });
}

