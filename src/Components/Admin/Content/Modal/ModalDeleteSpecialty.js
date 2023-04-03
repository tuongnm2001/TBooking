import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteSpecialty } from '../../../../service/userService';
import './ModalAddNewUser.scss'
import AddNewSpecialty from '../AddNewSpecialty';

const ModalDeleteSpecialty = (props) => {

    const { show, setShow, dataSpecialty, fetchAllSpecialty } = props
    const [loadingApi, setLoadingApi] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmitDeleteSpecialty = async () => {
        setLoadingApi(true)
        let data = await deleteSpecialty(dataSpecialty.value)
        if (data.errCode === 0) {
            fetchAllSpecialty()
            handleClose()
        }
        setLoadingApi(false)
        toast.success(data.errMessage)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>XÓA CHUYÊN KHOA</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa chuyên khoa <span style={{ color: 'red' }}>{dataSpecialty.label}</span> không? </Modal.Body>
                <Modal.Footer>
                    <Button disabled={loadingApi} variant="danger" onClick={() => handleSubmitDeleteSpecialty()}>
                        {
                            loadingApi &&
                            <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                        } Xóa
                    </Button>

                    <Button variant="secondary" onClick={handleClose}>
                        <i className="fa-solid fa-xmark"></i> Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteSpecialty;