import React from 'react';
import { connect } from 'react-redux';
import 'raw-loader';
import { pushToList } from "../actions/actions";
import { indexPlus } from "../actions/actions";
import List from "./list";
import MovingDiv from "./MovingDiv";
import CornerInfo from "./CornerInfo";
import MapItems from "./MapItems";
import '../stylesheets/style.css';
import { getWidthHeight } from "./utilities";


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

    componentDidMount() {
        document.querySelectorAll('.img').forEach(option => option.addEventListener('click', this.zoom));
        let image = document.querySelector(".world-map");
        let theCSSpropWidth = window.getComputedStyle(image,null).getPropertyValue("width");
        let imageWidth = parseInt(theCSSpropWidth);
        let varHeight = imageWidth/2;
        let suffix = 'px';
        document.documentElement.style.setProperty("--height", varHeight + suffix);
        let theCSSpropHeight = window.getComputedStyle(image,null).getPropertyValue("height");
        let imageHeight = parseInt(theCSSpropHeight);
        let listHeight = imageHeight - 100;
        document.documentElement.style.setProperty("--listHeight", listHeight + suffix);
    }

  getLatLonZoom = (e) => {
      let imageOffsetTop = document.querySelector(".world-map").offsetTop;
      let imageOffsetLeft = document.querySelector(".world-map").offsetLeft;
      const { heightDevider, widthDevider } = getWidthHeight(e);
      let positionYZoom = e.pageY - imageOffsetTop;
      let positionXZoom = e.pageX - imageOffsetLeft;
      let imageLatZoom = (this.state.maxlat) - ((positionYZoom/heightDevider) * 0.18);
      let imageLonZoom = ((positionXZoom/widthDevider) * 0.36 - (-this.state.minlon));
      return { imageLatZoom, imageLonZoom }
  }

  getLatLon = (e) => {
      const { heightDevider, widthDevider } = getWidthHeight(e);
      console.log(heightDevider, widthDevider)
      let imageOffsetTop = document.querySelector(".world-map").offsetTop;
      let imageOffsetLeft = document.querySelector(".world-map").offsetLeft;
      let positionY = e.pageY - imageOffsetTop;
      let positionX = e.pageX - imageOffsetLeft;
      let imageLatLet = (50 - positionY/heightDevider) * 1.8;
      let imageLonLet = (positionX/widthDevider - 50) * 3.6;
      let imageLatRoundLet = imageLatLet.toFixed(2);
      let imageLonRoundLet = imageLonLet.toFixed(2);
      return { imageLatLet, imageLonLet, imageLatRoundLet, imageLonRoundLet }
  }

  displayLonLat = (e) => {
    if(!this.state.zoombool) {
      const { imageLatLet, imageLonLet, imageLatRoundLet, imageLonRoundLet } = this.getLatLon(e);
      document.documentElement.style.setProperty("--pageX", e.pageX + this.state.suffix);
      document.documentElement.style.setProperty(`--pageY`, e.pageY + this.state.suffix);
      document.querySelector('.spanLat').innerHTML = imageLatRoundLet;
      document.querySelector('.spanLon').innerHTML = imageLonRoundLet;
    }
  }

  displayZoomed = (e) => {
      const { imageLatZoom, imageLonZoom } = this.getLatLonZoom(e);
      let imageLatRoundLet = imageLatZoom.toFixed(2);
      let imageLonRoundLet = imageLonZoom.toFixed(2);
      document.documentElement.style.setProperty("--pageX", e.pageX + this.state.suffix);
      document.documentElement.style.setProperty("--pageY", e.pageY + this.state.suffix);
      document.querySelector('.spanLat').innerHTML = imageLatRoundLet;
      document.querySelector('.spanLon').innerHTML = imageLonRoundLet;
  }

    zoom  = (e) => {
        if((e.ctrlKey || e.shiftKey) && !this.state.zoombool) {
            document.querySelector('.zoomed').style.backgroundImage = `url(./images/img${e.target.id}.jpg)`;
            document.querySelector('.zoomed').style.display = "block";
            let maxRow = Math.floor(e.target.id/10);
            let maxColumn = e.target.id%10;
            this.setState(() => ({
                maxlat: (90 - (maxRow  * 18)),
                minlon: maxColumn * 36 - 180,
                zoombool: true,
            }));
        }};

    zoomout = (e) => {
        if((e.ctrlKey || e.shiftKey) && this.state.zoombool) {
            document.querySelector('.zoomed').style.display = "none";
            this.setState(() => ({
                zoombool: false,
            }));
        }
    }


    fetchTempWorld(e) {
        const { imageLatLet, imageLonLet } = this.getLatLon(e);
      async function fetchTempC(e) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${imageLatLet}&lon=${imageLonLet}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`, {});
        return response.json(e);
      }
      return fetchTempC(e)
    }

    getTimeWorld = (e) => {
        const { imageLatLet, imageLonLet } = this.getLatLon(e);
        fetch(` https://maps.googleapis.com/maps/api/timezone/json?location=${imageLatLet},${imageLonLet}&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY `)
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

    pushObjectList = (e) => {
        const {imageLatLet, imageLonLet} = this.getLatLon(e);
        this.getTimeWorld(e);
        this.zoom(e);
        this.fetchTempWorld(e).then(data => {
            let tempC = data.main.temp;
            let tempF = (tempC * 1.8) + 32;
            let icon = data.weather[0].icon;
            let indexProp = this.props.state.index;
            document.querySelector('.movingDivmax1000').style.display = "block";
            document.querySelector('.spanLat1000').innerHTML = imageLatLet.toFixed(2);
            document.querySelector('.spanLon1000').innerHTML = imageLonLet.toFixed(2);
            document.querySelector('.cornerTemp1000').innerHTML = Math.round(tempC) + "C";
            document.querySelector('.cornerTempF1000').innerHTML = Math.round(tempF) + "F";
            fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${imageLatLet},${imageLonLet}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc`)
                .then(response => response.json())
                .then(cityName => {
                    console.log(cityName.results[0].address_components[1].short_name)
                    let city = "MISSING NAME";
                    let countryName = '';
                    if (typeof cityName.results[0] !== 'undefined' && typeof cityName.results[0].address_components[3] !== 'undefined') {
                        city = cityName.results[0].address_components[1].short_name;
                        countryName = cityName.results[0].address_components[3].short_name;
                    }
                    document.querySelector(".cityCorner1000").innerHTML = `${city}`;
                    const placeNameLi = {
                        key: indexProp,
                        index: indexProp,
                        worldPlace: city,
                        countryShortName: countryName,
                        tempC: tempC,
                        tempF: tempF,
                        day: this.state.day,
                        curentHour: this.state.curentHourWorld,
                        minsWorld: this.state.curentMin,
                        imageLatRoundLet: this.state.imageLatRound,
                        imageLonRoundLet: this.state.imageLonRound,
                        icon: icon
                    }
                    this.props.pushToList({li: placeNameLi});
                    this.props.indexPlus();
                })
        })
    }

    render() {
      return (
        <div>
        <div className="body-container">
            <MapItems
                pushObjectList={this.pushObjectList}
                displayLonLat={this.displayLonLat}
                zoomout={this.zoomout}
                displayZoomed={this.displayZoomed}
            />
            <List city={this.props.state.savedcities} />
            <MovingDiv />
            <CornerInfo />
         </div>
        </div>
      )
    }
  }

  const mapStatetoProps = (state) => ({
      state: state.map
  })

  const mapDispatchToProps = (dispatch) => ({
      pushToList: (placeNameLi) => dispatch(pushToList(placeNameLi)),
      indexPlus: () => dispatch(indexPlus())
  });

export default connect(mapStatetoProps, mapDispatchToProps)(Map);
