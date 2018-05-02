import React from 'react';

class ListItem extends React.Component {
    render() {
        let city = this.props.city;
        return (<div>
                    <input type="checkbox" data-index={city.index} id="checkBox" />
                    <span> {city.worldPlace} {city.countryShortName}</span>
                    <span>  {Math.round(city.tempC)}C|  {Math.round(city.tempF)}F  {city.day} {city.curentHour}:{city.minsWorld}h</span>
                    <img className="icon-AllWorld" src="/content/{city.icon}.png" width="70px" height="70px" />
                    <span className="textAlighnRight"> Lat:{city.imageLatRoundLet} Lon:{city.imageLonRoundLet} </span>
                </div>)


    }
}


export default ListItem;
