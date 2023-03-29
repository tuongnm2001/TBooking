import './ManageUser.scss'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ModalAddNewUser from './Modal/ModalAddNewUser';
import ModalDeleteUser from './Modal/ModalDeleteUser';
import { fetchAllCode, fetchAllUsers } from '../../../service/userService';
import ModalUpdateUser from './Modal/ModalUpdateUser';
import ModalView from './Modal/ModalView';
import { paginate } from './Pagination/paginate';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Pagination from './Pagination/Pagination';
import ManageDoctor from './ManageDoctor';
import { BsArrowDownUp } from 'react-icons/bs';
import _, { debounce } from 'lodash'

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
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8;
    const [key, setKey] = useState('home');
    const [loading, setLoading] = useState(false);
    const [sortUpDown, setSortUpDown] = useState(false)

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
        setLoading(true)
        let data = await fetchAllUsers("ALL")
        if (data.errCode === 0) {
            setListUsers(data.users.reverse())
        }
        setLoading(false)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const paginateListUser = paginate(listUsers, currentPage, pageSize);


    const handleSortEmail = () => {
        setSortUpDown(!sortUpDown)

        const sortEmailUp = _.orderBy(listUsers, ['email'], ['asc']);
        const sortEmailDown = _.orderBy(listUsers, ['email'], ['desc']);

        if (sortUpDown === true) {
            setListUsers(sortEmailDown)
        }
        if (sortUpDown === false) {
            setListUsers(sortEmailUp)
        }
    }

    const handleSortFirstName = () => {
        setSortUpDown(!sortUpDown)

        const sortFirstNamelUp = _.orderBy(listUsers, ['firstName'], ['asc']);
        const sortFirstNameDown = _.orderBy(listUsers, ['firstName'], ['desc']);

        if (sortUpDown === true) {
            setListUsers(sortFirstNameDown)
        }
        if (sortUpDown === false) {
            setListUsers(sortFirstNamelUp)
        }
    }

    const handleSearchByEmail = debounce((event) => {
        let tern = event.target.value
        if (tern) {
            let cloneListUser = _.cloneDeep(listUsers)
            cloneListUser = cloneListUser.filter(item => item.email.includes(tern))
            setListUsers(cloneListUser)
        } else {
            getAllUser()
        }
    }, 300)

    return (
        <>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                fill
                justify
            >
                <Tab eventKey="home" title="Quản lý ngưới dùng">
                    <div className="manage-user-container">
                        <div className="title">Quản lý ngưới dùng</div>
                        <div className="users-content">
                            <button
                                className='btn btn-success mx-3 my-3'
                                onClick={() => handleShowModalAddUser()}>
                                <i className="fa-solid fa-user-plus"></i> Thêm mới
                            </button>

                            <Form>
                                <Form.Control
                                    onChange={(event) => handleSearchByEmail(event)}
                                    className="search "
                                    placeholder="Nhập Email"
                                />
                            </Form>
                        </div>

                        <div className="table-user">
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>

                                            <th>
                                                Email <BsArrowDownUp className='sortEmail' onClick={() => handleSortEmail()} />
                                            </th>

                                            <th>
                                                Tên <BsArrowDownUp className='sortEmail' onClick={() => handleSortFirstName()} />
                                            </th>
                                            <th>Họ</th>

                                            <th>Địa chỉ</th>
                                            <th>Cài đặt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            paginateListUser && paginateListUser.length > 0 &&
                                            paginateListUser.map((item, index) => {
                                                return (
                                                    <tr key={`user-${index}`}>
                                                        <td>{item.id}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.firstName}</td>
                                                        <td>{item.lastName}</td>
                                                        <td>{item.address}</td>
                                                        <td>
                                                            <button className='btn btn-primary' onClick={() => handleShowView(item)}>
                                                                <i className="fa-solid fa-eye"></i> Xem chi tiết
                                                            </button>

                                                            <button
                                                                className='btn btn-warning mx-3'
                                                                onClick={() => handleUpdateUser(item)}
                                                            >
                                                                <i className="fa-solid fa-pencil"></i> Cập nhật
                                                            </button>

                                                            <button
                                                                className='btn btn-danger'
                                                                onClick={() => handleShowModalDelUser(item)}
                                                            >
                                                                <i className="fas fa-user-times"></i> Xóa
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
                    {
                        loading === false &&
                        <Pagination
                            className='pagination'
                            items={listUsers.length}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    }

                    {
                        loading &&
                        <i className="fas fa-spinner fa-pulse spiner"></i>
                    }
                </Tab>

                <Tab eventKey="profile" title="Thông tin bác sĩ">
                    <ManageDoctor />
                </Tab>

                {/* <Tab eventKey="contact" title="Contact">
                    b
                </Tab> */}
            </Tabs>

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