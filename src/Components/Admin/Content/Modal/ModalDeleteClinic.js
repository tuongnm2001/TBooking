import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteClinic } from '../../../../service/userService';
import './ModalAddNewUser.scss'

const ModalDeleteClinic = (props) => {

    const { show, setShow, dataClinic, getAllClinic } = props
    const [loadingApi, setLoadingApi] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmitDeleteClinic = async () => {
        setLoadingApi(true)
        let data = await deleteClinic(dataClinic.value)
        if (data.errCode === 0) {
            getAllClinic()
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
                    <Modal.Title>XÓA PHÒNG KHÁM</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa chuyên khoa <span style={{ color: 'red' }}>{dataClinic.label}</span> không? </Modal.Body>
                <Modal.Footer>
                    <Button disabled={loadingApi} variant="danger" onClick={() => handleSubmitDeleteClinic()}>
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

export default ModalDeleteClinic;