export const getWidthHeight = () => {
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
    let heightDevider = imageHeight/100;
    let widthDevider = imageWidth/100;
    return { heightDevider, widthDevider }
}

export const  fetchOffset = (imageLat, imageLon) => {
    async function fetchTempC() {
        const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${imageLat},${imageLon}&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY`, {});
        return response.json();
    }
    return fetchTempC()
}

export const fetchTempWorld = (imageLat, imageLon) => {
    async function fetchTempC() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${imageLat}&lon=${imageLon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`, {});
        return response.json();
    }
    return fetchTempC()
}

export const innerHtmlCorner = (imageLat, imageLon, tempC, tempF ) => {
    document.querySelector('.movingDivmax1000').style.display = "block";
    document.querySelector('.spanLat1000').innerHTML = imageLat.toFixed(2);
    document.querySelector('.spanLon1000').innerHTML = imageLon.toFixed(2);
    document.querySelector('.cornerTemp1000').innerHTML = Math.round(tempC) + "C";
    document.querySelector('.cornerTempF1000').innerHTML = Math.round(tempF) + "F";
}


