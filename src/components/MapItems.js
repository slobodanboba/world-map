import React from 'react';

class MapItems extends React.Component {

        componentDidMount() {
                let i;
                for(i=0; i<100; i++){
                    let div = document.createElement("div");
                    div.setAttribute("id" ,  `${i}`);
                    document.querySelector('.world-map').appendChild(div);
                }
        }

    displayOn = () => {
        if (!window.matchMedia("(max-width: 1000px)").matches) {
            document.querySelector('.movingDiv').style.display = "block";
        }
    }
    displayOff = () => {
        document.querySelector('.movingDiv').style.display = "none";
    }

    render() {
        return (
            <div className="world-map" onClick={this.props.pushObjectList} onMouseMove={this.props.displayLonLat}
                 onMouseOver={this.displayOn} onMouseOut={this.displayOff}>
                <div className="zoomed" onClick={this.props.zoomout} onMouseMove={this.props.displayLonLat}></div>
            </div>
        )
    }
}


export default MapItems;

