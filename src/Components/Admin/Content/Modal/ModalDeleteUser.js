import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { handleDeleteUser } from '../../../../service/userService';
import './ModalAddNewUser.scss'

const ModalDeleteUser = (props) => {

    const { show, setShow, dataDelUser, getAllUser } = props
    const [loadingApi, setLoadingApi] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmitDeleteUser = async () => {
        setLoadingApi(true)
        let data = await handleDeleteUser(dataDelUser.id)
        if (data.errCode === 0) {
            getAllUser()
            handleClose()
        }
        setLoadingApi(false)
        toast.success('Xóa tài khoản thành công!')
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>XÓA NGƯỜI DÙNG</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có muốn xóa tài khoản <span style={{ color: 'red' }}>{dataDelUser.email}</span> không? </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    <i className="fa-solid fa-xmark"></i> Đóng
                </Button>
                <Button disabled={loadingApi} variant="danger" onClick={() => handleSubmitDeleteUser()}>
                    {
                        loadingApi &&
                        <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                    } Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser;