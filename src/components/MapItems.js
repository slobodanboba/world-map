import React from 'react';

const MapItems = (props) => {

   const  displayOn = () => {
        if (!window.matchMedia("(max-width: 1000px)").matches) {
            document.querySelector('.movingDiv').style.display = "block";
        }
    }
   const displayOff = () => {
        document.querySelector('.movingDiv').style.display = "none";
    }

        return (
            <div className="world-map" onClick={props.pushObjectList} onMouseMove={props.displayLonLat} onMouseOver={displayOn} onMouseOut={displayOff}>
                <div className="img img1" id="0" data-minlon="" data-maxlat=""></div>
                <div className="img img1" id="1" data-minlon="" data-maxlat=""></div>
                <div className="img img2" id="2" data-minlon="" data-maxlat=""></div>
                <div className="img img3" id="3" data-minlon="" data-maxlat=""></div>
                <div className="img img4" id="4" data-minlon="" data-maxlat=""></div>
                <div className="img img5" id="5" data-minlon="" data-maxlat=""></div>
                <div className="img img6" id="6" data-minlon="" data-maxlat=""></div>
                <div className="img img7" id="7" data-minlon="" data-maxlat=""></div>
                <div className="img img8" id="8" data-minlon="" data-maxlat=""></div>
                <div className="img img9" id="9" data-minlon="" data-maxlat=""></div>
                <div className="img img10" id="10" data-minlon="" data-maxlat=""></div>
                <div className="img img11" id="11" data-minlon="" data-maxlat=""></div>
                <div className="img img12" id="12" data-minlon="" data-maxlat=""></div>
                <div className="img img13" id="13" data-minlon="" data-maxlat=""></div>
                <div className="img img14" id="14" data-minlon="" data-maxlat=""></div>
                <div className="img img15" id="15" data-minlon="" data-maxlat=""></div>
                <div className="img img16" id="16" data-minlon="" data-maxlat=""></div>
                <div className="img img17" id="17" data-minlon="" data-maxlat=""></div>
                <div className="img img18" id="18" data-minlon="" data-maxlat=""></div>
                <div className="img img19" id="19" data-minlon="" data-maxlat=""></div>
                <div className="img img20" id="20" data-minlon="" data-maxlat=""></div>
                <div className="img img21" id="21" data-minlon="" data-maxlat=""></div>
                <div className="img img22" id="22" data-minlon="" data-maxlat=""></div>
                <div className="img img23" id="23" data-minlon="" data-maxlat=""></div>
                <div className="img img24" id="24" data-minlon="" data-maxlat=""></div>
                <div className="img img25" id="25" data-minlon="" data-maxlat=""></div>
                <div className="img img26" id="26" data-minlon="" data-maxlat=""></div>
                <div className="img img27" id="27" data-minlon="" data-maxlat=""></div>
                <div className="img img28" id="28" data-minlon="" data-maxlat=""></div>
                <div className="img img29" id="29" data-minlon="" data-maxlat=""></div>
                <div className="img img30" id="30" data-minlon="" data-maxlat=""></div>
                <div className="img img31" id="31" data-minlon="" data-maxlat=""></div>
                <div className="img img32" id="32" data-minlon="" data-maxlat=""></div>
                <div className="img img33" id="33" data-minlon="" data-maxlat=""></div>
                <div className="img img34" id="34" data-minlon="" data-maxlat=""></div>
                <div className="img img35" id="35" data-minlon="" data-maxlat=""></div>
                <div className="img img36" id="36" data-minlon="" data-maxlat=""></div>
                <div className="img img37" id="37" data-minlon="" data-maxlat=""></div>
                <div className="img img38" id="38" data-minlon="" data-maxlat=""></div>
                <div className="img img39" id="39" data-minlon="" data-maxlat=""></div>
                <div className="img img40" id="40" data-minlon="" data-maxlat=""></div>
                <div className="img img41" id="41" data-minlon="" data-maxlat=""></div>
                <div className="img img42" id="42" data-minlon="" data-maxlat=""></div>
                <div className="img img43" id="43" data-minlon="" data-maxlat=""></div>
                <div className="img img44" id="44" data-minlon="" data-maxlat=""></div>
                <div className="img img45" id="45" data-minlon="" data-maxlat=""></div>
                <div className="img img46" id="46" data-minlon="" data-maxlat=""></div>
                <div className="img img47" id="47" data-minlon="" data-maxlat=""></div>
                <div className="img img48" id="48" data-minlon="" data-maxlat=""></div>
                <div className="img img49" id="49" data-minlon="" data-maxlat=""></div>
                <div className="img img50" id="50" data-minlon="" data-maxlat=""></div>
                <div className="img img51" id="51" data-minlon="" data-maxlat=""></div>
                <div className="img img52" id="52" data-minlon="" data-maxlat=""></div>
                <div className="img img53" id="53" data-minlon="" data-maxlat=""></div>
                <div className="img img54" id="54" data-minlon="" data-maxlat=""></div>
                <div className="img img55" id="55" data-minlon="" data-maxlat=""></div>
                <div className="img img56" id="56" data-minlon="" data-maxlat=""></div>
                <div className="img img57" id="57" data-minlon="" data-maxlat=""></div>
                <div className="img img58" id="58" data-minlon="" data-maxlat=""></div>
                <div className="img img59" id="59" data-minlon="" data-maxlat=""></div>
                <div className="img img60" id="60" data-minlon="" data-maxlat=""></div>
                <div className="img img61" id="61" data-minlon="" data-maxlat=""></div>
                <div className="img img62" id="62" data-minlon="" data-maxlat=""></div>
                <div className="img img63" id="63" data-minlon="" data-maxlat=""></div>
                <div className="img img64" id="64" data-minlon="" data-maxlat=""></div>
                <div className="img img65" id="65" data-minlon="" data-maxlat=""></div>
                <div className="img img66" id="66" data-minlon="" data-maxlat=""></div>
                <div className="img img67" id="67" data-minlon="" data-maxlat=""></div>
                <div className="img img68" id="68" data-minlon="" data-maxlat=""></div>
                <div className="img img69" id="69" data-minlon="" data-maxlat=""></div>
                <div className="img img70" id="70" data-minlon="" data-maxlat=""></div>
                <div className="img img71" id="71" data-minlon="" data-maxlat=""></div>
                <div className="img img72" id="72" data-minlon="" data-maxlat=""></div>
                <div className="img img73" id="73" data-minlon="" data-maxlat=""></div>
                <div className="img img74" id="74" data-minlon="" data-maxlat=""></div>
                <div className="img img75" id="75" data-minlon="" data-maxlat=""></div>
                <div className="img img76" id="76" data-minlon="" data-maxlat=""></div>
                <div className="img img77" id="77" data-minlon="" data-maxlat=""></div>
                <div className="img img78" id="78" data-minlon="" data-maxlat=""></div>
                <div className="img img79" id="79" data-minlon="" data-maxlat=""></div>
                <div className="img img80" id="80" data-minlon="" data-maxlat=""></div>
                <div className="img img81" id="81" data-minlon="" data-maxlat=""></div>
                <div className="img img82" id="82" data-minlon="" data-maxlat=""></div>
                <div className="img img83" id="83" data-minlon="" data-maxlat=""></div>
                <div className="img img84" id="84" data-minlon="" data-maxlat=""></div>
                <div className="img img85" id="85" data-minlon="" data-maxlat=""></div>
                <div className="img img86" id="86" data-minlon="" data-maxlat=""></div>
                <div className="img img87" id="87" data-minlon="" data-maxlat=""></div>
                <div className="img img88" id="88" data-minlon="" data-maxlat=""></div>
                <div className="img img89" id="89" data-minlon="" data-maxlat=""></div>
                <div className="img img90" id="90" data-minlon="" data-maxlat=""></div>
                <div className="img img91" id="91" data-minlon="" data-maxlat=""></div>
                <div className="img img92" id="92" data-minlon="" data-maxlat=""></div>
                <div className="img img93" id="93" data-minlon="" data-maxlat=""></div>
                <div className="img img94" id="94" data-minlon="" data-maxlat=""></div>
                <div className="img img95" id="95" data-minlon="" data-maxlat=""></div>
                <div className="img img96" id="96" data-minlon="" data-maxlat=""></div>
                <div className="img img97" id="97" data-minlon="" data-maxlat=""></div>
                <div className="img img98" id="98" data-minlon="" data-maxlat=""></div>
                <div className="img img99" id="99" data-minlon="" data-maxlat=""></div>
                <div className="zoomed" onClick={props.zoomout} onMouseMove={props.displayLonLat}></div>
            </div>
        )
    }


export default MapItems;

