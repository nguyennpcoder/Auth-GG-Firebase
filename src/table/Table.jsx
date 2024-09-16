import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
// import thu vien call api
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import EditTable from './EditTable';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './../features/counter/counterReducer';
import "./table.css"

const { confirm } = Modal;

const TableCp = () => {
    const [data, setDataTable] = useState([]);
    const api = 'https://65217ee0a4199548356d4a34.mockapi.io/api/v1/Ro35';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemDetail, setItemDetail] = useState({});

    // Use useSelector and useDispatch from react-redux
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    const apiCall = () => {
        return axios.get(api)
            .then(res => {
                console.log(res?.data, 'res ====');
                setDataTable(res?.data);
            })
            .catch(err => `đã có lỗi call table: ` + err);
    }

    useEffect(() => {
        apiCall();
    }, []);



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 50,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            
          },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, itemTable) => (
                <>
                    <Tag color={'blue'} >
                        {itemTable.tags}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (_, itemTable) => (
                <Space size="middle">
                    <Tag color={'red'} onClick={() => showDeleteConfirm(itemTable)}>
                        Delete
                    </Tag>
                    <Tag color={'green'} onClick={() => showEdit(itemTable)}>
                        edit
                    </Tag>
                </Space>
            ),
        },
    ];

    const showEdit = (item) => {
        // khi click vao 1 phan tu thi set du lieu cho phan tu 
        setIsModalOpen(true);
        setItemDetail(item);
    }

    const TestA = () => {
        return <>hello</>
    }

    const showDeleteConfirm = (item) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa ${item?.name} không?`,
            //title: <TestA />,
            icon: <ExclamationCircleFilled />,
            content: `address: ${item?.address} - age: ${item?.age}`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteItemTb(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const deleteItemTb = (itemTable) => {
        console.log(itemTable, 'itemTable');
        if (itemTable?.id) {
            axios.delete(api + `/${itemTable?.id}`).then(res => {
                apiCall();
            }).catch(err => console.log('Xóa bản ghi thành công ' + err));
        }
    }

    // lifting state
    const editTableApi = (item) => {
        console.log('item', item);
        // destructuring
        const { id, name, address, age, tags, key } = item;
        // call api
        axios.put(api+`/${id}`, { 
            name,
            address,
            age,
            tags,
            key
        }).then(res => {
            setIsModalOpen(false);
        }).then(res => apiCall());
    }
    const redirectAddItem = () => {

    }

    return <>
        <div>
            <h4>List User {count}</h4>
            
            <NavLink to="/addItemTable">
                <Tag color={'blue'}>
                    Thêm mới
                </Tag>
            </NavLink>
        </div>
        {data.length > 0 && (
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000, y: 500 }}
        //   rowClassName={(record) => (record.age % 2 === 1 ? 'color' : '')}
        />
      )}
        {/* modal show here */}
        <EditTable isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            itemDetail={itemDetail}
            setItemDetail={setItemDetail}
            callBackUpdate={editTableApi}
        />
        
    </>
};
export default TableCp;