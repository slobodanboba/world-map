import React from 'react';
import '../stylesheets/style.css';


class Map extends React.Component {
  constructor(props) {
    super(props)
    let imageTime = 0;
    let worldPlace = '';
    let countryShortName = '';
    let suffix = "px";
    let savedcities = [];
    let wheatherAllWorld = 0;
    let weatherAllWorldF = 0;
    let offsetWorld = '';
    let wheatherIconWorld = '';
    let zoombool = false;
    let maxlat = 0;
    let minlon = 0;
    let maxColumn = 0;
    let maxRow = 0;
    let day = '';
    let curentDay = 0;
    let image = document.querySelector(".world-map");
    let images = document.querySelectorAll('.img');
    let zoomedpic = document.querySelector('.zoomed');
    let curentHour = 0;
    let curentMin = 0;
    let offsetHoursWorld = 0;
    let guadalajaraHours = 0;
    let curentHourWorld = 0;
    let imageLat = 0;
    let imageLon = 0;
    let imageLatRound = 0;
    let imageLonRound = 0;
    let index = 0;
  }


getLatLonZoom(e) {
    if(this.zoombool) {
      const {imageOffsetTop, imageOffsetLeft} = this.scroll();
      const { heightDevider, widthDevider } = this.getWidthHeight();
      let positionYZoom = e.pageY - imageOffsetTop;
      let positionXZoom = e.pageX - imageOffsetLeft;
      let imageLatZoom = (this.maxlat) - ((positionYZoom/heightDevider) * 0.18);
      let imageLonZoom = ((positionXZoom/widthDevider) * 0.36 - (-this.minlon));
      this.imageLat = imageLatZoom;
      this.imageLon = imageLonZoom;
      this.imageLatRound = imageLatZoom.toFixed(2);
      this.imageLonRound = imageLonZoom.toFixed(2);
      let imageLat = this.imageLat;
      let imageLon = this.imageLon;
      let imageLatRound = this.imageLatRound;
      let imageLonRound = this.imageLonRound;
      return {imageLat, imageLon, imageLatRound, imageLonRound}
    }
  }

getLatLon(e) {
    if(!this.zoombool) {
      const {imageOffsetTop, imageOffsetLeft} = this.scroll();
      const { heightDevider, widthDevider } = this.getWidthHeight();
      let positionY = e.pageY - imageOffsetTop;
      let positionX = e.pageX - imageOffsetLeft;
      this.imageLat = (50 - positionY/heightDevider) * 1.8;
      this.imageLon = (positionX/widthDevider - 50) * 3.6;
      this.imageLatRound = this.imageLat.toFixed(2);
      this.imageLonRound = this.imageLon.toFixed(2);
      let imageLat = this.imageLat;
      let imageLon = this.imageLon;
      let imageLatRound = this.imageLatRound;
      let imageLonRound = this.imageLonRound;
      return {imageLat, imageLon, imageLatRound, imageLonRound}
    }
  }

displayLonLat(e) {
    if(!this.zoombool) {
      this.getWidthHeight();
      const {imageLatRound, imageLonRound} = this.getLatLon(e);
      document.documentElement.style.setProperty("--pageX", e.pageX + this.suffix);
      document.documentElement.style.setProperty(`--pageY`, e.pageY + this.suffix);
      document.querySelector('.spanLat').innerHTML = imageLatRound;
      document.querySelector('.spanLon').innerHTML = imageLonRound;
    }
  }

displayZoomed(e) {
    if(this.zoombool) {
      this.getWidthHeight();
      const {imageLatRound, imageLonRound} = this.getLatLonZoom(e);
      document.documentElement.style.setProperty("--pageX", e.pageX + this.suffix);
      document.documentElement.style.setProperty(`--pageY`, e.pageY + this.suffix);
      document.querySelector('.spanLat').innerHTML = imageLatRound;
      document.querySelector('.spanLon').innerHTML = imageLonRound;
    }
  }




displayOn() {
    if (!window.matchMedia("(max-width: 1000px)").matches) {
      document.querySelector('.movingDiv').style.display = "block";
    }
  }

displayOff() {
    document.querySelector('.movingDiv').style.display = "none";
  }

zoom (e) {
    if(e.ctrlKey || e.shiftKey) {
      this.getWidthHeight();
      this.zoomedpic.style.backgroundImage = `url(./images/img${e.target.id}.jpg)`;
      this.zoomedpic.style.display = "grid";
      this.maxRow = Math.floor(e.target.id/10);
      this.maxlat = (90 - (this.maxRow  * 18));
      this.maxColumn = (e.target.id%10);
      this.minlon = this.maxColumn * 36 - 180;
      this.zoombool = true;
    }};


zoomout(e) {
      if(e.ctrlKey || e.shiftKey) {
        this.getWidthHeight();
        this.zoomedpic.style.display = "none";
        this.zoombool = false;
      }
    }


getWidthHeight() {
      let theCSSpropWidth = window.getComputedStyle(this.image,null).getPropertyValue("width");
      let imageWidth = parseInt(theCSSpropWidth);
      let varHeight = imageWidth/2;
      document.documentElement.style.setProperty("--height", varHeight + this.suffix);
      let theCSSpropHeight = window.getComputedStyle(this.image,null).getPropertyValue("height");
      let imageHeight = parseInt(theCSSpropHeight);
      let listHeight = imageHeight - 100;
      console.log("listHeight",listHeight);
      document.documentElement.style.setProperty("--listHeight", listHeight + this.suffix);
      let heightDevider = imageHeight/100;
      let widthDevider = imageWidth/100;
      return { heightDevider, widthDevider }
    }


scroll() {
      this.getWidthHeight();
      let imageOffsetTop = this.image.offsetTop;
      let imageOffsetLeft = this.image.offsetLeft;
      return {imageOffsetTop, imageOffsetLeft}
    }



