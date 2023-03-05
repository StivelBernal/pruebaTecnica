export interface MapState {
    dataLocationDefault: any[];
}

type AuthAction = 
        | { type: 'setDataLotationDefault', payload: any[] }
        
export const MapReducer = ( state: MapState, action: AuthAction ): MapState => {
    
    switch (action.type) {

        case 'setDataLotationDefault':
            return {
                ...state,
                dataLocationDefault: action.payload,

            }
 
        default:
            return state;
    }

}
