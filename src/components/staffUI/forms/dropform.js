import React, { useState } from 'react';
import closeicon from './close.png'
import './dropform.css';
import Switch from 'react-switch';
import axios from 'axios';
import api from '../../../api/api';
import moment from 'moment';
import { TailSpin } from 'react-loader-spinner';

const DropOffForm = ({ id ,kms,onDropOffSubmit,onClose }) => {
  const [visible, setVisible] = useState(false);
  const [headLights, setHeadLights] = useState(false);
  const [sideMirrors, setSideMirrors] = useState(false);
  const [scratches, setScratches] = useState(false);
  const [km,setKm]=useState('');
  const [loading, setLoading] = useState(false);
  const [currentKm, setCurrentKm] = useState(kms);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const dropOffDetails = {
      id:id,
      
      HeadLights:headLights,
      SideMirrors:sideMirrors,
    };
  
    onDropOffSubmit(id, dropOffDetails);
  
    try {
      const penalties = [];
  
      if (headLights) {
        penalties.push("Broken Headlights");
      }
  
      if (sideMirrors) {
        penalties.push("Broken Side Mirrors");
      }
  
      if (scratches) {
        penalties.push("Vehicle Scratches");
      }
      
      if (km < kms) {
        alert(`Current km cannot be less than ${kms}`);
        setLoading(false);
        return;
      }
  
      const payload = {
        orderId: id,
        penalties: penalties,
        currentKms:km,
      };
      
      await axios.post(api + '/invoice', payload);
      
      alert('Drop-off details submitted successfully!');
      setVisible(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    };
    setLoading(false);
  };
  

  const handleToggleVisible = () => {
    onClose();
  };
  return (
    <div className="drop-off-form-container">
       {loading && (
      <div className="loader-wrapper" style={{ position: "absolute", top: 0, left:0 , bottom: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <TailSpin
          height="180"
          width="180"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ position: "absolute", top: 250, left: 640, bottom: 0, right: 0 }}
          wrapperClass=""
          visible={true}
        />
      </div>
    )}
      <form className="drop-off-form" onSubmit={handleSubmit}>
      <button className='close-button' onClick={handleToggleVisible}>
            <img src={closeicon} width="47" height="42"/>
          </button>
        <h2><b>Drop Off details</b></h2> 
        <div>
          <label className='dropform1'>Drop-off Date: <span style={{ display: 'inline-block', textAlign: 'center' ,paddingRight:120 }}>
             {moment(new Date().toLocaleDateString()).format('DD/MM/YYYY')}
          </span>
          </label>
        </div>
        <div>
          <label className='dropform1'>Drop-off Time: <span style={{ display: 'inline-block', textAlign: 'center' ,paddingRight:122 }}>{new Date().toLocaleTimeString()}
          </span>
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <label className='dropform1' >
    Current Km:
    <input type='number' name='km' onChange={event => setKm(event.target.value)} min={kms}/>
  </label>
  
</div>


        <div>
          <label className='dropform1'>
            Headlamp Damaged: 
            <Switch
              className='dropform3'
              checked={headLights}
              onChange={() => setHeadLights(!headLights)}
              onColor="#86d3ff"
              offColor="#ccc"
            />
          </label>
        </div>
        <div>
          <label className='dropform1'>
            Side View Mirror Damaged:
            <Switch
              className='dropform3'
              checked={sideMirrors}
              onChange={() => setSideMirrors(!sideMirrors)}
              onColor="#86d3ff"
              offColor="#ccc"
            />
          </label>
        </div>
        <div>
          <label className='dropform1'>
           Any Scratches: 
            <Switch 
              className='dropform3'
              checked={scratches}
              onChange={() => setScratches(!scratches)}
              onColor="#86d3ff"
              offColor="#ccc"
            />
          </label>
        </div>
        <button className='dropform2' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DropOffForm;
