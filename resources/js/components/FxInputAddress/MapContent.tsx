import { useState, useRef, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { hasValue } from '../../utils';
import React from 'react';

const apiKey: any = process.env.REACT_APP_GMAP_KEY2

/**
 * @function MapContent
 * @description Componente de mapa con buscador para hacerlo mas dinamico
 * @return ReactComponent
  */
export const MapContent = () => {
  const [load, setLoad] = useState<boolean>(false)
  const [valueSearch, setValueSearch] = useState<string>('')
  const [listAutocomplete, setListAutocomplete] = useState<any[]>([])
  const [session, setSession] = useState<any>(null)
  const [addressObject, setAddressObject] = useState<any>(null)


  const map: any = useRef(null)
  const displayMap: any = useRef(false)
  const form: any = useRef({ lat: null, lng: null })
  const googleMaps: any = useRef(null)
  const marker: any = useRef(null)
  const searchMap: any = useRef(null)

  useEffect(() => {
    if (!displayMap.current) {
      displayMap.current = true
      mapLoading()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchOptions = async (value: string) => {
    try {
      const list: any = await placesSites({
        input: value
      })
      setListAutocomplete(list)
      setLoad(false)
      // this.checkStringList = await this.geocodeSites({ address: this.searchAddress });
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Si da click en el mapa y o mueve el marcador
   */
  const getCoordsPoint = async ({ lat, lng }: any) => {
    // return await axiosPrivate.post('/base/maps/api/', {
    //   url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat()},${lng()}`
    // })
  }

  /**
   * Si selecciona un opcion de autocomplete
   */
  const positionSelected = async (address: any) => {
    // setValueSearch()
    if (address?.place_id) {
      // const results = await axiosPrivate.post('/base/maps/api/', {
      //   url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=4.669355544411266,-74.05233668315859"
      // })
      const results: any = await geocodeSites({ placeId: address.place_id })
      saveLocation(results)
      setListAutocomplete([])
      const temporal = results[0]
      const lat =
        typeof temporal?.geometry.location.lat === 'function'
          ? temporal?.geometry.location.lat()
          : temporal?.geometry.location.lat
      const lng =
        typeof temporal?.geometry.location.lng === 'function'
          ? temporal?.geometry.location.lng()
          : temporal?.geometry.location.lng

      pointToMap({ lat, lng })
    }
  }

  const geocodeSites = async ({ address, placeId }: any) => {
    // if (enviroment.REACT_APP_ENV !== 'production') console.log('🚀 ~ file: FxInputAddress.tsx ~ line 77 ~ geocodeSites ~ option', address)
    return new Promise((resolve) => {
      const geocoder = new googleMaps.current.Geocoder()
      const config: any = { address, placeId }
      if (!placeId) {
        config.componentRestrictions = {
          country: 'US' // Restricted for Colombia
        }
      }
      geocoder.geocode(config, (results: any, status: any) => {
        if (status === 'OK') {
          resolve(results)
        } else {
          console.log(
            'Geocode was not successful for the following reason: ' + status
          )
          resolve([])
        }
      })
    })
  }

  const getPosition = () => {
    if (navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(resolve, (error) => {
          let reason = ''
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reason = 'User denied the request for Geolocation.'
              break
            case error.POSITION_UNAVAILABLE:
              reason = 'Location information is unavailable.'
              break
            case error.TIMEOUT:
              reason = 'The request to get user location timed out.'
              break
          }
          resolve({ error: 'Problem with geolocation', reason })
        })
      })
    }
    return Promise.resolve({
      error: 'Geolocation is not supported',
      reason: ''
    })
  }

  const placesSites = async ({ input }: any) => {
    if (!googleMaps.current) await launchGoogleMaps()
    return new Promise((resolve) => {
      const service = new googleMaps.current.places.AutocompleteService()

      const config = {
        input,
        sessionToken: session,
        fields: ['formatted_address'],
        language: 'es',
        componentRestrictions: {
          country: 'CO'// Restricted for Colombia
        }
      }
      service.getPlacePredictions(config, (predictions: any, status: any) => {
        if (
          status !== googleMaps.current.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          return resolve([])
        }
        resolve(predictions)
      })
    })
  }

  const changeView = () => {
    console.log(addressObject)
  }

  const saveLocation = (addressComponentsList: any) => {
    console.log('🚀 addressComponentsList', addressComponentsList)
    const objectPoint: any = {}
    if (hasValue(addressComponentsList)) {
      let roofTop = addressComponentsList.find(
        (elm: any) =>
          elm.types.includes('street_address') ||
          elm.types.includes('street_number') ||
          elm.types.includes('premise') ||
          elm.types.includes('establishment') ||
          elm.types.includes('store') ||
          elm.types.includes('food') ||
          elm.types.includes('point_of_interest') ||
          elm.types.includes('route') ||
          elm.types.includes('postal_code')

      )
      let roofState = addressComponentsList.find(
        (elm: any) =>
          elm.types.includes('street_address') ||
          elm.types.includes('street_number') ||
          elm.types.includes('route') ||
          elm.types.includes('political')
      )

      if (!roofState) roofState = addressComponentsList[0]
      if (!roofTop) roofTop = addressComponentsList[0]

      objectPoint.placeId = roofTop.place_id
      objectPoint.zip = (roofTop?.address_components || []).find((elm: any) =>
        elm.types.includes('postal_code')
      )
      objectPoint.zip = objectPoint.zip = objectPoint.zip?.long_name ? Number(objectPoint.zip.long_name) : null
      objectPoint.neighborhoods = (roofTop?.address_components || []).find((elm: any) =>
        elm.types.includes('neighborhood')
      )?.long_name
      objectPoint.location = (roofTop?.address_components || []).find((elm: any) =>
        elm.types.includes('sublocality')
      )?.long_name
      objectPoint.city = (roofState?.address_components || []).find((elm: any) =>
        elm.types.includes('locality')
      )?.long_name

      objectPoint.state = (roofState?.address_components || []).find((elm: any) =>
        elm.types.includes('administrative_area_level_1')
      )?.long_name

      objectPoint.country = (roofTop?.address_components || []).find((elm: any) =>
        elm.types.includes('country')
      )?.long_name

      objectPoint.neighborhoods = objectPoint.neighborhoods || objectPoint.city
      objectPoint.location = objectPoint.location || objectPoint.city

      objectPoint.address = roofTop?.formatted_address || ''
      setValueSearch(objectPoint.address)

      const lat =
        typeof roofTop?.geometry.location.lat === 'function'
          ? roofTop?.geometry.location.lat()
          : roofTop?.geometry.location.lat

      const lng =
        typeof roofTop?.geometry.location.lng === 'function'
          ? roofTop?.geometry.location.lng()
          : roofTop?.geometry.location.lng
      objectPoint.lat = lat
      objectPoint.lng = lng
      setAddressObject(objectPoint)
    }
  }

  const pointToMap = async ({ lng, lat }: any) => {
    if (lng && lat) {
      const center = new googleMaps.current.LatLng(lat, lng)
      map.current.setCenter({ lng, lat })
      setMapPin(center)
    }
  }

  const mapLoading = async () => {
    if (hasValue(form.current.lat) && hasValue(form.current.lng)) {
      await createPotitionedMap(form.current)
    } else {
      // let position: any = await getPosition()
      // if (position.error) {
      //   console.error(position.error)
      const position = {
        coords: {
          latitude: 4.6740454,
          longitude: -74.0532236
        }
      }
      // }
      try {
        await createPotitionedMap({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      } catch (error) {
        console.error(error)
      }
    }

    createPotitionedMap(form.current)
  }

  const launchGoogleMaps = async () => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    })
    const google = await loader.load()
    googleMaps.current = google.maps
    setSession(google.maps.places.AutocompleteSessionToken())
    return google
  }

  const createPotitionedMap = async ({ lat, lng }: any, withoutInitialPin: boolean = false) => {
    if (!hasValue(lat)) return
    if (!hasValue(googleMaps.current)) await launchGoogleMaps()
    const center: any = { lat, lng }
    map.current = new googleMaps.current.Map(document.getElementById('googlemap'), {
      center,
      zoom: 15
    })

    map.current.addListener('click', (mapsMouseEvent: any) =>
      setMapPin(mapsMouseEvent.latLng, true)
    )
    if (!withoutInitialPin) setMapPin(center)
  }

  const getPositionHandler = async () => {
    let position: any = await getPosition()
    if (position.error) {
      console.error(position.error)
      position = {
        coords: {
          latitude: 4.6740454,
          longitude: -74.0532236
        }
      }
    }
    try {
      pointToMap({ lat: position.coords.latitude, lng: position.coords.longitude })
    } catch (error) {
      console.error(error)
    }
  }

  const setMapPin = async (position: any, withForm ?: any) => {
    if (hasValue(marker.current)) marker.current.setMap(null)
    const icon = {
      url: '/assets/images/fx-marker.svg',
      size: new googleMaps.current.Size(49, 76)
    }
    marker.current = new googleMaps.current.Marker({
      position,
      icon,
      map: map.current
    })

    if (withForm) {
      form.current = position
      const { data }: any = await getCoordsPoint(position)
      saveLocation(data.results)
    }
  }

  const onChangeSearch = (ev: any) => {
    setLoad(true)
    setValueSearch(ev.target.value)

    if (ev.target.value.length < 1) {
      setLoad(false)
      return
    }

    clearTimeout((window as any).timeSearch);
    (window as any).timeSearch = setTimeout(() => {
      searchOptions(ev.target.value)
    }, 700)
  }

  return (
    <>
      <div className='mapContainer'>
        <div className='search-input' ref={searchMap}>
          <input
            type='text'
            value={valueSearch}
            placeholder='Ingresa acá la ciudad'
            name='address-component'
            onChange={onChangeSearch}
            onBlur={onChangeSearch}
          />
          <svg className='search-icon'>
            <use xlinkHref='#svg-fx-search' />
          </svg>
          {
            (listAutocomplete.length > 0 || load) &&
              load
              ? <div className='search-input-results load'><div className='loader-box' /></div>
              : listAutocomplete.length > 0 && (
                <div className='search-input-results'>
                  {
                    listAutocomplete.map((x: any, index: number) =>
                      <div key={index} className='search-input-result-item' onClick={() => positionSelected(x)}>
                        <svg className='icon'>
                          <use xlinkHref='#svg-fx-location' />
                        </svg>
                        <span>{x.description}</span>
                      </div>
                    )
                  }
                </div>)
          }
        </div>

        <div className='addressDialogTopActions' onClick={getPositionHandler}>
          <svg className='search-icon'>
            <use xlinkHref='#svg-fx-my-location' />
          </svg>
          <span>Encuéntrame</span>

          <div className='FxInputAddressActions'>
            <button className='bttn' disabled={!hasValue(addressObject)} onClick={() => changeView()}>VER MÁS DETALLES</button>
          </div>
        </div>

        <div className='googlemapWrapper'>
          <div id='googlemap' />
        </div>
      </div>
    </>
  )
}

/**
 * @module Pages/Authenticated/Layout/Form/FxInputAddress
 */
