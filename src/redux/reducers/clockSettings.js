import { 
    ADD_CLOCK, REMOVE_CLOCK, SORT_CLOCKS, UPDATE_NAME, UPDATE_TIME, UPDATE_STAT,
    TOGGLE_ICON, TOGGLE_FIRST
} from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_CLOCK: {
            const {id, secs} = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        secs: secs,
                        name: "New Clock",
                        time: 0,
                        stat: "RUN",
                        icon: true,
                        first: true
                    }
                }
            };
        }
        case REMOVE_CLOCK: {
            const { id } = action.payload;
            return {
                ...state,
                allIds: state.allIds.filter((clock_id, index) => clock_id !== id)
            };
        }
        case SORT_CLOCKS: {
            const { ids } = action.payload;
            return {
                ...state,
                allIds: ids
            };
        }
        case UPDATE_NAME: {
            const { id, new_name } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: { 
                        ...state.byIds[id],
                        name: new_name
                    }
                }
            };
        }
        case UPDATE_TIME: {
            const { id, new_time } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: { 
                        ...state.byIds[id],
                        time: new_time
                    }
                }
            };
        }
        case UPDATE_STAT: {
            const { id, new_stat } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: { 
                        ...state.byIds[id],
                        stat: new_stat
                    }
                }
            };
        }
        case TOGGLE_ICON: {
            const { id, value } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: { 
                        ...state.byIds[id],
                        icon: value
                    }
                }
            };
        }
        case TOGGLE_FIRST: {
            const { id, value } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: { 
                        ...state.byIds[id],
                        first: value
                    }
                }
            };
        }
        default:
            return state;
    }
}
