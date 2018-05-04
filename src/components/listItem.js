import React from 'react';

const ListItem = (props) => {
        let city = props.city;
        return (
            <div className="listDiv">
                <input type="checkbox" data-index={city.index} id="checkBox" />
                <span> {city.worldPlace} {city.countryShortName}</span>
                <span>  {Math.round(city.tempC)}C|  {Math.round(city.tempF)}F  {city.day} {city.curentHour}:{city.minsWorld}h</span>
                <img className="icon-AllWorld" src="/content/{city.icon}.png" width="70px" height="70px" />
                <span className="textAlighnRight"> Lat:{city.imageLatRoundLet} Lon:{city.imageLonRoundLet} </span>
            </div>
        )
};

export default ListItem;
