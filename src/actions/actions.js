
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
export const zoomboolFalse = () => ({
    type: 'ZOOMBOOL_FALSE'
});
export const zoomboolTrue = () => ({
    type: 'ZOOMBOOL_TRUE'
});
export const maxLat = ({max} = {}) => ({
    type: 'MAX_LAT',
    maxlat:max
});
export const minLon = ({min} = {}) => ({
    type: 'MIN_LON',
    minlon:min
});

export const curentHour = ({hour} = {}) => ({
    type: 'CURENT_HOUR',
    hour:hour
});

export const dayWorld = ({day} = {}) => ({
    type: 'CURENT_DAY',
    day: day
});



