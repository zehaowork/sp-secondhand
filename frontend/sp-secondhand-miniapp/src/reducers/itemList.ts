import { FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILED } from "src/actions/itemList";

const INITIAL_STATE = {
    itemList: [],
    error: ''
}

export default function getItems(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                itemList: action.payload.items,
                error: ''
            }
        case FETCH_ITEMS_FAILED:
            return {
                ...state,
                itemList: [],
                error: action.payload.error
            }
        default:
            return state    
    }
}
