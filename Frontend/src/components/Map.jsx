import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import React from "react";

const Map = () => {
  return (
    <div className="h-[300px] w-[70%] rounded-xl overflow-hidden">
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.6139, 77.209]}>
          <Popup>
            Defence Bakery
            <br /> New Delhi
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
