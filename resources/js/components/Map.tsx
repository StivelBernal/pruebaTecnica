import React from 'react'
import ReactDom from 'react-dom'
import { MapContent } from './MapContent/MapContent'
import { MapProvider } from '../context/MapContext';

function Map(data : any) {
 
  return (
    <MapProvider dataDefault={data}>
      <div className='Map'>
        <MapContent />
      </div>
    </MapProvider>

  )
}

export default Map

document.querySelectorAll('.MapComponent').forEach((element: any) => {
  ReactDom.render(<Map data={JSON.parse(element.dataset.cities)} />, element)
})

