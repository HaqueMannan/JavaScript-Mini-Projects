window.addEventListener('load', () => {
   let long;
   let lat;
   let temperatureDescription = document.querySelector('.temperature-description');
   let temperatureDegree = document.querySelector('.temperature-degree');
   let locationTimezone = document.querySelector('.location-timezone');
   let temperatureSelection = document.querySelector('.temperature');
   const temperatureSpan = document.querySelector('.temperature span')

   if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
         long = position.coords.longitude;
         lat = position.coords.latitude;

         const proxy = 'https://cors-anywhere.herokuapp.com/';
         const api = `${proxy}https://api.darksky.net/forecast/15223f637709159cfe5581b61acda902/${lat},${long}`

         fetch(api)
            .then(response => {
               return response.json();
            })
            .then(data => {
               // console.log(data);      -> VIEW API JSON OBJECT
               const { temperature, summary, icon } = data.currently;

               // SET DOM ELEMENTS FROM API
               temperatureDegree.textContent = temperature;
               temperatureDescription.textContent = summary
               locationTimezone.textContent = data.timezone;

               // SET ICON
               setIcons(icon, document.querySelector('.icon'));

               // FORMULA FOR CELSIUS
               let celsius = (temperature - 32) * (5/9);

               // CHANGE TEMPERATURE TO CELSIUS/FAHRENHEIT
               temperatureSelection.addEventListener('click', () => {
                  if(temperatureSpan.textContent === "F") {
                     temperatureDegree.textContent = Math.floor(celsius);
                     temperatureSpan.textContent = "C";
                  } else {
                     temperatureDegree.textContent = temperature;
                     temperatureSpan.textContent = "F";
                  };
               });
            });
      });
   };

   function setIcons(icon, iconID) {
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
   };
});