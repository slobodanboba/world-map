import React from 'react';

const CornerInfo = () => {
     return (
          <div className="movingDivmax1000">
              <div>
                  <span className="LonLat cityCorner1000"></span>
              </div>
              <div className="movingLat1000">
                  <span className="LonLat">Lat:</span>
                  <span className="LonLat spanLat1000"></span>
              </div>
              <div className="movingLong1000">
                  <span className="LonLat">Lon:</span>
                  <span className="LonLat spanLon1000"></span>
              </div>
              <div>
                  <span className="LonLat cornerTemp1000"></span><span className="LonLat cornerTempF1000"></span>
              </div>
              <div>
                  <span className="LonLat cornerDay1000"></span>
              </div>
              <div>
                  <span className="hoursWorld"></span>:<span className="minutesWorld"/>
              </div>
          </div>
        )
 }

export default CornerInfo;