 getAllData(e) {
      if(!e.ctrlKey) {
        this.getLatLon(e);
        this.getLatLonZoom(e);
        fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.imageLat},${this.imageLon}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc `)
        .then(response => response.json())
        .then(cityName => {
          this.worldPlace = cityName.results[0].address_components[1].short_name;
          document.querySelector(".cityCorner1000").innerHTML = `${this.worldPlace}`;
        })
        fetch(` https://maps.googleapis.com/maps/api/timezone/json?location=${this.imageLat},${this.imageLon}&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY `)
        .then(response => response.json())
        .then(world =>  this.offsetWorld = world.rawOffset)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.imageLat}&lon=${this.imageLon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`)
        .then(response => response.json())
        .then(data => {
          this.wheatherAllWorld = data.main.temp ;
          this.weatherAllWorldF = (this.wheatherAllWorld * 1.8)+32;
          this.wheatherIconWorld = data.weather[0].icon;
        })
        .then(() => {
          const timeWorld = new Date().getHours()
          const dayNow = new Date().getDay()
          const offsetHours = (this.offsetWorld/3600);
          if ((offsetHours + timeWorld + this.guadalajaraHours + 1) > 23) {
            this.curentDay = dayNow + 1
          } else if ((offsetHours + timeWorld + this.guadalajaraHours + 1) < 0) {
            this.curentDay = dayNow - 1
          } else {
            this.curentDay = dayNow
          }
          switch (this.curentDay) {
            case 0:
            this.day = "Sunday";
            break;
            case 1:
            this.day = "Monday";
            break;
            case 2:
            this.day = "Tuesday";
            break;
            case 3:
            this.day = "Wednesday";
            break;
            case 4:
            this.day = "Thursday";
            break;
            case 5:
            this.day = "Friday";
            break;
            case 6:
            this.day = "Saturday";
          }
        })
        .then(() => {
          document.querySelector('.movingDivmax1000').style.display = "block";
          document.querySelector('.spanLat1000').innerHTML = this.imageLat.toFixed(2);
          document.querySelector('.spanLon1000').innerHTML = this.imageLon.toFixed(2);
          document.querySelector('.cornerTemp1000').innerHTML = Math.round(this.wheatherAllWorld) + "C";
          document.querySelector('.cornerTempF1000').innerHTML = Math.round(this.weatherAllWorldF) + "F";
          document.querySelector('.cornerDay1000').innerHTML = this.day;
          const nowWorld = new Date();
          const minsWorld = nowWorld.getMinutes() < 10 ? "0" + nowWorld.getMinutes() : nowWorld.getMinutes();
          this.curentMin = minsWorld;
          let hourWorld = nowWorld.getHours();
          this.offsetHoursWorld = (this.offsetWorld / 3600);
          const d = new Date();
          const guadalajaraOffsetHours = d.getTimezoneOffset();
          this.guadalajaraHours = (guadalajaraOffsetHours / 60);
          this.curentHourWorld = Math.floor(hourWorld + this.offsetHoursWorld + this.guadalajaraHours + 1);
          this.curentHourWorld =this.curentHourWorld < 10 ? "0" + this.curentHourWorld : this.curentHourWorld;
          if (this.curentHourWorld >= 24) {
            let nextDay = this.curentHourWorld - 24
            document.querySelector(".hoursWorld").innerHTML = `${nextDay}`;
            this.curentHour = nextDay;
          }
          else if (this.curentHourWorld < 0) {
            let previousDay = this.curentHourWorld + 24
            document.querySelector(".hoursWorld").innerHTML = `${previousDay}`;
            this.curentHour = previousDay;
          }
          else {
            document.querySelector(".hoursWorld").innerHTML = `${this.curentHourWorld}`;
            this.curentHour = this.curentHourWorld;
          }
          document.querySelector(".minutesWorld").innerHTML = `:${minsWorld}h`;
        })
        .then(() => {
          fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.imageLat},${this.imageLon}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc `)
          .then(response => response.json())
          .then((cityName , i) => {
               console.log('cityName', cityName);
            if (cityName.results[0] == undefined || cityName.results[0].address_components[1] == undefined) {
              this.worldPlace = 'MISSING PLACE NAME';
              document.querySelector(".World-city").innerHTML = `${this.worldPlace}`;
              this.countryShortName = '';
              document.querySelector(".World-countrey").innerHTML = `${this.countryShortName}`;
              let index = this.index;
              let worldPlace = this.worldPlace;
              let countryShortName = this.countryShortName;
              let wheatherAllWorld = this. wheatherAllWorld;
              let weatherAllWorldF = this.weatherAllWorldF;
              let day = this.day;
              let curentHour = this.curentHour;
              let curentMin = this.curentMin;
              let imageLatRound = this.imageLatRound;
              let imageLonRound = this.imageLonRound;
              let wheatherIconWorld = this.wheatherIconWorld;
              const placeNameLi = { index, worldPlace,  countryShortName , wheatherAllWorld , weatherAllWorldF, day, curentHour , curentMin , imageLatRound , imageLonRound , wheatherIconWorld};
              this.index++
              this.savedcities.push(placeNameLi);
              const savedList = document.querySelector('.list');
              savedList.innerHTML = this.savedcities.sort((a,b) => b.index - a.index).map(city => {
                return `
                <li>
                <input type="checkbox" data-index=${i} id="item${i}"> <span> ${city.worldPlace} ${city.countryShortName}</span>
                <span>    ${Math.round(city.wheatherAllWorld)}C|   ${Math.round(city.weatherAllWorldF)}F  ${city.day} ${city.curentHour}:${city.curentMin}h</span><img class="icon-AllWorld" src="./content/${city.wheatherIconWorld}.png" width="70px" height="70px">
                <span class="textAlighnRight"> Lat:${city.imageLatRound} Lon:${city.imageLonRound} </span>
                </li>
                `;
              }).join('');
            } else if (cityName.results[0].address_components[3] == undefined)  {
              worldPlace = cityName.results[0].address_components[1].short_name ;
              document.querySelector(".World-city").innerHTML = `${this.worldPlace}`;
              this.countryShortName = '';
              document.querySelector(".World-countrey").innerHTML = `${countryShortName}`;
              let index = this.index;
              let worldPlace = this.worldPlace;
              let countryShortName = this.countryShortName;
              let wheatherAllWorld = this. wheatherAllWorld;
              let weatherAllWorldF = this.weatherAllWorldF;
              let day = this.day;
              let curentHour = this.curentHour;
              let curentMin = this.curentMin;
              let imageLatRound = this.imageLatRound;
              let imageLonRound = this.imageLonRound;
              let wheatherIconWorld = this.wheatherIconWorld;
              const placeNameLi = {index, worldPlace,  countryShortName , wheatherAllWorld , weatherAllWorldF , day , curentHour , curentMin ,  imageLatRound , imageLonRound , wheatherIconWorld};
              this.index++
              this.savedcities.push(placeNameLi);
              const savedList = document.querySelector('.list');
              savedList.innerHTML = this.savedcities.sort((a,b) => b.index - a.index).map((city, i) => {
                return `
                <li>
                <input type="checkbox" data-index=${i} id="item${i}"> <span> ${city.worldPlace} ${city.countryShortName} </span>
                <span>  ${Math.round(city.wheatherAllWorld)}C|   ${Math.round(city.weatherAllWorldF)}F  ${city.day} ${city.curentHour}:${city.curentMin}h</span><img class="icon-AllWorld" src="./content/${city.wheatherIconWorld}.png" width="70px" height="70px">
                <span class="textAlighnRight"> Lat:${city.imageLatRound} Lon:${city.imageLonRound} </span>
                </li>
                `;
              }).join('');
            } else  {
              this.worldPlace = cityName.results[0].address_components[1].short_name;
              document.querySelector(".World-city").innerHTML = `${this.worldPlace}` ;
              this.countryShortName = cityName.results[0].address_components[3].short_name;
              document.querySelector(".World-countrey").innerHTML = `${this.countryShortName}`;
              let index = this.index;
              let worldPlace = this.worldPlace;
              let countryShortName = this.countryShortName;
              let wheatherAllWorld = this. wheatherAllWorld;
              let weatherAllWorldF = this.weatherAllWorldF;
              let day = this.day;
              let curentHour = this.curentHour;
              let curentMin = this.curentMin;
              let imageLatRound = this.imageLatRound;
              let imageLonRound = this.imageLonRound;
              let wheatherIconWorld = this.wheatherIconWorld;
              const placeNameLi = {index, worldPlace,  countryShortName , wheatherAllWorld , weatherAllWorldF , day , curentHour , curentMin,  imageLatRound , imageLonRound , wheatherIconWorld};
              this.index++
              this.savedcities.push(placeNameLi);
              const savedList = document.querySelector('.list');
              savedList.innerHTML = this.savedcities.sort((a,b) => b.index - a.index).map(city => {
                return `
                <li>
                <input type="checkbox" data-index=${i} id="item${i}"> <span> ${city.worldPlace} ${city.countryShortName}</span>
                <span>  ${Math.round(city.wheatherAllWorld)}C|   ${Math.round(city.weatherAllWorldF)}F  ${city.day} ${city.curentHour}:${city.curentMin}h</span><img class="icon-AllWorld" src="./content/${city.wheatherIconWorld}.png" width="70px" height="70px">
                <span class="textAlighnRight"> Lat:${city.imageLatRound} Lon:${city.imageLonRound} </span>
                </li>
                `;
              }).join('');
              console.log(savedList);
            }
          })
        });
      }
    }


