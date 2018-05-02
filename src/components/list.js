import React from 'react';
import ListItem from "./listItem"
import {connect} from "react-redux";
import {deleteAll, deleteListItem} from "../actions/actions";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
    }

    onDelete = () => {
        this.props.deleteListItem();
    }

    onDeleteAll = () => {
        this.props.deleteAll();
    }

    render() {
        let list = this.props.city;
        let listItems = list.sort((a, b) => b.index - a.index).map((city,i) =>
                (
                    <li><ListItem key={i} i={i} city={city} /></li>
                )
            );
        return  (
                <div className="wrapper">
                    <h2>RECENT PLACES</h2>
                    <p></p>
                <ul className="list">
                    {listItems}
                </ul>
                <button onClick={this.onDelete}>Delete</button>
                <button onClick={this.onDeleteAll}>Delete All</button>
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    state: state.map
})

const mapDispatchToProps = (dispatch) => ({
    deleteListItem: () => dispatch(deleteListItem()),
    deleteAll: () => dispatch(deleteAll()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(List);

