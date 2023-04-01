import './RemedyModal.scss'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CommonUtils from '../../../../ultis/CommonUtils'
import { useEffect } from 'react';
import { postSendRemedy } from '../../../../service/userService';
import { useParams } from 'react-router-dom';

const RemedyModal = (props) => {

    const { show, setShow, dataModal } = props
    const [email, setEmail] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    let params = useParams();

    let id = params.id
    const handleClose = () => {
        setShow(false)
    }

    useEffect(() => {
        setEmail(dataModal.email)
    }, [dataModal])

    const handleSendRemedy = async () => {
        let res = await postSendRemedy({
            email: email,
            imageBase64: imageBase64,
            doctorId: id
        })

        console.log(res);
    }

    const handleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            setImageBase64(base64)
        }
    }

    const handleOnchangeEmail = (event) => {
        setEmail(event.target.value)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Hóa đơn khám bệnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-6 form-group'>

                        <label>Email bệnh nhân</label>
                        <input
                            type='email'
                            value={email}
                            className='form-control'
                            onChange={(event) => handleOnchangeEmail(event)}
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label>Chọn hóa đơn</label>
                        <input
                            type='file'
                            className='form-control-file'
                            onChange={(event) => handleOnchangeImage(event)}

                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handleSendRemedy()}
                >
                    Gửi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RemedyModal;