import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet'; // Импортируем библиотеку Leaflet
import 'leaflet/dist/leaflet.css'; // Импорт стилей для карты

const WiFiCoverage = () => {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [location, setLocation] = useState(null); // Состояние для хранения текущего местоположения
  const [wifiLocations, setWifiLocations] = useState([]); // Состояние для хранения мест с хорошим сигналом
  const [isMapLoaded, setIsMapLoaded] = useState(false); // Состояние для отслеживания загрузки карты
  const [activeMarker, setActiveMarker] = useState(null); // Состояние для активного маркера
  const [markerName, setMarkerName] = useState(''); // Состояние для имени маркера
  const mapRef = useRef(null); // Ссылка на контейнер карты
  const mapInstance = useRef(null); // Ссылка на экземпляр карты

  // Функция для получения геолокации
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
          setConnectionStatus('Не удалось получить ваше местоположение.');
        }
      );
    } else {
      setConnectionStatus('Геолокация не поддерживается вашим браузером.');
    }
  };

  // Функция для проверки подключения
  const checkConnection = () => {
    if (navigator.onLine) {
      if (navigator.connection) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        setNetworkName(connection.type === 'wifi' ? connection.effectiveType : 'Wi-Fi');
      }
      setConnectionStatus(`Вы подключены к Wi-Fi: ${networkName}`);
      getLocation();  // Получаем местоположение после проверки подключения
    } else {
      setConnectionStatus('Вам нужно подключиться к интернету.');
    }
  };

  // Генерация случайных точек поблизости (не более 40 метров)
  const generateRandomLocations = (lat, lng) => {
    const locations = [];
    for (let i = 0; i < 3; i++) {
      const randomLat = lat + (Math.random() - 0.5) * 0.0004; // 40 метров по широте
      const randomLng = lng + (Math.random() - 0.5) * 0.0004; // 40 метров по долготе
      locations.push({ lat: randomLat, lng: randomLng });
    }
    return locations;
  };

  // Функция для отрисовки карты, если она еще не была создана
  const initializeMap = () => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([location.lat, location.lng], 13);

      // Добавляем слой OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      // Добавляем маркер для текущего местоположения
      L.marker([location.lat, location.lng]).addTo(mapInstance.current)
        .bindPopup('Ваше местоположение')
        .openPopup();

      setIsMapLoaded(true);
    }
  };

  // Вызов функции инициализации карты при изменении местоположения
  useEffect(() => {
    if (location && !mapInstance.current) {
      initializeMap();
    }
  }, [location]);

  // Функция для отображения точек с хорошим Wi-Fi сигналом
  const showGoodWifiLocations = () => {
    if (isMapLoaded && wifiLocations.length > 0 && mapInstance.current) {
      wifiLocations.forEach((wifiLocation, index) => {
        const marker = L.marker([wifiLocation.lat, wifiLocation.lng], {
          icon: L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-green.png'
          }) // Зеленый флажок
        })
          .addTo(mapInstance.current)
          .bindPopup('Хорошее место для Wi-Fi');

        // Сохраняем ссылку на маркер и добавляем обработчик клика для ввода названия
        marker.on('click', () => {
          setActiveMarker(marker);
        });
      });
    }
  };

  // Функция для отрисовки случайных точек с хорошим Wi-Fi сигналом
  const generateAndShowWifiLocations = () => {
    if (location) {
      const randomLocations = generateRandomLocations(location.lat, location.lng);
      setWifiLocations(randomLocations);
      showGoodWifiLocations(); // Показываем эти точки на карте
    }
  };

  // Функция для сохранения имени маркера
  const saveMarkerName = () => {
    if (activeMarker && markerName) {
      activeMarker.bindPopup(markerName).openPopup(); // Присваиваем название маркеру
      setActiveMarker(null); // Сбрасываем активный маркер
      setMarkerName(''); // Очищаем поле ввода
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Проверка подключения к Wi-Fi</h1>
      <button
        onClick={checkConnection}
        style={{
          backgroundColor: '#9b4dff',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1.25rem',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(155, 77, 255, 0.8)',
          transition: 'all 0.3s ease',
          border: 'none',
        }}
      >
        Проверка подключения
      </button>

      <div style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
        {connectionStatus && <p>{connectionStatus}</p>}
      </div>

      {/* Кнопка для отображения мест с хорошим сигналом Wi-Fi */}
      {isMapLoaded && (
        <button
          onClick={generateAndShowWifiLocations}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1.25rem',
            cursor: 'pointer',
            marginTop: '20px',
            boxShadow: '0 0 10px rgba(40, 167, 69, 0.8)',
            transition: 'all 0.3s ease',
            border: 'none',
          }}
        >
          Где ловит мой Wi-Fi хорошо?
        </button>
      )}


      {activeMarker && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={markerName}
            onChange={(e) => setMarkerName(e.target.value)}
            placeholder="Введите название для места"
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={saveMarkerName}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '8px',
              marginLeft: '10px',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Сохранить
          </button>
        </div>
      )}


      {location && (
        <div style={{ width: '100%', height: '400px', marginTop: '20px' }} ref={mapRef}></div>
      )}
    </div>
  );
};

export default WiFiCoverage;
