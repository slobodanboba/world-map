import React from 'react';
import {connect} from "react-redux";
import { pushCitiesList } from "../actions/actions"


class Search extends React.Component {

    componentDidMount() {
    fetch('https://raw.githubusercontent.com/slobodanboba/challenge/master/5%20Challenges/content/city_list.json')
.then(response => response.json())
.then(city => this.props.pushCitiesList({city: city}))
}

render() {
        return  (
              <div className="Search listSearch">
                <input class="input input-value" type="text" name="inputCity" value="City" /><br />
                <select class="selectedSelect" name="citySelected" id="citySecond" />
             </div>
        )
}
}

const mapStatetoProps = state => ({
    state: state.map,
    cities: state.cities
})

const mapDispatchToProps = dispatch => ({
    pushCitiesList: (city) => dispatch(pushCitiesList(city))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Search);
