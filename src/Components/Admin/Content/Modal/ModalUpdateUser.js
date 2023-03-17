import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { HiUserAdd } from 'react-icons/hi'
import Lightbox from "react-awesome-lightbox";
import { handleUpdateUser } from '../../../../service/userService';
import { toast } from 'react-toastify';

const ModalUpdateUser = (props) => {

    const { show, setShow, genders, positions, roles, getAllUser, dataUpdateUser } = props

    const [id, setID] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('M')
    const [position, setPosition] = useState('P0')
    const [role, setRole] = useState('R1')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [zoomInImage, setZoomInImage] = useState(false)

    useEffect(() => {
        setID(dataUpdateUser.id)
        setEmail(dataUpdateUser.email)
        setPassword('********')
        setFirstName(dataUpdateUser.firstName)
        setLastName(dataUpdateUser.lastName)
        setAddress(dataUpdateUser.address)
        setPhoneNumber(dataUpdateUser.phoneNumber)
        setGender(dataUpdateUser.gender)
        setPosition(dataUpdateUser.positionId)
        setRole(dataUpdateUser.roleId)
    }, [dataUpdateUser])

    const handleClose = () => {
        setShow(false)
    }

    console.log('check dataUpdateUser : ', dataUpdateUser);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handleSubmitUpdate = async () => {
        let res = await handleUpdateUser({
            id,
            email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber,
            gender,
            position,
            role,
        })
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            handleClose()
            getAllUser()
        } else {
            toast.error(res.errMessage)
        }
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
                <Modal.Title>UPDATE USER</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                disabled
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                disabled
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control
                                type="email"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>LastName</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>PhoneNumber</Form.Label>
                            <Form.Control
                                type='text'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={gender} onChange={(event) => setGender(event.target.value)}>
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
                            <Form.Label>Position</Form.Label>
                            <Form.Select value={position} onChange={(event) => setPosition(event.target.value)}>
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
                            <Form.Label>Role</Form.Label>
                            <Form.Select value={role} onChange={(event) => setRole(event.target.value)}>
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
                                <HiUserAdd className='iconAdd' />Upload Image
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
                                    <span className='textPreviewImg'>Upload Image</span>
                            }

                            {
                                zoomInImage === true &&
                                <Lightbox
                                    image={URL.createObjectURL(image)}
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
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmitUpdate()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default ModalUpdateUser;