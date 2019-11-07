export const getClockState = store => store.clockSettings;

export const getClockList = store =>
    getClockState(store) ? getClockState(store).allIds : [];

export const getClockById = (store, id) =>
    getClockState(store) ? { ...getClockState(store).byIds[id], id } : {};

export const getClocks = store =>
     getClockList(store).map(id => getClockById(store, id));
