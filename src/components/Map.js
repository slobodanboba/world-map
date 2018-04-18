import React from 'react';
import '../stylesheets/style.css';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageTime: 0,
      worldPlace: '',
      countryShortName: '',
      suffix: "px",
      savedcities: [],
      wheatherAllWorld: 0,
      wheatherAllWorldF: 0,
      offsetWorld: 0,
      wheatherIconWorld: '',
      zoombool: false,
      maxlat: 0,
      minlon: 0,
      maxColumn: 0,
      maxRow: 0,
      day: '',
      curentDay: 0,
      curentHour: 0,
      curentMin: 0,
      offsetHoursWorld: 0,
      guadalajaraHours: 0,
      curentHourWorld: 0,
      imageLat: 0,
      imageLon: 0,
      imageLatRound: 0,
      imageLonRound: 0,
      index: 0,
      imageOffsetTop: 0,
      imageOffsetLeft: 0,
      icon: "",
    };
    console.log(this.state);
  }
  //
  // image: document.querySelector(".world-map"),
  // images: document.querySelectorAll('.img'),
  // zoomedpic: document.querySelector('.zoomed'),


  getLatLonZoom = (e) => {
    if(this.state.zoombool) {
      this.scroll();
      this.getWidthHeight();
      let positionYZoom = e.pageY - this.state.imageOffsetTop;
      let positionXZoom = e.pageX - this.state.imageOffsetLeft;
      let imageLatZoom = (this.maxlat) - ((positionYZoom/this.state.heightDevider) * 0.18);
      let imageLonZoom = ((positionXZoom/this.state.widthDevider) * 0.36 - (-this.state.minlon));
      console.log(imageLatZoom);
      this.setState(() => ({
        imageLat: imageLatZoom,
        imageLon: imageLatZoom,
        imageLatRound: imageLatZoom,
        imageLonRound: imageLatZoom,
      }));
    }
  }

  getLatLon = (e) => {
    if(!this.state.zoombool) {
      this.scroll(e);
      this.getWidthHeight(e);
      let positionY = e.pageY - this.state.imageOffsetTop;
      let positionX = e.pageX - this.state.imageOffsetLeft;
      let imageLatLet = (50 - positionY/this.state.heightDevider) * 1.8;
      let imageLonLet = (positionX/this.state.widthDevider - 50) * 3.6;
      let imageLatRoundLet = imageLatLet.toFixed(2);
      let imageLonRoundLet = imageLonLet.toFixed(2);
      this.setState(() => ({
        imageLat: imageLatLet,
        imageLon: imageLonLet,
        imageLatRound: imageLatRoundLet,
        imageLonRound: imageLonRoundLet,
      }));
      return { imageLatLet, imageLonLet, imageLatRoundLet, imageLonRoundLet }
    }
  }

  displayLonLat = (e) => {
    this.getWidthHeight(e);
    if(!this.state.zoombool) {
      this.getLatLon(e);
      document.documentElement.style.setProperty("--pageX", e.pageX + this.state.suffix);
      document.documentElement.style.setProperty(`--pageY`, e.pageY + this.state.suffix);
      document.querySelector('.spanLat').innerHTML = this.state.imageLatRound;
      document.querySelector('.spanLon').innerHTML = this.state.imageLonRound;
    }
  }

  displayZoomed = (e) => {
    this.getWidthHeight(e);
    if(this.state.zoombool) {
      this.getLatLon(e);
      document.documentElement.style.setProperty("--pageX", e.pageX + this.state.suffix);
      document.documentElement.style.setProperty(`--pageY`, e.pageY + this.state.suffix);
      document.querySelector('.spanLat').innerHTML = this.state.imageLatRound;
      document.querySelector('.spanLon').innerHTML = this.state.imageLonRound;
    }
  }

  displayOn = () => {
    if (!window.matchMedia("(max-width: 1000px)").matches) {
      document.querySelector('.movingDiv').style.display = "block";
    }
  }

  displayOff = () => {
    document.querySelector('.movingDiv').style.display = "none";
  }

  zoom  = (e) => {
    if(e.ctrlKey || e.shiftKey) {
      this.getWidthHeight();
      console.log("zooooooooooooom", e.target.id);
      document.querySelector('.zoomed').style.backgroundImage = `url(../images/img${e.target.id}.jpg)`;
      document.querySelector('.zoomed').style.display = "block";
      this.setState(() => ({
        maxRow: Math.floor(e.target.id/10),
        maxlat: (90 - (this.maxRow  * 18)),
        maxColumn: (e.target.id%10),
        minlon: this.maxColumn * 36 - 180,
        zoombool: true,
      }));
    }};

    zoomout = (e) => {
      if(e.ctrlKey || e.shiftKey) {
        this.getWidthHeight();
        this.zoomedpic.style.display = "none";
        this.setState(() => ({
            zoombool: false,
        }));
      }
    }

    getWidthHeight = () => {
          this.addEventListener();
      let image = document.querySelector(".world-map");
      let theCSSpropWidth = window.getComputedStyle(image,null).getPropertyValue("width");
      let imageWidth = parseInt(theCSSpropWidth);
      let varHeight = imageWidth/2;
      document.documentElement.style.setProperty("--height", varHeight + this.state.suffix);
      let theCSSpropHeight = window.getComputedStyle(image,null).getPropertyValue("height");
      let imageHeight = parseInt(theCSSpropHeight);
      let listHeight = imageHeight - 100;
      document.documentElement.style.setProperty("--listHeight", listHeight + this.state.suffix);
      let heightDevider = imageHeight/100;
      let widthDevider = imageWidth/100;
      this.setState(() => ({
          heightDevider: heightDevider,
          widthDevider: widthDevider
      }));
    }

    scroll = () => {
      this.getWidthHeight();
      let imageOffsetTop = document.querySelector(".world-map").offsetTop;
      let imageOffsetLeft = document.querySelector(".world-map").offsetLeft;
      this.setState(() => ({
          imageOffsetTop,
          imageOffsetLeft
      }));
    }

    fetchWorldPlace(e) {
      fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.imageLat},${this.state.imageLon}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc `)
      .then(response => response.json())
      .then(cityName => ({
        worldPlace: cityName.results[0].address_components[1].short_name
      }));
    }

    fetchOffsetWorld() {
      fetch(` https://maps.googleapis.com/maps/api/timezone/json?location=${this.state.imageLat},${this.state.imageLon}&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY `)
      .then(response => response.json())
      .then(world => this.setState(() => ({
             offsetWorld: world.rawOffset
      }))
     )
    }

        fetchTempWorld(e) {
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.imageLat}&lon=${this.state.imageLon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`)
          .then(response => response.json())
          .then(data => {
             let tempC = data.main.temp;
             let tempF = (tempC * 1.8)+32;
             let icon = data.weather[0].icon;
             document.querySelector('.cornerTemp1000').innerHTML = Math.round(tempC) + "C";
             document.querySelector('.cornerTempF1000').innerHTML = Math.round(tempF) + "F";
             this.setState(() => ({
                wheatherAllWorld: tempC,
                wheatherAllWorldF: tempF,
                icon,
             }))
           })
           return
        }

        getCurrentDay() {
          const timeWorld = new Date().getHours()
          const dayNow = new Date().getDay()
          const offsetHours = (this.state.offsetWorld/3600);
          if ((offsetHours + timeWorld + this.state.guadalajaraHours + 1) > 23) {
            this.setState(() => ({
                curentDay: dayNow + 1
             }));
          } else if ((offsetHours + timeWorld + this.state.guadalajaraHours + 1) < 0) {
            this.setState(() => ({
                curentDay: dayNow - 1
             }));
          } else {
            this.setState(() => ({
                curentDay: dayNow
             }));
          }
          switch (this.state.curentDay) {
            case 0:
            this.setState(() => ({
                day: "Sunday"
             }));
            break;
            case 1:
            this.setState(() => ({
                day: "Monday"
             }));
            break;
            case 2:
            this.setState(() => ({
                day: "Thusday"
             }));
            break;
            case 3:
            this.setState(() => ({
                day: "wednsday"
             }));
            break;
            case 4:
            this.setState(() => ({
                day: "Thursday"
             }));
            break;
            case 5:
            this.setState(() => ({
                day: "Friday"
             }));
            break;
            case 6:
            this.setState(() => ({
                day: "Saturday"
             }));
           }
        }

      innerHtmlCorner = () => {
        document.querySelector('.movingDivmax1000').style.display = "block";
        document.querySelector('.spanLat1000').innerHTML = this.state.imageLat.toFixed(2);
        document.querySelector('.spanLon1000').innerHTML = this.state.imageLon.toFixed(2);
        document.querySelector('.cornerTemp1000').innerHTML = Math.round(this.state.wheatherAllWorld) + "C";
        document.querySelector('.cornerTempF1000').innerHTML = Math.round(this.state.wheatherAllWorldF) + "F";
        document.querySelector('.cornerDay1000').innerHTML = this.state.day;
      }

      getMinHour = (e) => {
        this.fetchOffsetWorld();
        const nowWorld = new Date();
        const minsWorld = nowWorld.getMinutes() < 10 ? "0" + nowWorld.getMinutes() : nowWorld.getMinutes();
        document.querySelector(".minutesWorld").innerHTML = `:${minsWorld}h`;
        this.setState(() => ({
          curentMin: minsWorld
        }))
        const hourWorld = nowWorld.getHours();
        const offsetHoursWorld = (this.state.offsetWorld / 3600);
        const d = new Date();
        const guadalajaraOffsetHours = d.getTimezoneOffset();
        const guadalajaraHours = (guadalajaraOffsetHours / 60);
        const curentHourWorld =  Math.floor(hourWorld + offsetHoursWorld + guadalajaraHours + 1);
        if (curentHourWorld >= 24) {
          let nextDay = curentHourWorld - 24
          document.querySelector(".hoursWorld").innerHTML = `${nextDay}`;
          this.setState(() => ({
            curentHourWorld: nextDay
          }))
        }
        else if (curentHourWorld < 0) {
          let previousDay = curentHourWorld + 24
          document.querySelector(".hoursWorld").innerHTML = `${previousDay}`;
          this.setState(() => ({
            curentHourWorld: previousDay
          }))
        }
        else {
          document.querySelector(".hoursWorld").innerHTML = `${curentHourWorld}`;
          this.setState(() => ({
            curentHourWorld: curentHourWorld
          }))
        }
    }

  pushObjectList = (e) => {
    fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.imageLat},${this.state.imageLon}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc `)
    .then(response => response.json())
    .then((cityName , i) => {
      if (cityName.results[0] == undefined || cityName.results[0].address_components[1] == undefined) {
        let MissingName = 'MISSING PLACE NAME';
        document.querySelector(".cityCorner1000").innerHTML = `${MissingName}`;
        let ShortName = '';
        let index = this.state.index;
        const placeNameLi =   { index: this.state.index, worldPlace: MissingName , countryShortName: ShortName  , tempC: this.state.wheatherAllWorld , tempF: this.state.wheatherAllWorldF, day:this.state.day, curentHour: this.state.curentHourWorld , minsWorld: this.state.curentMin , imageLatRoundLet: this.state.imageLatRound, imageLonRoundLet: this.state.imageLonRound  , icon: this.state.icon }
        this.state.savedcities.push(placeNameLi);
        console.log(placeNameLi);
        this.setState((prevState) => ({
          index: prevState.index + 1
        }));
        this.state.savedcities.push(placeNameLi);
        const savedList = document.querySelector('.list');
        savedList.innerHTML = this.state.savedcities.sort((a,b) => b.index - a.index).map(city => {
          return `
          <li>
          <input type="checkbox" data-index=${i} id="item${i}"> <span> ${city.worldPlace} ${city.countryShortName}</span>
          <span>    ${Math.round(city.tempC)}C|   ${Math.round(city.tempF)}F  ${city.day} ${city.curentHour}:${city.minsWorld}h</span><img className="icon-AllWorld" src={require('../content/${city.icon}.png')} width="70px" height="70px" />
          <span class="textAlighnRight"> Lat:${city.imageLatRoundLet} Lon:${city.imageLonRoundLet} </span>
          </li>
          `;
        }).join('');
      } else if (cityName.results[0].address_components[3] == undefined)  {
        let worldPlace = cityName.results[0].address_components[1].short_name ;
        document.querySelector(".cityCorner1000").innerHTML = `${worldPlace}`;
        const placeNameLi =   { index: this.state.index, worldPlace: worldPlace , countryShortName: '' ,tempC: this.state.wheatherAllWorld , tempF: this.state.wheatherAllWorldF , day:this.state.day, curentHour: this.state.curentHourWorld , minsWorld: this.state.curentMin , imageLatRoundLet: this.state.imageLatRound,  imageLonRoundLet: this.state.imageLonRound  , icon: this.state.icon }
        this.state.savedcities.push(placeNameLi);
        console.log(placeNameLi);
        this.setState((prevState) => ({
          index: prevState.index + 1
        }));
        const savedList = document.querySelector('.list');
        savedList.innerHTML = this.state.savedcities.sort((a,b) => b.index - a.index).map((city, i) => {
          return `
          <li>
          <input type="checkbox" data-index=${i} id="item${i}"> <span> ${city.worldPlace} ${city.countryShortName} </span>
          <span>  ${Math.round(city.tempC)}C|   ${Math.round(city.tempF)}F  ${city.day} ${city.curentHour}:${city.minsWorld}h</span><img className="icon-AllWorld" src={require('../content/${city.icon}.png')} width="70px" height="70px" />
          <span class="textAlighnRight"> Lat:${city.imageLatRoundLet} Lon:${city.imageLonRoundLet} </span>
          </li>
          `;
        }).join('');
      } else  {
        let worldPlace = cityName.results[0].address_components[1].short_name;
        document.querySelector(".cityCorner1000").innerHTML = `${worldPlace}`;
        let countryShortName = cityName.results[0].address_components[3].short_name;
        const placeNameLi =   { index: this.state.index,  worldPlace: worldPlace    , countryShortName: countryShortName  , tempC: this.state.wheatherAllWorld ,  tempF: this.state.wheatherAllWorldF , day:this.state.day, curentHour: this.state.curentHourWorld ,  minsWorld: this.state.curentMin , imageLatRoundLet: this.state.imageLatRound,  imageLonRoundLet: this.state.imageLonRound  , icon: this.state.icon }
        this.state.savedcities.push(placeNameLi);
        console.log(placeNameLi);

        this.setState((prevState) => ({
          index: prevState.index + 1
        }));
        const savedList = document.querySelector('.list');
        savedList.innerHTML = this.state.savedcities.sort((a,b) => b.index - a.index).map(city => {
          return `
          <li>
          <input type="checkbox" data-index=${i} id="item${i}"> <span> ${city.worldPlace} ${city.countryShortName}</span>
          <span>  ${Math.round(city.tempC)}C|   ${Math.round(city.tempF)}F  ${city.day} ${city.curentHour}:${city.minsWorld}h</span><img className="icon-AllWorld" src={require('../content/${city.icon}.png')} width="70px" height="70px" />
          <span class="textAlighnRight"> Lat:${city.imageLatRoundLet} Lon:${city.imageLonRoundLet} </span>
          </li>
          `;
        }).join('');
        console.log(savedList);
      }
    })
  }



  getAllData = (e) => {
    if(!e.ctrlKey) {
      this.getLatLon(e);
      this.getLatLonZoom(e);
      this.fetchWorldPlace(e);
      this.fetchTempWorld(e)
      this.fetchOffsetWorld(e);
      this.getMinHour(e);
      this.innerHtmlCorner(e);
      setTimeout(
        () => this.pushObjectList(e),
        () => this.innerHtmlCorner(e)
      ,1000
      )

    }
  }

