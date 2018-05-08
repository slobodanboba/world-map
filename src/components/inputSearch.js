import React from 'react';
import {connect} from "react-redux";


class Search extends React.Component {



render() {
        return  (
              <div className="Search listSearch">
                  <form onSubmit={this.props.onSearch}>
                        <input class="input input-value" type="text" name="inputCity" placeholder="City Name"></input><button>Search</button><br />
                        {/*<select class="selectedSelect" name="citySelected" id="citySecond" />*/}
                  </form>
              </div>
         )
}
}

const mapStatetoProps = state => ({
    state: state.map,
    cities: state.cities
})

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStatetoProps, mapDispatchToProps)(Search);
