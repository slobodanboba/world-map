import React from 'react';

const MovingDiv = () => {
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

 export default  MovingDiv;


