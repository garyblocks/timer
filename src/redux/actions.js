import {
    ADD_CLOCK, REMOVE_CLOCK, SORT_CLOCKS, UPDATE_NAME, UPDATE_TIME, UPDATE_STAT,
    TOGGLE_ICON, TOGGLE_FIRST
} from "./actionTypes";

let nextClockId = 0;

export const addClock = secs => ({
    type: ADD_CLOCK,
    payload: {
        id: ++nextClockId,
        secs
    }
})

export const removeClock = id => ({
    type: REMOVE_CLOCK,
    payload: { id }
})

export const sortClocks = ids => ({
    type: SORT_CLOCKS,
    payload: { ids }
})

export const updateName = (id, name) => ({
    type: UPDATE_NAME,
    payload: {
        id: id,
        new_name: name
    }
})

export const updateTime = (id, time) => ({
    type: UPDATE_TIME,
    payload: {
        id: id,
        new_time: time
    }
})

export const updateStat = (id, stat) => ({
    type: UPDATE_STAT,
    payload: {
        id: id,
        new_stat: stat
    }
})

export const toggleIcon = (id, value) => ({
    type: TOGGLE_ICON,
    payload: {
        id: id,
        value: value
    }
})

export const toggleFirst = (id, value) => ({
    type: TOGGLE_FIRST,
    payload: {
        id: id,
        value: value
    }
})
