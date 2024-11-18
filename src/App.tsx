import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const API_KEY = "AIzaSyBdAGirMhR-tGB8HJjwPg4faAHKagXbp_I"; // Reemplaza con tu clave válida

// Marcadores de prueba para el área de Barcelona
const allMarkers = [
  { id: 1, position: { lat: 41.3851, lng: 2.1734 }, label: "Barcelona Centro" },
  { id: 2, position: { lat: 41.4086, lng: 2.1915 }, label: "Gràcia" },
  { id: 3, position: { lat: 41.3648, lng: 2.1452 }, label: "Sants" },
  { id: 4, position: { lat: 41.4415, lng: 2.1739 }, label: "Sant Andreu" },
  { id: 5, position: { lat: 41.3521, lng: 2.1126 }, label: "Les Corts" },
];

// Límites para el área de Barcelona
const barcelonaBounds = {
  north: 41.5, // Límite norte
  south: 41.3, // Límite sur
  west: 2.1, // Límite oeste
  east: 2.25, // Límite este
};

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); // Marcador seleccionado

  // Simulación de búsqueda (actualiza los marcadores)
  useEffect(() => {
    // Simula que recibimos los marcadores de Barcelona
    setMarkers(allMarkers);
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: "60vw", height: "60vh" }}
        defaultCenter={{ lat: 41.3851, lng: 2.1734 }} // Centrado en Barcelona
        defaultZoom={12} // Nivel de zoom inicial
        options={{
          restriction: {
            latLngBounds: barcelonaBounds, // Restricción de límites
            strictBounds: true, // Impedir salir de los límites
          },
          gestureHandling: "greedy", // Habilitar gestos dentro de los límites
          disableDefaultUI: false, // Mostrar controles básicos
        }}
      >
        {/* Renderizar los marcadores */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)} // Mostrar InfoWindow al hacer clic
          />
        ))}

        {/* InfoWindow para el marcador seleccionado */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)} // Cerrar InfoWindow
          >
            <div>
              <strong>{selectedMarker.label}</strong>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default App;
