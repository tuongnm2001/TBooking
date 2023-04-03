import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './ModalAddNewUser.scss'
import { BiImageAdd } from 'react-icons/bi'
import Lightbox from "react-awesome-lightbox";
import { postCreateNewUser } from '../../../../service/userService';
import { toast } from 'react-toastify';
import CommonUtils from '../../../../ultis/CommonUtils';

const ModalAddNewUser = (props) => {

    const { show, setShow, genders, positions, roles, getAllUser, dataUpdateUser } = props

    const [loadingApi, setLoadingApi] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('M')
    const [position, setPosition] = useState('P0')
    const [role, setRole] = useState('R1')
    const [avatar, setAvatar] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [zoomInImage, setZoomInImage] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleUploadImage = async (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let base64 = await CommonUtils.getBase64(event.target.files[0])
            if (event.target.files[0] !== 0) {
                setPreviewImage(URL.createObjectURL(event.target.files[0]));
            }
            setAvatar(base64)
        }
    }

    const handleSubmit = async () => {
        setLoadingApi(true)
        let data = await postCreateNewUser({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender,
            roleId: role,
            positionId: position,
            avatar: avatar
        })
        if (data.errCode === 0) {
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            setAddress('')
            setPhoneNumber('')
            // setGender('M')
            // setPosition('P0')
            // setRole('R1')
            setAvatar('')
            setPreviewImage('');
            handleClose()
            getAllUser()
        }
        setLoadingApi(false)
        toast.success('Add new User success!')

    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            size='xl'
            className='modal-add-user'
        >
            <Modal.Header closeButton>
                <Modal.Title>THÊM MỚI NGƯỜI DÙNG</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="email"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Họ</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type='text'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Giới tính</Form.Label>

                            <Form.Select onChange={(event) => setGender(event.target.value)}>
                                {
                                    genders && genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (
                                            <option key={`gender-${index}`} value={item.keyMap} >
                                                {item.valueVi}
                                            </option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Vị trí</Form.Label>
                            <Form.Select onChange={(event) => setPosition(event.target.value)}>
                                {
                                    positions && positions.length > 0 &&
                                    positions.map((item, index) => {
                                        return (
                                            <option key={`positions-${index}`} value={item.keyMap}>
                                                {item.valueVi}
                                            </option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Vai trò</Form.Label>
                            <Form.Select onChange={(event) => setRole(event.target.value)}>
                                {
                                    roles && roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (
                                            <option key={`roles-${index}`} value={item.keyMap}>
                                                {item.valueVi}
                                            </option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <div className='col-md-12'>
                            <label className='form-label my-3 upload' htmlFor='uploadImg'>
                                <BiImageAdd className='iconAdd' />Tải ảnh lên
                            </label>
                            <input
                                hidden
                                type='file'
                                id='uploadImg'
                                onChange={(event) => { handleUploadImage(event) }}
                            />
                        </div>


                        <div className='col-md-12 img-preview'>
                            {
                                previewImage ?
                                    <img
                                        src={previewImage}
                                        className="rounded mx-auto d-block"
                                        onClick={() => setZoomInImage(true)}
                                    />
                                    :
                                    <span className='textPreviewImg'>Tải ảnh lên</span>
                            }

                            {
                                zoomInImage === true &&
                                <Lightbox
                                    image={avatar}
                                    title="Image Title"
                                    onClose={() => setZoomInImage(false)}
                                />
                            }


                        </div>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    <i className="fa-solid fa-xmark"></i> Đóng
                </Button>
                <Button disabled={loadingApi} variant="primary" onClick={() => handleSubmit()}>
                    {
                        loadingApi &&
                        <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                    } Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddNewUser;