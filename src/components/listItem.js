import React from 'react';

class ListItem extends React.Component {

   toggle(index) {
        let checkedBox = document.querySelectorAll("#checkBox")
        checkedBox.forEach(box => box.dataset.index == index ? box.checked = !box.checked : box)
    }

        render() {
        let city = this.props.city;
            return (
            <div className="squaredThree" onClick={() => this.toggle(city.index)}>
                <input onClick={() => this.toggle(city.index)} type="checkbox" value="None" data-index={city.index} id="checkBox" name="check"/>
                <label htmlFor="squaredThree"></label>
                <span> {city.worldPlace} {city.countryShortName}</span>
                <span>  {Math.round(city.tempC)}C| {Math.round(city.tempF)}F {city.day} {city.curentHour}:{city.minsWorld}h</span>
                <span className="textAlighnRight"> Lat:{city.imageLatRoundLet} Lon:{city.imageLonRoundLet} </span>
            </div>
        )
    }
}

export default ListItem;
