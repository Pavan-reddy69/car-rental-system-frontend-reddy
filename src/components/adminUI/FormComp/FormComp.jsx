import React, { useState } from 'react';
import '../FormComp/formComp.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import api from '../../../api/api';


const FormComp= ({formTitle,FieldList,tableUrl}) => {

    const [formData,setFormData]=useState([]);
    const changeHandler = e => {
        setFormData({...formData,[e.target.name]: e.target.value})
        console.log(formData)
      }
    const submitAdd=(e)=>{
        toggle();
        axios.post(api+{tableUrl},{        }).then(res=>console.log('posting Data',res)).catch(err=>console.log(err))
    }
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
          <Button className='add__btn' color="primary" onClick={toggle}>
          <i class="ri-add-line"></i>
            Add
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{formTitle}</ModalHeader>
            <ModalBody>
            {FieldList.map((item)=>{
            return (<div className='single__input'><label>{item.label}</label> <input className='input__field' type={item.dataType} name={item.name} onChange={changeHandler} /></div>)})}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={submitAdd}>
                Submit
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    
//     <Popup className='pop__up' trigger={<button className='add__btn'> ADD </button>} position="left center">
//     <div>
//         
// )})}
//     </div>
//   </Popup>
};

export default FormComp;