componenWillMount () {
    this.getWidthHeight();
    this.scroll();
}

    componentDidMount ()  {

      let image = document.querySelector(".world-map");
      let images = document.querySelectorAll('.img');
      let zoomedpic = document.querySelector('.zoomed');
      image.addEventListener("click", this.getAllData);
      window.addEventListener("scroll", this.scroll);
      zoomedpic.addEventListener("click", this.zoomout);
      zoomedpic.addEventListener('click', this.displayZoomed);
      zoomedpic.addEventListener('mousemove', this.displayZoomed);
      image.addEventListener("mousemove", this.displayLonLat);
      image.addEventListener("click", this.displayLonLat);
      image.addEventListener("mouseover", this.displayOn);
      image.addEventListener("mouseout", this.displayOff);
      images.forEach(option => option.addEventListener('click', this.zoom));

    }


  render() {

      return (
        <div class="body-container">
      <div class="clock World-clock">
        <div class="clock-face">
          <div class="hand hour-hand hour-handWorld"></div>
          <div class="hand min-hand min-handWorld"></div>
          <div class="hand second-hand second-handWorld"></div>
          <div class="dot-center"></div>
          <div class="hours hour3"></div>
          <div class="hours hour6"></div>
          <div class="hours hour9"></div>
          <div class="hours hour12"></div>
          <div class="World-names"><span class="World-city">World</span><span class="World-countrey"></span></div>
        </div>
        <div class="temp-info tempAllWorld"><span class="text-london"/><span class="temp temp-AllWorld"></span><span>°C</span>|<span class="temp tempF-AllWorld"></span><span>°F</span><div class="temp day-AllWorld"></div></div>
       <div class="icons icon-AllWorld"></div>
      </div>
      <div class="world-map">
            <div class="img img1" id="0" data-minlon="" data-maxlat=""></div>
            <div class="img img1" id="1" data-minlon="" data-maxlat=""></div>
            <div class="img img2" id="2" data-minlon="" data-maxlat=""></div>
            <div class="img img3" id="3" data-minlon="" data-maxlat=""></div>
            <div class="img img4" id="4" data-minlon="" data-maxlat=""></div>
            <div class="img img5" id="5" data-minlon="" data-maxlat=""></div>
            <div class="img img6" id="6" data-minlon="" data-maxlat=""></div>
            <div class="img img7" id="7" data-minlon="" data-maxlat=""></div>
            <div class="img img8" id="8" data-minlon="" data-maxlat=""></div>
            <div class="img img9" id="9" data-minlon="" data-maxlat=""></div>
            <div class="img img10" id="10" data-minlon="" data-maxlat=""></div>
            <div class="img img11" id="11" data-minlon="" data-maxlat=""></div>
            <div class="img img12" id="12" data-minlon="" data-maxlat=""></div>
            <div class="img img13" id="13" data-minlon="" data-maxlat=""></div>
            <div class="img img14" id="14" data-minlon="" data-maxlat=""></div>
            <div class="img img15" id="15" data-minlon="" data-maxlat=""></div>
            <div class="img img16" id="16" data-minlon="" data-maxlat=""></div>
            <div class="img img17" id="17" data-minlon="" data-maxlat=""></div>
            <div class="img img18" id="18" data-minlon="" data-maxlat=""></div>
            <div class="img img19" id="19" data-minlon="" data-maxlat=""></div>
            <div class="img img20" id="20" data-minlon="" data-maxlat=""></div>
            <div class="img img21" id="21" data-minlon="" data-maxlat=""></div>
            <div class="img img22" id="22" data-minlon="" data-maxlat=""></div>
            <div class="img img23" id="23" data-minlon="" data-maxlat=""></div>
            <div class="img img24" id="24" data-minlon="" data-maxlat=""></div>
            <div class="img img25" id="25" data-minlon="" data-maxlat=""></div>
            <div class="img img26" id="26" data-minlon="" data-maxlat=""></div>
            <div class="img img27" id="27" data-minlon="" data-maxlat=""></div>
            <div class="img img28" id="28" data-minlon="" data-maxlat=""></div>
            <div class="img img29" id="29" data-minlon="" data-maxlat=""></div>
            <div class="img img30" id="30" data-minlon="" data-maxlat=""></div>
            <div class="img img31" id="31" data-minlon="" data-maxlat=""></div>
            <div class="img img32" id="32" data-minlon="" data-maxlat=""></div>
            <div class="img img33" id="33" data-minlon="" data-maxlat=""></div>
            <div class="img img34" id="34" data-minlon="" data-maxlat=""></div>
            <div class="img img35" id="35" data-minlon="" data-maxlat=""></div>
            <div class="img img36" id="36" data-minlon="" data-maxlat=""></div>
            <div class="img img37" id="37" data-minlon="" data-maxlat=""></div>
            <div class="img img38" id="38" data-minlon="" data-maxlat=""></div>
            <div class="img img39" id="39" data-minlon="" data-maxlat=""></div>
            <div class="img img40" id="40" data-minlon="" data-maxlat=""></div>
            <div class="img img41" id="41" data-minlon="" data-maxlat=""></div>
            <div class="img img42" id="42" data-minlon="" data-maxlat=""></div>
            <div class="img img43" id="43" data-minlon="" data-maxlat=""></div>
            <div class="img img44" id="44" data-minlon="" data-maxlat=""></div>
            <div class="img img45" id="45" data-minlon="" data-maxlat=""></div>
            <div class="img img46" id="46" data-minlon="" data-maxlat=""></div>
            <div class="img img47" id="47" data-minlon="" data-maxlat=""></div>
            <div class="img img48" id="48" data-minlon="" data-maxlat=""></div>
            <div class="img img49" id="49" data-minlon="" data-maxlat=""></div>
            <div class="img img50" id="50" data-minlon="" data-maxlat=""></div>
            <div class="img img51" id="51" data-minlon="" data-maxlat=""></div>
            <div class="img img52" id="52" data-minlon="" data-maxlat=""></div>
            <div class="img img53" id="53" data-minlon="" data-maxlat=""></div>
            <div class="img img54" id="54" data-minlon="" data-maxlat=""></div>
            <div class="img img55" id="55" data-minlon="" data-maxlat=""></div>
            <div class="img img56" id="56" data-minlon="" data-maxlat=""></div>
            <div class="img img57" id="57" data-minlon="" data-maxlat=""></div>
            <div class="img img58" id="58" data-minlon="" data-maxlat=""></div>
            <div class="img img59" id="59" data-minlon="" data-maxlat=""></div>
            <div class="img img60" id="60" data-minlon="" data-maxlat=""></div>
            <div class="img img61" id="61" data-minlon="" data-maxlat=""></div>
            <div class="img img62" id="62" data-minlon="" data-maxlat=""></div>
            <div class="img img63" id="63" data-minlon="" data-maxlat=""></div>
            <div class="img img64" id="64" data-minlon="" data-maxlat=""></div>
            <div class="img img65" id="65" data-minlon="" data-maxlat=""></div>
            <div class="img img66" id="66" data-minlon="" data-maxlat=""></div>
            <div class="img img67" id="67" data-minlon="" data-maxlat=""></div>
            <div class="img img68" id="68" data-minlon="" data-maxlat=""></div>
            <div class="img img69" id="69" data-minlon="" data-maxlat=""></div>
            <div class="img img70" id="70" data-minlon="" data-maxlat=""></div>
            <div class="img img71" id="71" data-minlon="" data-maxlat=""></div>
            <div class="img img72" id="72" data-minlon="" data-maxlat=""></div>
            <div class="img img73" id="73" data-minlon="" data-maxlat=""></div>
            <div class="img img74" id="74" data-minlon="" data-maxlat=""></div>
            <div class="img img75" id="75" data-minlon="" data-maxlat=""></div>
            <div class="img img76" id="76" data-minlon="" data-maxlat=""></div>
            <div class="img img77" id="77" data-minlon="" data-maxlat=""></div>
            <div class="img img78" id="78" data-minlon="" data-maxlat=""></div>
            <div class="img img79" id="79" data-minlon="" data-maxlat=""></div>
            <div class="img img80" id="80" data-minlon="" data-maxlat=""></div>
            <div class="img img81" id="81" data-minlon="" data-maxlat=""></div>
            <div class="img img82" id="82" data-minlon="" data-maxlat=""></div>
            <div class="img img83" id="83" data-minlon="" data-maxlat=""></div>
            <div class="img img84" id="84" data-minlon="" data-maxlat=""></div>
            <div class="img img85" id="85" data-minlon="" data-maxlat=""></div>
            <div class="img img86" id="86" data-minlon="" data-maxlat=""></div>
            <div class="img img87" id="87" data-minlon="" data-maxlat=""></div>
            <div class="img img88" id="88" data-minlon="" data-maxlat=""></div>
            <div class="img img89" id="89" data-minlon="" data-maxlat=""></div>
            <div class="img img90" id="90" data-minlon="" data-maxlat=""></div>
            <div class="img img91" id="91" data-minlon="" data-maxlat=""></div>
            <div class="img img92" id="92" data-minlon="" data-maxlat=""></div>
            <div class="img img93" id="93" data-minlon="" data-maxlat=""></div>
            <div class="img img94" id="94" data-minlon="" data-maxlat=""></div>
            <div class="img img95" id="95" data-minlon="" data-maxlat=""></div>
            <div class="img img96" id="96" data-minlon="" data-maxlat=""></div>
            <div class="img img97" id="97" data-minlon="" data-maxlat=""></div>
            <div class="img img98" id="98" data-minlon="" data-maxlat=""></div>
            <div class="img img99" id="99" data-minlon="" data-maxlat=""></div>
            <div class="zoomed"></div>
      </div>
      <div class="wrapper">
        <h2>RECENT PLACES</h2>
        <p></p>
        <ul class="list">
        </ul>
      </div>
        <div class="movingDiv">
          <div class="movingLat">
            <span class="LonLat">Lat:</span><span class="LonLat spanLat"></span>
          </div>
          <div class="movingLong">
            <span class="LonLat cityCorner"></span>
            <span class="LonLat">Lon:</span><span class="LonLat spanLon"></span>
          </div>
          <div>
            <span class="LonLat cornerTemp"></span><span class="LonLat cornerTempF"></span>
          </div>
          <span class="LonLat cornerDay"></span>
        </div>

        <div class="movingDivmax1000">
          <div>
            <span class="LonLat cityCorner1000"></span>
          </div>
          <div class="movingLat1000">
            <span class="LonLat">Lat:</span>
            <span class="LonLat spanLat1000"></span>
          </div>
          <div class="movingLong1000">
            <span class="LonLat">Lon:</span>
            <span class="LonLat spanLon1000"></span>
          </div>
          <div>
            <span class="LonLat cornerTemp1000"></span><span class="LonLat cornerTempF1000"></span>
          </div>
          <div>
            <span class="LonLat cornerDay1000"></span>
            <span class="hoursWorld"></span>:<span class="minutesWorld"/>
          </div>
        </div>
      </div>
        )
    }
 }


export default Map;
