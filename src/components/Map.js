import React from 'react';
import 'raw-loader';
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

  getLatLonZoom = (e) => {
    if(this.state.zoombool) {
      this.scroll();
      this.getWidthHeight();
      let positionYZoom = e.pageY - this.state.imageOffsetTop;
      let positionXZoom = e.pageX - this.state.imageOffsetLeft;
      let imageLatZoom = (this.maxlat) - ((positionYZoom/this.state.heightDevider) * 0.18);
      let imageLonZoom = ((positionXZoom/this.state.widthDevider) * 0.36 - (-this.state.minlon));
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
    if(!this.state.zoombool) {
      this.getWidthHeight(e);
      this.getLatLon(e);
      document.documentElement.style.setProperty("--pageX", e.pageX + this.state.suffix);
      document.documentElement.style.setProperty(`--pageY`, e.pageY + this.state.suffix);
      document.querySelector('.spanLat').innerHTML = this.state.imageLatRound;
      document.querySelector('.spanLon').innerHTML = this.state.imageLonRound;
    }
  }

  displayZoomed = (e) => {
    if(this.state.zoombool) {
      this.getWidthHeight(e);
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

    getTimeWorld = () => {
      fetch(` https://maps.googleapis.com/maps/api/timezone/json?location=${this.state.imageLat},${this.state.imageLon}&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY `)
      .then(response => response.json())
      .then(world =>  {
        let offsetWorld = world.rawOffset
        const timeWorld = new Date().getHours()
        const dayNow = new Date().getDay()
        const offsetHours = (offsetWorld/3600);
        let curentDay;
        if ((offsetHours + timeWorld + this.state.guadalajaraHours + 1) > 23) {
          curentDay = dayNow + 1
        } else if ((offsetHours + timeWorld + this.state.guadalajaraHours + 1) < 0) {
          curentDay = dayNow - 1
        } else {
          curentDay = dayNow
        }
        switch (curentDay) {
          case 0:
          document.querySelector('.cornerDay1000').innerHTML = "Sunday";
          this.setState(() => ({
            day: "Sunday"
          }));
          break;
          case 1:
          document.querySelector('.cornerDay1000').innerHTML = "Monday";
          this.setState(() => ({
            day: "Monday"
          }));
          break;
          case 2:
          document.querySelector('.cornerDay1000').innerHTML = "Thusday";
          this.setState(() => ({
            day: "Thusday"
          }));
          break;
          case 3:
          document.querySelector('.cornerDay1000').innerHTML = "wednsday";
          this.setState(() => ({
            day: "wednsday"
          }));
          break;
          case 4:
          document.querySelector('.cornerDay1000').innerHTML = "Thursday";
          this.setState(() => ({
            day: "Thursday"
          }));
          break;
          case 5:
          document.querySelector('.cornerDay1000').innerHTML = "Friday";
          this.setState(() => ({
            day: "Friday"
          }));
          break;
          case 6:
          document.querySelector('.cornerDay1000').innerHTML = "Saturday";
          this.setState(() => ({
            day: "Saturday"
          }));
        }
        const nowWorld = new Date();
        const minsWorld = nowWorld.getMinutes() < 10 ? "0" + nowWorld.getMinutes() : nowWorld.getMinutes();
        document.querySelector(".minutesWorld").innerHTML = `:${minsWorld}h`;
        this.setState(() => ({
          curentMin: minsWorld
        }))
        const hourWorld = nowWorld.getHours();
        const offsetHoursWorld = (offsetWorld / 3600);
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
      })
    }


    fetchTempJson() {
      let lat = this.state.imageLat;
      let lon = this.state.imageLon;
      async function fetchTempC() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`, {});
        return response.json();
      }
      return fetchTempC();
    }


    fetchTempWorld(e) {
      let lat = this.state.imageLat;
      let lon = this.state.imageLon;
      async function fetchTempC() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`, {});
        return response.json();
      }
      return fetchTempC();
    }

    fetchCityName() {
      let lat = this.state.imageLat;
      let lon = this.state.imageLon;
      async function fetchTempC() {
        const response = await fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc`, {});
        return response.json();
      }
      return fetchTempC();
    }

    pushObjectList = (e) => {
      let lat = this.state.imageLat;
      let lon = this.state.imageLon;
      this.fetchTempWorld().then(data => {
        let tempC = data.main.temp;
        let tempF = (tempC * 1.8)+32;
        let icon = data.weather[0].icon;
        document.querySelector('.movingDivmax1000').style.display = "block";
        document.querySelector('.spanLat1000').innerHTML = lat.toFixed(2);
        document.querySelector('.spanLon1000').innerHTML = lon.toFixed(2);
        document.querySelector('.cornerTemp1000').innerHTML = Math.round(tempC) + "C";
        document.querySelector('.cornerTempF1000').innerHTML = Math.round(tempF) + "F";
        this.fetchCityName().then((cityName , i) => {
          let city = "MISSING NAME"
          let countryName = '';
          if (typeof cityName.results[0] !== 'undefined' && typeof cityName.results[0].address_components[3] !== 'undefined') {
             city = cityName.results[0].address_components[1].short_name;
             countryName = cityName.results[0].address_components[3].short_name;
          }

            document.querySelector(".cityCorner1000").innerHTML = `${city}`;
            const placeNameLi =   { index: this.state.index,  worldPlace: city  , countryShortName: countryName  , tempC: tempC , tempF: tempF, day:this.state.day, curentHour: this.state.curentHourWorld ,  minsWorld: this.state.curentMin , imageLatRoundLet: this.state.imageLatRound,  imageLonRoundLet: this.state.imageLonRound  , icon: this.state.icon }
            this.state.savedcities.push(placeNameLi);
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
          })
      })
    }

    getAllData = (e) => {
      if(!e.ctrlKey) {
        this.getLatLon(e);
        this.getLatLonZoom(e);
        this.getTimeWorld(e);
        this.pushObjectList(e);
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
        <div className="img img1" id="0"></div>
        <div className="img img1" id="1"></div>
        <div className="img img2" id="2"></div>
        <div className="img img3" id="3"></div>
        <div className="img img4" id="4"></div>
        <div className="img img5" id="5"></div>
        <div className="img img6" id="6"></div>
        <div className="img img7" id="7"></div>
        <div className="img img8" id="8"></div>
        <div className="img img9" id="9"></div>
        <div className="img img10" id="10"></div>
        <div className="img img11" id="11"></div>
        <div className="img img12" id="12"></div>
        <div className="img img13" id="13"></div>
        <div className="img img14" id="14"></div>
        <div className="img img15" id="15"></div>
        <div className="img img16" id="16"></div>
        <div className="img img17" id="17"></div>
        <div className="img img18" id="18"></div>
        <div className="img img19" id="19"></div>
        <div className="img img20" id="20"></div>
        <div className="img img21" id="21"></div>
        <div className="img img22" id="22"></div>
        <div className="img img23" id="23"></div>
        <div className="img img24" id="24"></div>
        <div className="img img25" id="25"></div>
        <div className="img img26" id="26"></div>
        <div className="img img27" id="27"></div>
        <div className="img img28" id="28"></div>
        <div className="img img29" id="29"></div>
        <div className="img img30" id="30"></div>
        <div className="img img31" id="31"></div>
        <div className="img img32" id="32"></div>
        <div className="img img33" id="33"></div>
        <div className="img img34" id="34"></div>
        <div className="img img35" id="35"></div>
        <div className="img img36" id="36"></div>
        <div className="img img37" id="37"></div>
        <div className="img img38" id="38"></div>
        <div className="img img39" id="39"></div>
        <div className="img img40" id="40"></div>
        <div className="img img41" id="41"></div>
        <div className="img img42" id="42"></div>
        <div className="img img43" id="43"></div>
        <div className="img img44" id="44"></div>
        <div className="img img45" id="45"></div>
        <div className="img img46" id="46"></div>
        <div className="img img47" id="47"></div>
        <div className="img img48" id="48"></div>
        <div className="img img49" id="49"></div>
        <div className="img img50" id="50"></div>
        <div className="img img51" id="51"></div>
        <div className="img img52" id="52"></div>
        <div className="img img53" id="53"></div>
        <div className="img img54" id="54"></div>
        <div className="img img55" id="55"></div>
        <div className="img img56" id="56"></div>
        <div className="img img57" id="57"></div>
        <div className="img img58" id="58"></div>
        <div className="img img59" id="59"></div>
        <div className="img img60" id="60"></div>
        <div className="img img61" id="61"></div>
        <div className="img img62" id="62"></div>
        <div className="img img63" id="63"></div>
        <div className="img img64" id="64"></div>
        <div className="img img65" id="65"></div>
        <div className="img img66" id="66"></div>
        <div className="img img67" id="67"></div>
        <div className="img img68" id="68"></div>
        <div className="img img69" id="69"></div>
        <div className="img img70" id="70"></div>
        <div className="img img71" id="71"></div>
        <div className="img img72" id="72"></div>
        <div className="img img73" id="73"></div>
        <div className="img img74" id="74"></div>
        <div className="img img75" id="75"></div>
        <div className="img img76" id="76"></div>
        <div className="img img77" id="77"></div>
        <div className="img img78" id="78"></div>
        <div className="img img79" id="79"></div>
        <div className="img img80" id="80"></div>
        <div className="img img81" id="81"></div>
        <div className="img img82" id="82"></div>
        <div className="img img83" id="83"></div>
        <div className="img img84" id="84"></div>
        <div className="img img85" id="85"></div>
        <div className="img img86" id="86"></div>
        <div className="img img87" id="87"></div>
        <div className="img img88" id="88"></div>
        <div className="img img89" id="89"></div>
        <div className="img img90" id="90"></div>
        <div className="img img91" id="91"></div>
        <div className="img img92" id="92"></div>
        <div className="img img93" id="93"></div>
        <div className="img img94" id="94"></div>
        <div className="img img95" id="95"></div>
        <div className="img img96" id="96"></div>
        <div className="img img97" id="97"></div>
        <div className="img img98" id="98"></div>
        <div className="img img99" id="99"></div>
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
                <span className="LonLat">Lon:</span><span className="LonLat spanLon"></span>
            </div>
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
               </div>
               <div>
                   <span className="hoursWorld"></span>:<span className="minutesWorld"/>
               </div>
          </div>
         </div>
        </div>
      )
    }
  }


  export default Map;
