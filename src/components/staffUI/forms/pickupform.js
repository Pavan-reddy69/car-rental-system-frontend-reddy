import React, { useState } from 'react';
import closeicon from './close.png'
import './pickup.css';
import PendingOrders from '../../../pages/Staff/pendingorder';

const PickupForm = ({ id, km,onPickupSubmit,onClose }) => {
  const [visible, setVisible] = useState(true);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState('');
  const [image, setImage] = useState('');
  const [currentKm, setCurrentKm] = useState(km);

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      id,
      pickupDate,
      pickupTime,
      currentKm,
      image
    };
    onPickupSubmit(id,PendingOrders);
    alert('Pickup details submitted successfully!');
    setVisible(false); // hide the form after successful submission
  };
  
  const handleToggleVisible = () => {
    onClose();
  };

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const time = current.toLocaleTimeString('en-US');
  

  return (
        <div className="pickup-form-container">
          <form className='pickform' onSubmit={handleSubmit}>
          <button className='close-button' onClick={handleToggleVisible}>
            <img src={closeicon} width="47" height="42"/> 
          </button>
            <h2><b>Pick Up details</b></h2>
            <div>
              <label className='pickform1' htmlFor="pickup-date">Pickup Date:
              <span style={{ display: 'inline-block', textAlign: 'center' ,paddingLeft:103 }}>{`${pickupDate.getDate()}/${pickupDate.getMonth() + 1}/${pickupDate.getFullYear()}`}</span>
              </label>
            </div>
            <div>
              <label className='pickform1' htmlFor="pickup-time">Pickup Time:<span style={{ display: 'inline-block', textAlign: 'center' ,paddingLeft:101 }}>
                {time}</span>
                </label>
            </div>
            
            
            <div>
  <label className='pickform1' htmlFor="Carkm">
    Current Km: <span style={{ display: 'inline-block', textAlign: 'center' ,paddingLeft:106 }}>{currentKm} Km</span>
  </label>
</div>
        
            <div>
              <label className='pickform1' htmlFor="image">Driving License:
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(event) => setImage(event.target.files[0])}
                required
              />
              </label>
            </div>
            <button className='pickform2' type="submit">Submit</button>
          </form>
        </div>
      );
  };

export default PickupForm;
