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
            <div>
                {listItems}
            </div>
        );
    }
}


export default List;
