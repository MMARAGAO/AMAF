import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

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
    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [searchLocation, setSearchLocation] = useState(null);

    const mapRef = useRef();

    const search = async (address) => {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
        setSuggestions(response.data);
    };

    const handleSelect = (place) => {
        setSearchLocation({
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon)
        });
        setAddress(place.display_name);

        // Limpar a lista de sugestões
        setSuggestions([]);

        // Definir a localização do mapa para o local selecionado
        mapRef.current.flyTo([parseFloat(place.lat), parseFloat(place.lon)], 18);
    };

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
                <div className='fixed top-0 w-full top-8 px-10 py-2 opacity-80 '>
                    <input
                        className='w-full rounded-xl px-2 py-2 shadow-xl'
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            search(e.target.value);
                        }}
                        placeholder="Digite um endereço"
                    />
                    <div className='bg-white space-y-2 overflow-auto max-h-80 mx-2'>
                        {suggestions.map(suggestion => (
                            <div className='cursor-pointer border-b bg-white my-2'
                                key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
                                {suggestion.display_name.split(',').slice(0, 2).join(',')}
                            </div>
                        ))}
                    </div>
                </div>
                {location && (
                    <MapContainer ref={mapRef} center={location} zoom={20} className='w-full h-screen -z-10'>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={location}>
                            <Popup>
                                Você está aqui.
                            </Popup>
                        </Marker>
                        {searchLocation && (
                            <Marker position={searchLocation}>
                                <Popup>
                                    Local Pesquisado
                                </Popup>
                            </Marker>
                        )}
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
