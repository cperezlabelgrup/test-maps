import React, { useState, useEffect, useRef } from "react";
import {
  Map,
  APIProvider,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const initialCenter = { lat: 41.3851, lng: 2.1734 }; // Coordenadas iniciales de Cataluña

const mockFetchPoints = () => {
  return Promise.resolve([
    {
      id: 1,
      name: "Barcelona",
      lat: 41.3851,
      lng: 2.1734,
      description: "Este es un punto en Barcelona",
    },
    {
      id: 2,
      name: "Tarragona",
      lat: 41.1189,
      lng: 1.2445,
      description: "Este es un punto en Tarragona",
    },
    {
      id: 3,
      name: "Girona",
      lat: 41.9794,
      lng: 2.8214,
      description: "Este es un punto en Girona",
    },
    {
      id: 4,
      name: "Lleida",
      lat: 41.6176,
      lng: 0.62,
      description: "Este es un punto en Lleida",
    },
    {
      id: 5,
      name: "Manresa",
      lat: 41.7269,
      lng: 1.8227,
      description: "Este es un punto en Manresa",
    },
  ]);
};

const MapComponent = () => {
  const [points, setPoints] = useState([]); // Guardar los puntos
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(7); // Nivel inicial de zoom
  const mapRef = useRef(null); // Referencia al objeto del mapa

  useEffect(() => {
    mockFetchPoints().then((data) => {
      console.log("Puntos cargados:", data); // Verifica que los puntos tienen datos
      setPoints(data);
    });
  }, []);

  const handleMarkerClick = (point) => {
    setSelectedPoint(point);
  };

  const handleZoomChanged = () => {
    if (mapRef.current) {
      // Asegurarse de que la referencia del mapa existe antes de llamar a getZoom
      const currentZoom = mapRef.current.getZoom();
      setZoomLevel(currentZoom);
    }
  };

  return (
    <APIProvider apiKey="AIzaSyBdAGirMhR-tGB8HJjwPg4faAHKagXbp_I">
      <Map
        center={initialCenter}
        zoom={12}
        onZoomChanged={handleZoomChanged} // Llamar cuando cambia el zoom
      >
        {points.map((point) => (
          <Marker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            onClick={() => handleMarkerClick(point)}
          />
        ))}
        {selectedPoint && (
          <InfoWindow
            position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
            onCloseClick={() => setSelectedPoint(null)}
          >
            <div>
              <h4>{selectedPoint.name}</h4>
              <p>{selectedPoint.description}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
