import React from 'react';
import { connect } from 'react-redux';
import 'raw-loader';
import { pushToList , indexPlus , zoomboolFalse , zoomboolTrue, maxLat ,minLon , curentHour, dayWorld } from "../actions/actions";
import List from "./list";
import Header from "./Header"
import MovingDiv from "./MovingDiv";
import CornerInfo from "./CornerInfo";
import MapItems from "./MapItems";
import '../stylesheets/style.css';
import {getWidthHeight, fetchTempWorld, fetchOffset, innerHtmlCorner} from "./utilities";

class Map extends React.Component {

    componentDidMount() {
        document.querySelectorAll('.img').forEach(option => option.addEventListener('click', this.zoom));
        getWidthHeight();
    }

  getLatLon = (e) => {
      let imageLat;
      let imageLon;
      let positionY = e.pageY - document.querySelector(".world-map").offsetTop;
      let positionX = e.pageX - document.querySelector(".world-map").offsetLeft;
      const { heightDevider, widthDevider } = getWidthHeight(e);
      if (this.props.state.zoombool) {
          imageLat = (this.props.state.maxlat) - ((positionY / heightDevider) * 0.18);
          imageLon = ((positionX / widthDevider) * 0.36 - (-this.props.state.minlon));
      }
      else {
          imageLat = (50 - positionY/heightDevider) * 1.8;
          imageLon = (positionX/widthDevider - 50) * 3.6;
      }
      return { imageLat, imageLon }
  }

  displayLonLat = (e) => {
      const { imageLat, imageLon } = this.getLatLon(e);
      let suffix = 'px';
      document.documentElement.style.setProperty("--pageX", e.pageX + suffix);
      document.documentElement.style.setProperty(`--pageY`, e.pageY + suffix);
        let imageLatRoundLet = imageLat.toFixed(2);
        let imageLonRoundLet = imageLon.toFixed(2);
      document.querySelector('.spanLat').innerHTML = imageLatRoundLet;
      document.querySelector('.spanLon').innerHTML = imageLonRoundLet;
  }

    zoom  = (e) => {
        if((e.ctrlKey || e.shiftKey) && !this.props.state.zoombool) {
            document.querySelector('.zoomed').style.backgroundImage = `url(./images/img${e.target.id}.jpg)`;
            document.querySelector('.zoomed').style.display = "block";
            let maxRow = Math.floor(e.target.id/10);
            let maxColumn = e.target.id%10;
            let max = (90 - (maxRow  * 18));
            let min = ((maxColumn * 36) - 180) ;
            this.props.maxLat({max: max});
            this.props.minLon({min: min});
            this.props.zoomboolTrue();
        }};

    zoomout = (e) => {
        if((e.ctrlKey || e.shiftKey) && this.props.state.zoombool) {
            document.querySelector('.zoomed').style.display = "none";
            this.props.zoomboolFalse();
        }
    }

    getTimeWorld = (imageLat, imageLon) => {
        let day;
        let curentMin;
        let offsetWorld = 0;
        fetchOffset(imageLat, imageLon).then(world => {
            offsetWorld = world.rawOffset
            const timeWorld = new Date().getHours()
            const dayNow = new Date().getDay()
            const offsetHours = (offsetWorld/3600);
            const d = new Date();
            const nowWorld = new Date();
            const hourWorld = nowWorld.getHours();
            const guadalajaraOffsetHours = d.getTimezoneOffset();
            const guadalajaraHours = (guadalajaraOffsetHours / 60);
            const offsetHoursWorld = (offsetWorld / 3600);
            let curentDay = 0;
            if ((offsetHours + timeWorld + guadalajaraHours + 1) > 23) {
                curentDay = dayNow + 1
            } else if ((offsetHours + timeWorld + guadalajaraHours + 1) < 0) {
                curentDay = dayNow - 1
            } else {
                curentDay = dayNow
            }
            switch (curentDay) {
                case 0:
                    day = "Sunday"
                    break;
                case 1:
                    day = "Monday"
                    break;
                case 2:
                    day = "Thusday"
                    break;
                case 3:
                    day = "Wednsday";
                    break;
                case 4:
                    day = "Thursday"
                    break;
                case 5:
                    day = "Friday"
                    break;
                case 6:
                    day = "Saturday"
            }
            document.querySelector('.cornerDay1000').innerHTML = `${day}`;
            this.props.dayWorld({day: day})
            curentMin = nowWorld.getMinutes() < 10 ? "0" + nowWorld.getMinutes() : nowWorld.getMinutes();
            document.querySelector(".minutesWorld").innerHTML = `:${curentMin}h`;
            let curentHourWorld =  Math.floor(hourWorld + offsetHoursWorld + guadalajaraHours + 1);
            if (curentHourWorld >= 24) {
                let nextDay = curentHourWorld - 24;
                curentHourWorld = nextDay
            }
            else if (curentHourWorld < 0) {
                let previousDay = curentHourWorld + 24;
                curentHourWorld = previousDay
            } else {
                curentHourWorld = curentHourWorld
            }
            document.querySelector(".hoursWorld").innerHTML = `${curentHourWorld}`;
            this.props.curentHour({hour: curentHourWorld})
        })
    }


