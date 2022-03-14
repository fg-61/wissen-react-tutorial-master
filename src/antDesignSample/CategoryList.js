import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Table } from 'antd';

function CategoryList() {


    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title:'Delete',
            dataIndex:'id',
            key:'id',
            render: (id) => <Button danger onClick={() => deleteCategory(id)}>Delete</Button>
        }
    ];

    const deleteCategory = (id) => {

        let requestOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://northwind.vercel.app/api/categories/" + id, requestOptions)
        .then(res => res.json())
        .then((data) => {
            getCategory();
        })

    }

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {

        getCategory();

    }, []);


    const getCategory = () => {
        fetch("https://northwind.vercel.app/api/categories")
        .then(res => res.json())
        .then((data) => {
            setCategoryList(data);
        })
    }

    return (
        <>
            <Table dataSource={categoryList} columns={columns}></Table>
        </>
    )
}

export default CategoryList
