import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import { MapContent } from './FxInputAddress/MapContent'

function Map() {
  useEffect(() => {
    // disable no existe
    console.log(process.env.MIX_MAPS_API, 'process.env.MIX_MAPS_API')
  }, [])
  
  return (
    <div className='Map'>
      <MapContent />
    </div>
  )
}

export default Map

ReactDom.render(<Map />, document.getElementById('MapComponent'))

