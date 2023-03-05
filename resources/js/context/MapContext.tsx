import React, { createContext, useReducer } from 'react';
import { MapState, MapReducer, } from "./MapReducer";
import { useEffect } from 'react';
import { hasValue } from '../utils';

type MapContextProps = {
    dataLocationDefault: any[];
    setDataLotationDefault: (state: any[]) => void;
}

const initialState: MapState = {
    dataLocationDefault: []
}

const MapContext = createContext({} as MapContextProps);

export const MapProvider = ({ children, dataDefault }: any) => {

    useEffect(() => {
        if (hasValue(dataDefault)) {
            let cities = []
            for (const key in dataDefault.data) {
                cities.push({ ...dataDefault.data[key], ...{ name: key} })
            }
            console.log(cities)
            setDataLotationDefault(cities)
        }
    }, [dataDefault])
    
    const [state, dispatch] = useReducer(MapReducer, initialState);

    const setDataLotationDefault = (state: any[]) => {
        dispatch({ type: 'setDataLotationDefault', payload: state });
    };
    
    return (
        <MapContext.Provider value={{ 
            ...state,
            setDataLotationDefault
        }}>
            {children}
        </MapContext.Provider>
    )
}

export default MapContext;