    procesInputClick = (imageLat, imageLon) => {
        this.getTimeWorld(imageLat, imageLon);
        fetchTempWorld(imageLat, imageLon).then(data => {
            let tempC = data.main.temp;
            let tempF = (tempC * 1.8) + 32;
            let curentMin = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
            innerHtmlCorner(imageLat, imageLon, tempC, tempF);
            fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${imageLat},${imageLon}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc`)
                .then(response => response.json())
                .then(cityName => {
                    let city = "MISSING NAME";
                    let countryName = '';
                    if (typeof cityName.results[0] !== 'undefined' && typeof cityName.results[0].address_components[3] !== 'undefined') {
                        city = cityName.results[0].address_components[1].short_name;
                        countryName = cityName.results[0].address_components[3].short_name;
                    }
                    document.querySelector(".cityCorner1000").innerHTML = `${city}`;
                    const placeNameLi = {
                        index: this.props.state.index,
                        worldPlace: city,
                        countryShortName: countryName,
                        tempC: tempC,
                        tempF: tempF,
                        day: this.props.state.day,
                        curentHour: this.props.state.curentHour,
                        minsWorld: curentMin,
                        imageLatRoundLet: imageLat.toFixed(2),
                        imageLonRoundLet: imageLon.toFixed(2),
                        icon: data.weather[0].icon
                    }
                    this.props.pushToList({li: placeNameLi});
                    this.props.indexPlus();
                })
        })
    }

    pushObjectList = (e) => {
        this.zoom(e);
        if(!e.ctrlKey && !e.shiftKey) {
            const {imageLat, imageLon} = this.getLatLon(e);
            this.procesInputClick(imageLat, imageLon);
        }
    }

    searchInput = (e) => {
        this.zoom(e);
        e.preventDefault();
        let inputValue = e.target[0].value;
        console.log(e.target[0].value)
        fetch(` https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc `)
            .then(response => response.json())
            .then((inputCity) => {
            let imageLat = inputCity.results[0].geometry.location.lat;
            let imageLon = inputCity.results[0].geometry.location.lng;
            this.procesInputClick(imageLat, imageLon);
        })
    }

    render() {
      return (
        <div>
        <div className="body-container">
            <Header />
            <MapItems
                pushObjectList={this.pushObjectList}
                displayLonLat={this.displayLonLat}
                zoomout={this.zoomout}
            />
            <List city={this.props.state.savedcities} search={this.searchInput}/>
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
      indexPlus: () => dispatch(indexPlus()),
      zoomboolFalse: () => dispatch(zoomboolFalse()),
      zoomboolTrue: () => dispatch(zoomboolTrue()),
      maxLat: (max) => dispatch(maxLat(max)),
      minLon: (min) => dispatch(minLon(min)),
      curentHour: (hour) => dispatch(curentHour(hour)),
      dayWorld: (day) => dispatch(dayWorld(day))
  });

export default connect(mapStatetoProps, mapDispatchToProps)(Map);
