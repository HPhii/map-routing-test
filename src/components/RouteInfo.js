import React from 'react';
import { FaClock, FaRoute } from 'react-icons/fa';

function RouteInfo({ route }) {
  if (!route) return null;

  const distance = calculateDistance(route);
  const duration = estimateDuration(distance);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Thông tin tuyến đường</h3>
      <div style={styles.infoRow}>
        <FaRoute style={styles.icon} />
        <span style={styles.label}>Khoảng cách:</span>
        <span style={styles.value}>{distance.toFixed(2)} km</span>
      </div>
      <div style={styles.infoRow}>
        <FaClock style={styles.icon} />
        <span style={styles.label}>Thời gian ước tính:</span>
        <span style={styles.value}>{formatDuration(duration)}</span>
      </div>
    </div>
  );
}

function calculateDistance(route) {
  let distance = 0;
  for (let i = 1; i < route.length; i++) {
    const [lon1, lat1] = route[i - 1];
    const [lon2, lat2] = route[i];
    distance += getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  }
  return distance;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function estimateDuration(distance) {
  const averageSpeed = 30; // km/h
  return (distance / averageSpeed) * 60; // minutes
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours} giờ ${mins} phút`;
}

const styles = {
  card: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    fontSize: '1.5rem',
    color: '#4caf50',
    marginRight: '10px',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#555',
    marginRight: '5px',
  },
  value: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default RouteInfo;
