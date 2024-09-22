import {initValueKey, maxValueKey} from './store';

export const loadState = () => {
    try {
        const initValueKeyString = localStorage.getItem(initValueKey);
        const maxValueKeyString = localStorage.getItem(maxValueKey);
        if (!initValueKeyString || !maxValueKeyString) {
            return undefined;
        }
        return {
            counterInitValueReducer: JSON.parse(initValueKeyString),
            counterMaxValueReducer: JSON.parse(maxValueKeyString)
        }
    } catch (err) {
        return undefined;
    }
}