
import React from 'react';
import { Button, Modal } from 'antd';
import "./EditTable.css";
import { useState } from 'react';
import { useEffect } from 'react';

const EditTable = ({
    isModalOpen,
    setIsModalOpen,
    itemDetail,
    setItemDetail,
    callBackUpdate
}) => {

   // new hook useRef
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [tags, setTags] = useState('');
     useEffect(() => {
        if(itemDetail){
            setName(itemDetail.name);
            setAge(itemDetail.age);
            setAddress(itemDetail.address);
            setTags(itemDetail.tags);
        }
     }, itemDetail?.id)
  
    const handleOk = () => {
        const result = {
            ...itemDetail,
            name,
            age,
            address,
            tags
        }
        console.log('result', result);
        //=======
        callBackUpdate(result);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setItemDetail({});
    };

    return <>
      <Modal title="Update user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='styleInput'>
            <input value={name} name="name" placeholder='name' onChange={(e) => setName(e.target.value)}/>
            <input value={age} name="age" placeholder='age' onChange={(e) => setAge(e.target.value)}/>
            <input value={address} name="address" placeholder='address' onChange={(e) => setAddress(e.target.value)}/>
            <input value={tags} name="tags" placeholder='tags' onChange={(e) => setTags(e.target.value)}/>
        </div>
      </Modal>
    </>
};

export default EditTable;