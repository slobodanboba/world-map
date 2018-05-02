import React from 'react';
import ListItem from "./listItem"

class List extends React.Component {

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
                <button onClick={this.props.onDeleteAll}>Delete All</button>
            </div>
        );
    }
}


export default List;
