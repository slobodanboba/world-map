import React from 'react';

export const getLatLonZoom = (e) => {
    this.scroll(e);
    this.getWidthHeight(e);
    let positionYZoom = e.pageY - this.state.imageOffsetTop;
    let positionXZoom = e.pageX - this.state.imageOffsetLeft;
    let imageLatZoom = (this.state.maxlat) - ((positionYZoom/this.state.heightDevider) * 0.18);
    let imageLonZoom = ((positionXZoom/this.state.widthDevider) * 0.36 - (-this.state.minlon));
    console.log(e.pageY,this.state.imageOffsetTop,e.pageX, this.state.imageOffsetLeft, this.state.maxlat, positionYZoom,this.state.heightDevider , imageLatZoom , imageLonZoom );
    this.setState(() => ({
        imageLat: imageLatZoom,
        imageLon: imageLatZoom,
        imageLatRound: imageLatZoom,
        imageLonRound: imageLatZoom,
    }));
    return { imageLatZoom, imageLonZoom }
}

export const getLatLon = (e) => {
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

export const displayLonLat = (e) => {
    if(!this.state.zoombool) {
        this.getWidthHeight(e);
        this.getLatLon(e);
        document.documentElement.style.setProperty("--pageX", e.pageX + this.state.suffix);
        document.documentElement.style.setProperty(`--pageY`, e.pageY + this.state.suffix);
        document.querySelector('.spanLat').innerHTML = this.state.imageLatRound;
        document.querySelector('.spanLon').innerHTML = this.state.imageLonRound;
    }
}

export const displayZoomed = (e) => {
    this.getWidthHeight(e);
    const { imageLatZoom, imageLonZoom } = this.getLatLonZoom(e);
    let imageLatRoundLet = imageLatZoom.toFixed(2);
    let imageLonRoundLet = imageLonZoom.toFixed(2);
    document.documentElement.style.setProperty("--pageX", e.pageX + this.state.suffix);
    document.documentElement.style.setProperty("--pageY", e.pageY + this.state.suffix);
    document.querySelector('.spanLat').innerHTML = imageLatRoundLet;
    document.querySelector('.spanLon').innerHTML = imageLonRoundLet;
}

export const displayOn = () => {
    if (!window.matchMedia("(max-width: 1000px)").matches) {
        document.querySelector('.movingDiv').style.display = "block";
    }
}

export const displayOff = () => {
    document.querySelector('.movingDiv').style.display = "none";
}

export const zoom  = (e) => {
    if((e.ctrlKey || e.shiftKey) && !this.state.zoombool) {
        this.getWidthHeight();
        document.querySelector('.zoomed').style.backgroundImage = `url(./images/img${e.target.id}.jpg)`;
        document.querySelector('.zoomed').style.display = "block";
        this.setState(() => ({
            maxRow: Math.floor(e.target.id/10),
            maxlat: (90 - (this.state.maxRow  * 18)),
            maxColumn: (e.target.id%10),
            minlon: this.state.maxColumn * 36 - 180,
            zoombool: true,
        }));
    }};

export const zoomout = (e) => {
    if((e.ctrlKey || e.shiftKey) && this.state.zoombool) {
        document.querySelector('.zoomed').style.display = "none";
        this.setState(() => ({
            zoombool: false,
        }));
    }
}

export const getWidthHeight = () => {
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

export const scroll = () => {
    this.getWidthHeight();
    let imageOffsetTop = document.querySelector(".world-map").offsetTop;
    let imageOffsetLeft = document.querySelector(".world-map").offsetLeft;
    this.setState(() => ({
        imageOffsetTop,
        imageOffsetLeft
    }));
}

export const getTimeWorld = () => {
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


export const fetchTempJson() {
    let lat = this.state.imageLat;
    let lon = this.state.imageLon;
    async function fetchTempC() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`, {});
        return response.json();
    }
    return fetchTempC();
}


export const fetchTempWorld(e) {
    let lat = this.state.imageLat;
    let lon = this.state.imageLon;
    async function fetchTempC() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`, {});
        return response.json();
    }
    return fetchTempC();
}

export const fetchCityName() {
    let lat = this.state.imageLat;
    let lon = this.state.imageLon;
    async function fetchTempC() {
        const response = await fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc`, {});
        return response.json();
    }
    return fetchTempC();
}

export const pushObjectList = (e) => {
    let lat = this.state.imageLat;
    let lon = this.state.imageLon;
    this.fetchTempWorld().then(data => {
        let tempC = data.main.temp;
        let tempF = (tempC * 1.8)+32;
        let icon = data.weather[0].icon;
        console.log(icon);
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
            const placeNameLi =   { index: this.state.index,  worldPlace: city  , countryShortName: countryName  , tempC: tempC , tempF: tempF, day:this.state.day, curentHour: this.state.curentHourWorld ,  minsWorld: this.state.curentMin , imageLatRoundLet: this.state.imageLatRound, imageLonRoundLet: this.state.imageLonRound , icon: icon }
            this.state.savedcities.push(placeNameLi);
            this.setState((prevState) => ({
                index: prevState.index + 1
            }));
            const savedList = document.querySelector('.list');
            savedList.innerHTML = this.state.savedcities.sort((a,b) => b.index - a.index).map(city => {
                return `
              <li>
              <input type="checkbox" data-index=${i} id="item${i}"> <span> ${city.worldPlace} ${city.countryShortName}</span>
              <span>  ${Math.round(city.tempC)}C|   ${Math.round(city.tempF)}F  ${city.day} ${city.curentHour}:${city.minsWorld}h</span><img className="icon-AllWorld" src='/content/${city.icon}.png' width="70px" height="70px" />
              <span class="textAlighnRight"> Lat:${city.imageLatRoundLet} Lon:${city.imageLonRoundLet} </span>
              </li>
              `;
            }).join('');
        })
    })
}

