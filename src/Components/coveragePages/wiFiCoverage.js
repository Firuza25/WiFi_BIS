import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const fakeWifiData = [
  { id: 1, download_speed: "37.08", upload_speed: "6.50", ping: "22" },
  { id: 2, download_speed: "45.12", upload_speed: "10.12", ping: "18" },
  { id: 3, download_speed: "52.99", upload_speed: "8.56", ping: "20" },
];

const SavedLocationCard = ({ location, onNameChange }) => {
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <input
        type="text"
        value={location.name}
        onChange={(e) => onNameChange(location.id, e.target.value)}
        style={{ fontSize: "1.2rem", padding: "5px", width: "100%" }}
      />
      <p>
        Местоположение: ({location.location.lat.toFixed(4)},{" "}
        {location.location.lng.toFixed(4)})
      </p>
      <p>Скорость загрузки: {location.download_speed} Mbps</p>
      <p>Скорость загрузки: {location.upload_speed} Mbps</p>
    </div>
  );
};

const WiFiCoverage = () => {
  const [connectionStatus, setConnectionStatus] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [location, setLocation] = useState(null);
  const [wifiLocations, setWifiLocations] = useState([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setConnectionStatus("Не удалось получить ваше местоположение.");
        }
      );
    } else {
      setConnectionStatus("Геолокация не поддерживается вашим браузером.");
    }
  };

  const checkConnection = () => {
    if (navigator.onLine) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      setNetworkName(
        connection?.type === "wifi" ? connection.effectiveType : "Wi-Fi"
      );
      setConnectionStatus(`Вы подключены к Wi-Fi: ${networkName}`);
      getLocation();
    } else {
      setConnectionStatus("Вам нужно подключиться к интернету.");
    }
  };

  const initializeMap = () => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(
        [location.lat, location.lng],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance.current);

      L.marker([location.lat, location.lng])
        .addTo(mapInstance.current)
        .bindPopup("Ваше местоположение")
        .openPopup();

      setIsMapLoaded(true);
    }
  };

  useEffect(() => {
    if (location && !mapInstance.current) {
      initializeMap();
    }
  }, [location]);

  const showWifiLocations = () => {
    if (isMapLoaded && wifiLocations.length > 0 && mapInstance.current) {
      wifiLocations.forEach((wifiLocation) => {
        const marker = L.marker([wifiLocation.lat, wifiLocation.lng], {
          icon: L.icon({
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-green.png",
          }),
        })
          .addTo(mapInstance.current)
          .bindPopup(
            `Скорость загрузки: ${wifiLocation.download_speed} Mbps <br> Скорость загрузки: ${wifiLocation.upload_speed} Mbps <br> Пинг: ${wifiLocation.ping} ms`
          );

        setSavedLocations((prevSavedLocations) => [
          ...prevSavedLocations,
          {
            id: wifiLocation.id,
            name: `Точка ${wifiLocation.id}`,
            location: { lat: wifiLocation.lat, lng: wifiLocation.lng },
            download_speed: wifiLocation.download_speed,
            upload_speed: wifiLocation.upload_speed,
          },
        ]);
      });
    }
  };

  const generateAndShowWifiLocations = () => {
    if (location) {
      const generatedLocations = fakeWifiData.map((wifi, index) => {
        const randomLat = location.lat + (Math.random() - 0.5) * 0.0004;
        const randomLng = location.lng + (Math.random() - 0.5) * 0.0004;
        return { id: index + 1, lat: randomLat, lng: randomLng, ...wifi };
      });
      setWifiLocations(generatedLocations);
      showWifiLocations();
    }
  };

  const handleNameChange = (id, newName) => {
    setSavedLocations((prevSavedLocations) =>
      prevSavedLocations.map((location) =>
        location.id === id ? { ...location, name: newName } : location
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "50px",
      }}
    >
      <div style={{ flex: 1, padding: "20px", borderRight: "2px solid #ccc" }}>
        <h2>Сохранённые точки Wi-Fi</h2>
        {savedLocations.length > 0 ? (
          savedLocations.map((loc, index) => (
            <SavedLocationCard
              key={index}
              location={loc}
              onNameChange={handleNameChange}
            />
          ))
        ) : (
          <p>Здесь будут отображаться ваши сохранённые точки.</p>
        )}
      </div>

      <div style={{ flex: 3, textAlign: "center" }}>
        <h1>Проверка подключения к Wi-Fi</h1>
        <button
          onClick={checkConnection}
          style={{
            backgroundColor: "#9b4dff",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "1.25rem",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(155, 77, 255, 0.8)",
            transition: "all 0.3s ease",
            border: "none",
          }}
        >
          Проверка подключения
        </button>

        <div
          style={{ marginTop: "20px", fontSize: "1.2rem", fontWeight: "bold" }}
        >
          {connectionStatus && <p>{connectionStatus}</p>}
        </div>

        {isMapLoaded && (
          <button
            onClick={generateAndShowWifiLocations}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "1.25rem",
              cursor: "pointer",
              marginTop: "20px",
              border: "none",
            }}
          >
            Показать точки Wi-Fi
          </button>
        )}

        <div
          ref={mapRef}
          style={{ height: "500px", width: "100%", marginTop: "30px" }}
        ></div>

        <Link
          to="/advicePart"
          style={{
            display: "inline-block",
            marginTop: "30px",
            textDecoration: "none",
          }}
        >
          <button
            style={{
              backgroundColor: "#ffc107",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "1.25rem",
              cursor: "pointer",
              border: "none",
            }}
          >
            Перейти к рекомендациям
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WiFiCoverage;
