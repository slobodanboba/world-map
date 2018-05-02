
export const deleteListItem = ({indexes} = {}) => ({
    type: 'DELETE_LIST_ITEM',
    indexes: indexes
});

export const deleteAll = () => ({
    type: 'DELETE_ALL'
});

export const pushToList = ({li} = {}) => ({
    type: 'PUSH_TO_LIST',
    li: li
});
export const indexPlus = () => ({
    type: 'INDEX_PLUS'
});

