import React from 'react';
import {connect} from "react-redux";
import {deleteAll, deleteListItem} from "../actions/actions";



class MovingDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
    }

    render() {

      return (
          <div className="movingDiv">
              <div className="movingLat">
                  <span className="LonLat">Lat:</span><span className="LonLat spanLat"></span>
              </div>
              <div className="movingLong">
                  <span className="LonLat">Lon:</span><span className="LonLat spanLon"></span>
              </div>
          </div>
        )
    }
 }

const mapStatetoProps = (state) => ({
    state: state.map
})

const mapDispatchToProps = (dispatch) => ({
    deleteListItem: () => dispatch(deleteListItem()),
    deleteAll: () => dispatch(deleteAll()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(MovingDiv);

