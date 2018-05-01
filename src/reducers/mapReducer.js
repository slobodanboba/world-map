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
    imageLat: 0,
    imageLon: 0,
    imageLatRound: 0,
    imageLonRound: 0,
    index: 0,
    imageOffsetTop: 0,
    imageOffsetLeft: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        default:
            return state;
    }
};