addEventListener() {
  document.querySelectorAll('.img').forEach(option => option.addEventListener('click', this.zoom));
}


    render() {
      return (
        <div>
        <div className="body-container">
        <div className="world-map" onClick={this.getAllData} onMouseMove={this.displayLonLat} onMouseOver={this.displayOn} onMouseOut={this.displayOff}>
        <div className="img img1" id="0" data-minlon="" data-maxlat=""></div>
        <div className="img img1" id="1" data-minlon="" data-maxlat=""></div>
        <div className="img img2" id="2" data-minlon="" data-maxlat=""></div>
        <div className="img img3" id="3" data-minlon="" data-maxlat=""></div>
        <div className="img img4" id="4" data-minlon="" data-maxlat=""></div>
        <div className="img img5" id="5" data-minlon="" data-maxlat=""></div>
        <div className="img img6" id="6" data-minlon="" data-maxlat=""></div>
        <div className="img img7" id="7" data-minlon="" data-maxlat=""></div>
        <div className="img img8" id="8" data-minlon="" data-maxlat=""></div>
        <div className="img img9" id="9" data-minlon="" data-maxlat=""></div>
        <div className="img img10" id="10" data-minlon="" data-maxlat=""></div>
        <div className="img img11" id="11" data-minlon="" data-maxlat=""></div>
        <div className="img img12" id="12" data-minlon="" data-maxlat=""></div>
        <div className="img img13" id="13" data-minlon="" data-maxlat=""></div>
        <div className="img img14" id="14" data-minlon="" data-maxlat=""></div>
        <div className="img img15" id="15" data-minlon="" data-maxlat=""></div>
        <div className="img img16" id="16" data-minlon="" data-maxlat=""></div>
        <div className="img img17" id="17" data-minlon="" data-maxlat=""></div>
        <div className="img img18" id="18" data-minlon="" data-maxlat=""></div>
        <div className="img img19" id="19" data-minlon="" data-maxlat=""></div>
        <div className="img img20" id="20" data-minlon="" data-maxlat=""></div>
        <div className="img img21" id="21" data-minlon="" data-maxlat=""></div>
        <div className="img img22" id="22" data-minlon="" data-maxlat=""></div>
        <div className="img img23" id="23" data-minlon="" data-maxlat=""></div>
        <div className="img img24" id="24" data-minlon="" data-maxlat=""></div>
        <div className="img img25" id="25" data-minlon="" data-maxlat=""></div>
        <div className="img img26" id="26" data-minlon="" data-maxlat=""></div>
        <div className="img img27" id="27" data-minlon="" data-maxlat=""></div>
        <div className="img img28" id="28" data-minlon="" data-maxlat=""></div>
        <div className="img img29" id="29" data-minlon="" data-maxlat=""></div>
        <div className="img img30" id="30" data-minlon="" data-maxlat=""></div>
        <div className="img img31" id="31" data-minlon="" data-maxlat=""></div>
        <div className="img img32" id="32" data-minlon="" data-maxlat=""></div>
        <div className="img img33" id="33" data-minlon="" data-maxlat=""></div>
        <div className="img img34" id="34" data-minlon="" data-maxlat=""></div>
        <div className="img img35" id="35" data-minlon="" data-maxlat=""></div>
        <div className="img img36" id="36" data-minlon="" data-maxlat=""></div>
        <div className="img img37" id="37" data-minlon="" data-maxlat=""></div>
        <div className="img img38" id="38" data-minlon="" data-maxlat=""></div>
        <div className="img img39" id="39" data-minlon="" data-maxlat=""></div>
        <div className="img img40" id="40" data-minlon="" data-maxlat=""></div>
        <div className="img img41" id="41" data-minlon="" data-maxlat=""></div>
        <div className="img img42" id="42" data-minlon="" data-maxlat=""></div>
        <div className="img img43" id="43" data-minlon="" data-maxlat=""></div>
        <div className="img img44" id="44" data-minlon="" data-maxlat=""></div>
        <div className="img img45" id="45" data-minlon="" data-maxlat=""></div>
        <div className="img img46" id="46" data-minlon="" data-maxlat=""></div>
        <div className="img img47" id="47" data-minlon="" data-maxlat=""></div>
        <div className="img img48" id="48" data-minlon="" data-maxlat=""></div>
        <div className="img img49" id="49" data-minlon="" data-maxlat=""></div>
        <div className="img img50" id="50" data-minlon="" data-maxlat=""></div>
        <div className="img img51" id="51" data-minlon="" data-maxlat=""></div>
        <div className="img img52" id="52" data-minlon="" data-maxlat=""></div>
        <div className="img img53" id="53" data-minlon="" data-maxlat=""></div>
        <div className="img img54" id="54" data-minlon="" data-maxlat=""></div>
        <div className="img img55" id="55" data-minlon="" data-maxlat=""></div>
        <div className="img img56" id="56" data-minlon="" data-maxlat=""></div>
        <div className="img img57" id="57" data-minlon="" data-maxlat=""></div>
        <div className="img img58" id="58" data-minlon="" data-maxlat=""></div>
        <div className="img img59" id="59" data-minlon="" data-maxlat=""></div>
        <div className="img img60" id="60" data-minlon="" data-maxlat=""></div>
        <div className="img img61" id="61" data-minlon="" data-maxlat=""></div>
        <div className="img img62" id="62" data-minlon="" data-maxlat=""></div>
        <div className="img img63" id="63" data-minlon="" data-maxlat=""></div>
        <div className="img img64" id="64" data-minlon="" data-maxlat=""></div>
        <div className="img img65" id="65" data-minlon="" data-maxlat=""></div>
        <div className="img img66" id="66" data-minlon="" data-maxlat=""></div>
        <div className="img img67" id="67" data-minlon="" data-maxlat=""></div>
        <div className="img img68" id="68" data-minlon="" data-maxlat=""></div>
        <div className="img img69" id="69" data-minlon="" data-maxlat=""></div>
        <div className="img img70" id="70" data-minlon="" data-maxlat=""></div>
        <div className="img img71" id="71" data-minlon="" data-maxlat=""></div>
        <div className="img img72" id="72" data-minlon="" data-maxlat=""></div>
        <div className="img img73" id="73" data-minlon="" data-maxlat=""></div>
        <div className="img img74" id="74" data-minlon="" data-maxlat=""></div>
        <div className="img img75" id="75" data-minlon="" data-maxlat=""></div>
        <div className="img img76" id="76" data-minlon="" data-maxlat=""></div>
        <div className="img img77" id="77" data-minlon="" data-maxlat=""></div>
        <div className="img img78" id="78" data-minlon="" data-maxlat=""></div>
        <div className="img img79" id="79" data-minlon="" data-maxlat=""></div>
        <div className="img img80" id="80" data-minlon="" data-maxlat=""></div>
        <div className="img img81" id="81" data-minlon="" data-maxlat=""></div>
        <div className="img img82" id="82" data-minlon="" data-maxlat=""></div>
        <div className="img img83" id="83" data-minlon="" data-maxlat=""></div>
        <div className="img img84" id="84" data-minlon="" data-maxlat=""></div>
        <div className="img img85" id="85" data-minlon="" data-maxlat=""></div>
        <div className="img img86" id="86" data-minlon="" data-maxlat=""></div>
        <div className="img img87" id="87" data-minlon="" data-maxlat=""></div>
        <div className="img img88" id="88" data-minlon="" data-maxlat=""></div>
        <div className="img img89" id="89" data-minlon="" data-maxlat=""></div>
        <div className="img img90" id="90" data-minlon="" data-maxlat=""></div>
        <div className="img img91" id="91" data-minlon="" data-maxlat=""></div>
        <div className="img img92" id="92" data-minlon="" data-maxlat=""></div>
        <div className="img img93" id="93" data-minlon="" data-maxlat=""></div>
        <div className="img img94" id="94" data-minlon="" data-maxlat=""></div>
        <div className="img img95" id="95" data-minlon="" data-maxlat=""></div>
        <div className="img img96" id="96" data-minlon="" data-maxlat=""></div>
        <div className="img img97" id="97" data-minlon="" data-maxlat=""></div>
        <div className="img img98" id="98" data-minlon="" data-maxlat=""></div>
        <div className="img img99" id="99" data-minlon="" data-maxlat=""></div>
        <div className="zoomed"></div>
        </div>
        <div className="wrapper">
        <h2 onClick={this.clickTest}>RECENT PLACES</h2>
        <p></p>
        <ul className="list">
        </ul>
        </div>
        <div className="movingDiv">
        <div className="movingLat">
        <span className="LonLat">Lat:</span><span className="LonLat spanLat"></span>
        </div>
        <div className="movingLong">
        <span className="LonLat cityCorner"></span>
        <span className="LonLat">Lon:</span><span className="LonLat spanLon"></span>
        </div>
        <div>
        <span className="LonLat cornerTemp"></span><span className="LonLat cornerTempF"></span>
        </div>
        <span className="LonLat cornerDay"></span>
        </div>
        <div className="movingDivmax1000">
        <div>
        <span className="LonLat cityCorner1000"></span>
        </div>
        <div className="movingLat1000">
        <span className="LonLat">Lat:</span>
        <span className="LonLat spanLat1000"></span>
        </div>
        <div className="movingLong1000">
        <span className="LonLat">Lon:</span>
        <span className="LonLat spanLon1000"></span>
        </div>
        <div>
        <span className="LonLat cornerTemp1000"></span><span className="LonLat cornerTempF1000"></span>
        </div>
        <div>
        <span className="LonLat cornerDay1000"></span>
        <span className="hoursWorld"></span>:<span className="minutesWorld"/>
        </div>
        </div>
        </div>
        </div>
      )
    }
  }


  export default Map;
