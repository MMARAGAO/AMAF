import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
// icone de luppa fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const markers = [
    {
        id: 1,
        lat: -15.820544,
        lng: -47.987511,
        especie: 'Banana',
        foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/800px-Bananas.jpg',
        referencia: 'Perto do ponto de ônibus'
    },
    {
        id: 2,
        lat: -15.818453,
        lng: -47.980996,
        especie: 'Maçã',
        foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg',
        referencia: 'Perto do ponto de ônibus'
    },
    {
        id: 3,
        lat: -15.812647,
        lng: -47.988234,
        especie: 'Pera',
        foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pear.jpg/800px-Pear.jpg',
        referencia: 'Perto do ponto de ônibus'
    }
];

const apiOptions = {
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC9sG2Y0ecW43vZXH09Q-FZwox7q4XWExA", // Substitua pela sua chave de API do Google Maps
    libraries: ['places'] // Adiciona a biblioteca Places
};

function Map() {
    const { isLoaded } = useJsApiLoader(apiOptions);

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 }); // valores padrão
    const [location, setLocation] = useState(null); // Estado para armazenar a localização do usuário
    const [selectedMarker, setSelectedMarker] = useState(null);
    const searchBoxRef = useRef(null); // Referência para o input de pesquisa

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                    setLocation({ lat: latitude, lng: longitude }); // Atualiza a localização do usuário
                },
                () => {
                    console.error("Error fetching location");
                }
            );
        }
    }, []);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const handleSearch = () => {
        const input = searchBoxRef.current.value;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: input }, (results, status) => {
            if (status === 'OK') {
                const { lat, lng } = results[0].geometry.location;
                setCenter({ lat: lat(), lng: lng() });
                map.panTo({ lat: lat(), lng: lng() });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };

    return isLoaded ? (
        <div>
            <div className='w-full absolute z-10 p-10 flex justify-center items-center'>
                <div className='bg-white py-2 px-8 rounded-full flex w-full justify-between opacity-80'>
                    <input
                        type="text"
                        ref={searchBoxRef}
                        placeholder="Pesquisar o lugar..."
                        className='focus:outline-none w-full'

                    ></input>
                    <button onClick={handleSearch} className='flex bg-gray-200 p-2 rounded-full hover:bg-gray-300'>
                        <FontAwesomeIcon icon={faSearch} className='w-5 h-5' />
                    </button>
                </div>
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    styles: [
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                }}
            >
                {location && (
                    <Marker
                        position={location}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }}
                    />
                )}

                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        }}
                        onClick={() => {
                            setSelectedMarker(marker);
                        }}
                    />
                ))}

                {selectedMarker && (
                    <InfoWindow
                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                        onCloseClick={() => {
                            setSelectedMarker(null);
                        }}
                    >
                        <div>
                            <h2>{selectedMarker.especie}</h2>
                            <p>{selectedMarker.referencia}</p>
                            <img src={selectedMarker.foto} alt={selectedMarker.especie} style={{ width: '100px' }} />
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    ) : <></>;
}

export default Map;
