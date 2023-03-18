import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { handleDeleteUser } from '../../../../service/userService';

const ModalDeleteUser = (props) => {

    const { show, setShow, dataDelUser, getAllUser } = props

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmitDeleteUser = async () => {
        let data = await handleDeleteUser(dataDelUser.id)
        if (data.errCode === 0) {
            toast.success(data.errMessage)
            getAllUser()
            handleClose()
        }
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
                <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser;