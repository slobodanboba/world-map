import React from 'react';
import {connect} from "react-redux";


const Header = (props) => {
        return  (
            <div className="Header">

           </div>
        );
}

const mapStatetoProps = (state) => ({
    state: state.map
})

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStatetoProps, mapDispatchToProps)(Header);
