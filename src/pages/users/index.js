import React, { useEffect, useState, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";

import crudServices from '../../api/crud-services';
import { MainFormObject } from '../../stateProvider';

export default function UserList() {

    const [pageNumber, setPageNumber] = useState(1);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(6);
    const [totalRows, setTotalRows] = useState(0);
    const { mainObject, setMainObject } = useContext(MainFormObject);
    let navigate = useNavigate();
    const columns = [
        {
            name: 'Photo',
            selector: row => <img src={row.avatar} />,
        },
        {
            name: 'Name',
            selector: row => row.first_name + ` ${row.last_name}`,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <div style={{ cursor: 'pointer' }} onClick={() => onDeleteMethod(row.id)}>Delete</div>,
        },
    ];
    useEffect(() => {
        getUser();
    }, [pageNumber])
    
    const onDeleteMethod = (id) => {
        setUserData(userData.filter(item => item.id !== id))
    }
    const getUser = async () => {
        let param = {
            page: pageNumber,
            per_page: perPage
        }
        setLoading(true);
        let res = await crudServices.getUserList(param).then((res) => {
            return res.data
        })
            .catch((err) => {
                return err
            })
        setUserData(res.data);
        setTotalRows(res.total);
        setMainObject(res.data);
        setLoading(false);


    }
    const handlePageChange = page => {
        setPageNumber(page);
    };
    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
        setPageNumber(page);
    };

    return (
        <>
            <button onClick={() => {
                navigate('createUser');
            }}>
                Add User
            </button>
            <DataTable
                columns={columns}
                data={userData}
                progressPending={loading}
                pagination
                paginationServer
                paginationPerPage={6}
                paginationTotalRows={totalRows}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
            />
        </>
    )
}
