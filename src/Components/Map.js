import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrigindo o problema do ícone do marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


// lista com id, longitude e latitude, especie ( de arvore que da fruto), foto, ponto de referencia
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

const MapComponent = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                console.error("Error watching position: ", error);
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <div className='relative h-full w-full'>
            <div className='absolute top-0 bottom-16 left-0 right-0'>
                {location && (
                    <MapContainer center={location} zoom={20} className='w-full h-screen -z-10'>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={location}>
                            <Popup>
                                Você está aqui.
                            </Popup>
                        </Marker>
                        {markers.map(marker => (
                            <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }}>
                                <Popup>
                                    <div>
                                        <h2>{marker.especie}</h2>
                                        <img src={marker.foto} alt={marker.especie} style={{ width: '100%' }} />
                                        <p>{marker.referencia}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                )}
            </div>
        </div>
    );
};

export default MapComponent;
