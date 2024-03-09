import React, { useEffect, useState } from "react";
import Load from "./Loading";
import "bootstrap/dist/css/bootstrap.css";
import Host from "../images/Host.png";
import Loc from "../images/loc.svg";
import bell from "../images/bell.svg";

const Hospitals = () => { 
  const [hospitalData, setHospitalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {   
    document.title = "Hospitals | HEAN";
  }, []);

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + "\nLongitude: " + longitude);

    fetch(`http://localhost/app-back/api/nearest_hospitals/${latitude}/${longitude}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched hospital data:", data);
        setHospitalData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching hospital data:', error);
        setError(error);
        setLoading(false);
      });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, error => {
        console.error('Error getting geolocation:', error);
        setError(error);
        setLoading(false);
      });
    } else {
      const error = new Error("Geolocation is not supported by this browser.");
      console.error(error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Load show={loading} />
      {error && <div>Error: {error.message}</div>}
      <div id="hospitalInfo">
        {hospitalData.map((hospital, index) => (
          <div key={index} className="box">
            <div className="card">
              <img src={Host} className="card-img-top" alt="Hospital" />
              <div className="card-body">
                <div className="txt-left">
                  <h1>{hospital.hospital_name}</h1>
                  <p>{hospital.address}</p>
                </div>
                <div className="txt-right">
                  <p><span>{hospital.availability}</span> Available Beds</p>
                </div>
              </div>
              <div className="card-body">
                <div className="btn1">
                  <button onClick={getLocation}>
                    <img src={Loc} alt="Location" />
                  </button>
                </div>
                <div className="btn2">
                  <button>Call Ambulance</button>
                </div>
                <div className="btn3">
                  <button>
                    <img src={bell} alt="Emergency" />
                    <p>Emergency</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Hospitals;
