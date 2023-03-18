import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Lightbox from "react-awesome-lightbox";
import { Buffer } from 'buffer';

const ModalView = (props) => {

    const { show, setShow, genders, positions, roles, dataUpdateUser } = props

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

    const handleClose = () => {
        setShow(false)
    }

    let imageBase64 = ''
    if (dataUpdateUser.image) {
        imageBase64 = new Buffer(dataUpdateUser.image, 'base64').toString('binary')
    }

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
        setImage('')
        setPreviewImage(imageBase64)
    }, [dataUpdateUser])

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            size='xl'
            className='modal-add-user'
        >
            <Modal.Header closeButton>
                <Modal.Title>VIEW</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                readOnly
                                type="email"
                                value={email}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                readOnly
                                type="password"
                                value={password}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control
                                readOnly
                                type="email"
                                value={firstName}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>LastName</Form.Label>
                            <Form.Control
                                readOnly
                                type="text"
                                value={lastName}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                readOnly
                                type='text'
                                value={address}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>PhoneNumber</Form.Label>
                            <Form.Control
                                readOnly
                                type='text'
                                value={phoneNumber}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Gender</Form.Label>
                            <Form.Select disabled value={gender}>
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
                            <Form.Select disabled value={position}>
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
                            <Form.Select disabled value={role}>
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


                        <div className='col-md-12 img-preview-view'>
                            {
                                previewImage ?
                                    <img
                                        src={previewImage}
                                        className="rounded mx-auto d-block"
                                        onClick={() => setZoomInImage(true)}
                                    />
                                    :
                                    <span className='textPreviewImgView'>No Image</span>
                            }

                            {
                                zoomInImage === true &&
                                <Lightbox
                                    image={imageBase64}
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
                    <i className="fa-solid fa-xmark"></i> Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default ModalView;