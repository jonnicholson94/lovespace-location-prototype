
import { useState, useEffect } from "react"

const Home = () => {

  const [location, setLocation] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 })
  const [destination, setDestination] = useState({ lat: 51.4992, lon: -0.0929 });
  const [error, setError] = useState("")
  const [valid, setValid] = useState("Awaiting location")

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000; // Earth radius in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  }

  const getLocation = (position: any) => {
    console.log("Running...")
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocation({ latitude, longitude })

  }

  const handleError = () => {
    setError("There was a problem getting your location")
  }

  const checkLocation = () => {
    console.log("Running check location...")
    navigator.geolocation.getCurrentPosition(getLocation, handleError);
  }

  useEffect(() => {
    const radius = 100; // in meters
    const distance = calculateDistance(location.latitude, location.longitude, destination.lat, destination.lon);

    if (distance <= radius) {
      setValid("You're within radius")
    } else {
      setValid("You're not within radius")
    }
  }, [location])

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <button className="h-[50px] w-[200px] text-[#fff] font-bold bg-[#000]" onClick={() => checkLocation()}>Get location</button>

      <a href={`https://www.openstreetmap.org/#map=18/${location.latitude}/${location.longitude}`} target="_blank" className="h-auto w-[200px] mt-[30px]">
        <p className="font-bold">Your coordinates</p>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
      </a>
      <a href={`https://www.openstreetmap.org/#map=18/51.4992/-0.0929`} target="_blank" className="h-auto w-[200px] mt-[30px]">
        <p className="font-bold">Cole Street coordinates</p>
        <p>Latitude: {`51.4992`}</p>
        <p>Longitude: {`-0.0929`}</p>
      </a>

      <p className="underline mt-[30px]">{valid}</p>

    </div>
  )
}

export default Home