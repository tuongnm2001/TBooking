import './ManageUser.scss'
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ModalAddNewUser from './Modal/ModalAddNewUser';
import ModalDeleteUser from './Modal/ModalDeleteUser';
import { fetchAllCode, fetchAllUsers } from '../../../service/userService';
import ModalUpdateUser from './Modal/ModalUpdateUser';
import ModalView from './Modal/ModalView';

const ManageUser = (props) => {

    const [showModalAddUser, setShowModalAddUser] = useState(false)
    const [showModalUpdateUser, setShowUpdateUser] = useState(false)
    const [showModalDeleteUser, setShowDeleteAddUser] = useState(false)
    const [showModalView, setShowView] = useState(false)
    const [genders, setGenders] = useState({})
    const [positions, setPositions] = useState({})
    const [roles, setRoles] = useState({})
    const [listUsers, setListUsers] = useState({})
    const [dataDelUser, setDataDelUser] = useState({})
    const [dataUpdateUser, setDataUpdateUser] = useState({})

    const handleShowView = (user) => {
        setShowView(true)
        setDataUpdateUser(user)
    }

    const handleShowModalAddUser = (user) => {
        setShowModalAddUser(true)
    }

    const handleShowModalDelUser = (user) => {
        setShowDeleteAddUser(true)
        setDataDelUser(user)
    }

    const handleUpdateUser = (user) => {
        setShowUpdateUser(true)
        setDataUpdateUser(user)
    }

    useEffect(() => {
        fetAllCodeGenders()
        fetAllCodePositions()
        fetAllCodeRoles()
        getAllUser()
    }, [])

    const fetAllCodeGenders = async () => {
        let res = await fetchAllCode('GENDER')
        if (res.errCode === 0) {
            setGenders(res.data)
        }
    }

    const fetAllCodePositions = async () => {
        let res = await fetchAllCode('POSITION')
        if (res.errCode === 0) {
            setPositions(res.data)
        }
    }

    const fetAllCodeRoles = async () => {
        let res = await fetchAllCode('ROLE')
        if (res.errCode === 0) {
            setRoles(res.data)
        }
    }

    const getAllUser = async () => {
        let data = await fetchAllUsers("ALL")
        if (data.errCode === 0) {
            setListUsers(data.users.reverse())
        }
    }

    return (
        <>
            <div className="manage-user-container">
                <div className="title">Manage Users</div>
                <div className="users-content">
                    <button
                        className='btn btn-success mx-3 my-3'
                        onClick={() => handleShowModalAddUser()}>
                        <i className="fa-solid fa-user-plus"></i> Add New User
                    </button>
                </div>

                <div className="table-user">
                    <Container>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listUsers && listUsers.length > 0 &&
                                    listUsers.map((item, index) => {
                                        return (
                                            <tr key={`user-${index}`}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={() => handleShowView(item)}>
                                                        <i className="fa-solid fa-eye"></i> View
                                                    </button>

                                                    <button
                                                        className='btn btn-warning mx-3'
                                                        onClick={() => handleUpdateUser(item)}
                                                    >
                                                        <i className="fa-solid fa-pencil"></i> Update
                                                    </button>

                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => handleShowModalDelUser(item)}
                                                    >
                                                        <i className="fas fa-user-times"></i> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>

            <ModalAddNewUser
                show={showModalAddUser}
                setShow={setShowModalAddUser}
                genders={genders}
                positions={positions}
                roles={roles}
                getAllUser={getAllUser}
            />

            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowDeleteAddUser}
                dataDelUser={dataDelUser}
                getAllUser={getAllUser}

            />

            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowUpdateUser}
                dataUpdateUser={dataUpdateUser}
                genders={genders}
                positions={positions}
                roles={roles}
                getAllUser={getAllUser}
            />

            <ModalView
                show={showModalView}
                setShow={setShowView}
                dataUpdateUser={dataUpdateUser}
                genders={genders}
                positions={positions}
                roles={roles}
            />
        </>
    );
}

export default ManageUser;