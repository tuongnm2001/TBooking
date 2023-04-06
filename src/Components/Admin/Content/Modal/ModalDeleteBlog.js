import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteBlog } from '../../../../service/userService';
import './ModalAddNewUser.scss'

const ModalDeleteBlog = (props) => {

    const { show, setShow, dataBlog, fetchAllBlogs } = props
    const [loadingApi, setLoadingApi] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmitDeleteBlog = async () => {
        setLoadingApi(true)
        let data = await deleteBlog(dataBlog.value)
        if (data.errCode === 0) {
            fetchAllBlogs()
            handleClose()
        }
        setLoadingApi(false)
        toast.success('Xóa Blog thành công')
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>XÓA BLOG</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa bài Blog <span style={{ color: 'red' }}>{dataBlog.label}</span> không? </Modal.Body>
                <Modal.Footer>
                    <Button disabled={loadingApi} variant="danger" onClick={() => handleSubmitDeleteBlog()}>
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

export default ModalDeleteBlog;