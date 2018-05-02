import React from 'react';



class MovingDiv extends React.Component {
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


export default MovingDiv;
