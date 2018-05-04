import React from 'react';

class ListItem extends React.Component {

   toggle(index) {
        let checkedBox = document.querySelectorAll("#checkBox")
        checkedBox.forEach(box => box.dataset.index == index ? box.checked = !box.checked : box)
    }

        render() {
        let city = this.props.city;
        return (
<<<<<<< HEAD
            <div className="squaredThree" onClick={() => this.toggle(city.index)}>
                <input onClick={() => this.toggle(city.index)} type="checkbox" value="None" data-index={city.index} id="checkBox" name="check"/>
                <label htmlFor="squaredThree"></label>
=======
            <div className="listDiv">
                <input type="checkbox" data-index={city.index} id="checkBox" />
>>>>>>> 485c9a3e345ffe4dc7377d5342527801e7326e02
                <span> {city.worldPlace} {city.countryShortName}</span>
                <span>  {Math.round(city.tempC)}C| {Math.round(city.tempF)}F {city.day} {city.curentHour}:{city.minsWorld}h</span>
                <img className="icon-AllWorld" src="/content/04d.png" width="70px" height="70px"/>
                <span className="textAlighnRight"> Lat:{city.imageLatRoundLet} Lon:{city.imageLonRoundLet} </span>
            </div>
        )
<<<<<<< HEAD
    }
=======
>>>>>>> 485c9a3e345ffe4dc7377d5342527801e7326e02
};

export default ListItem;
