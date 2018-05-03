import { deleteListItem } from '../actions/actions'

const defaultState = {
    imageTime: 0,
    worldPlace: '',
    countryShortName: '',
    suffix: "px",
    savedcities: [],
    wheatherAllWorld: 0,
    wheatherAllWorldF: 0,
    offsetWorld: 0,
    wheatherIconWorld: '',
    zoombool: false,
    maxlat: 0,
    minlon: 0,
    maxColumn: 0,
    maxRow: 0,
    day: '',
    curentHour: 0,
    curentMin: 0,
    offsetHoursWorld: 0,
    guadalajaraHours: 0,
    curentHourWorld: 0,
    index: 0,
    imageOffsetTop: 0,
    imageOffsetLeft: 0,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'INDEX_PLUS':
            return {
                ...state,
                index: state.index + 1
            };
        case 'DELETE_ALL':
            return {
                ...state,
                savedcities: []
            };
        case 'DELETE_LIST_ITEM':
            let newArray = [];
            action.indexes.map(city => newArray.push(state.savedcities[city]));
           return {
           ...state,
               savedcities : newArray
           };
        case 'PUSH_TO_LIST':
            return {
                ...state,
                savedcities:  [...state.savedcities, action.li ]
            };
        case 'ZOOMBOOL_FALSE':
            return {
                ...state,
                zoombool: false
            };
        case 'ZOOMBOOL_TRUE':
            return {
                ...state,
                zoombool: true
            };
        case 'MAX_LAT':
            console.log(action.maxlat)
            return {
                ...state,
                maxlat: action.maxlat
            };
        case 'MIN_LON':
            console.log(action.minlon)
            return {
                ...state,
                minlon: action.minlon
            };
        case 'CURENT_HOUR':
            console.log(action.hour)
            return {
                ...state,
                curentHour: action.hour
            };
        case 'CURENT_DAY':
            console.log(action.day)
            return {
                ...state,
                day: action.day
            };
        default:
            return state;
    }
};
