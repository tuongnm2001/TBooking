import './BookingModal.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const BookingModal = (props) => {
    const { show, setShow, dataSchedule } = props

    const handleClose = () => {
        setShow(false)
    }

    console.log('check dataSchedule : ', dataSchedule);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Thông tin đặt lịch khám bệnh</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Control
                                type="email"
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Lý do khám bệnh</Form.Label>
                            <Form.Control
                                type="password"
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookingModal;