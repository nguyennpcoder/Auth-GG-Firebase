import { Button } from "antd";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EditTable.css";
import "./AddItemTable.css";


const AddItemTable = () => {
   
    // khai bao tham chieu
    const nameRef = useRef('');
    const ageRef = useRef('');
    const addReRef = useRef('');
    const tagsRef = useRef('');

    const navigate = useNavigate();


    const addItem = async () => {
        const api = 'https://65217ee0a4199548356d4a34.mockapi.io/api/v1/Ro35';
        const result = {
            name: nameRef.current.value,
            age: ageRef.current.value,
            address: addReRef.current.value,
            tags: tagsRef.current.value,
        }

        // get item
        console.log(result, "========");
        const { name, age, tags, address } = result;

        // validate data
        if (!name || !age || !address || !tags) {
            alert('Vui lòng không bỏ trống');
            return;
        }
        //
        if (name.length < 10 || name.length > 15) {
          alert('Name phải từ 10 đến 15 ký tự !!');
          return;
        }
    
        const ageNumber = parseInt(age, 10);
        if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 100) {
          alert('Age phải từ 1 đến 100 tuổi !!');
          return;
        }

        // Thong bao
        try {
            //const response = await axios.post(api, result);
            //console.log(response.data);
            alert('Item added successfully');
            //navigate('/'); 
        } catch (error) {
            console.error(error);
            alert('Error adding item');
        }
        // call api here 
        axios.post(api, result)
        .then((res) => {
        console.log('Response data:', res.data);
        navigate('/Table');
    })
        .catch((err) => {
        console.log('Error while posting data:', err);
        alert('Error adding item');
  });
    }

    return <>
        <h4>Add Item Table</h4>
        <div className='styleInput'>
            <input ref={nameRef} name="name" placeholder='name' />
            <input ref={ageRef} name="age" placeholder='age' />
            <input ref={addReRef} name="address" placeholder='address' />
            <input ref={tagsRef} name="tags" placeholder='tags' />
        </div>
        <Button onClick={() => addItem()}>Add item</Button>
    </>
}

export default AddItemTable;