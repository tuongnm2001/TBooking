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
        toast.success(data.errMessage)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>DELETE USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete account <span style={{ color: 'red' }}>{dataDelUser.email}</span> ? </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    <i className="fa-solid fa-xmark"></i> Close
                </Button>
                <Button disabled={loadingApi} variant="danger" onClick={() => handleSubmitDeleteUser()}>
                    {
                        loadingApi &&
                        <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                    } Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser;