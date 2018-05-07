import React from 'react';
import ListItem from "./listItem"
import {connect} from "react-redux";
import {deleteAll, deleteListItem } from "../actions/actions";
import Search from "./inputSearch";

const List = (props) => {
   const onDelete = () => {
        let ckecked = document.querySelectorAll('#checkBox');
        let checkedArray = [...ckecked];
        let indexes = checkedArray.map((e, i) => !e.checked ? i : '').filter(String)
        props.deleteListItem({indexes: indexes});
        checkedArray.map(e => e.checked = false)
    }

    const onDeleteAll = () => {
        props.deleteAll();
    }

        let list = props.city;
        let listItems = list.sort((a, b) => b.index - a.index).map((city,i) =>
                (
                    <li key={i} className="listItem"><ListItem className="liItem" city={city} /></li>
                )
            );
        return  (
                <div className="wrapper">
                  <Search />
                    <h2>RECENT PLACES</h2>
                    <p></p>
                <ul className="list">
                    {listItems}
                </ul>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onDeleteAll}>Delete All</button>
            </div>
        );
}

const mapStatetoProps = (state) => ({
    state: state.map
})

const mapDispatchToProps = (dispatch) => ({
    deleteListItem: (indexes) => dispatch(deleteListItem(indexes)),
    deleteAll: () => dispatch(deleteAll()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(List);
