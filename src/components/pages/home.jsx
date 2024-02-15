import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Load from './Loading';
import logo from '../images/Temologo.svg';
import location from '../images/location.svg';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'HEAN';
  }, []);

  const [isOpenModal, setOpenModal] = useState(false);
  const [isGettingLocation, setGettingLocation] = useState(false);

  const tggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const allowLocation = () => {
    setGettingLocation(true);
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitude:', latitude, 'Longitude:', longitude);
        navigate(`/hospitals?lat=${latitude}&long=${longitude}`);
        setGettingLocation(false);
      });
    }, 1000);
  };

  return (
    <>
      {/* Splash Screen */}
      <Load />
      {isOpenModal ? (
        <div className='container'>
          <div className="center-contents">
            <img src={location} alt='logo' />
            <h1>Access your location</h1>
            <p>We need your permission to access your location.</p>
          </div>
          <div className="btn">
            <button 
              onClick={allowLocation} 
              type="button"
              disabled={isGettingLocation}
            >
              {isGettingLocation ? 'Getting your location...' : 'Allow Location'}
            </button>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className="center-contents">
            <img src={logo} alt='logo' />
            <h1>HEAN</h1>
            <p>Health Alert Network</p>
          </div>
          <div className="btn">
            <button onClick={tggleModal} type="button">Find Nearest Hospital</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
