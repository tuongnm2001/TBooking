import './BookingModal.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import ProfileDoctor from './ProfileDoctor';
import { useEffect, useState } from 'react';
import DatePicker from '../../Admin/Content/DoctorSchedule/DatePicker';
import { fetchAllCode, postPatientBookingAppointment } from '../../../service/userService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import _ from 'lodash'
import moment from 'moment';

const BookingModal = (props) => {

    const { show, setShow, dataSchedule, doctorId } = props
    const [fullName, setFullname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [reason, setReason] = useState('')
    const [birthday, setBirthday] = useState('')
    const [genders, setGenders] = useState('')
    const [selectedGender, setSelectedGender] = useState('')
    // const [doctorId, setDoctorId] = useState('')
    const [timeType, setTimeType] = useState('')

    const handleClose = () => {
        setShow(false)
    }

    const handleOnChangeDatePicker = (date) => {
        setBirthday(date)
    }
    let params = useParams();
    let id = params.id

    useEffect(() => {
        fetAllCodeGenders()
    }, [])

    const buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueVi
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result;
    }


    const fetAllCodeGenders = async () => {
        let res = await fetchAllCode('GENDER')
        if (res.errCode === 0) {
            let dataGenders = buildDataGender(res.data)
            setGenders(dataGenders)
        }
    }

    const handleChangeSelectedGender = (selectedOption) => {
        setSelectedGender(selectedOption)
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const buidTimeBooking = (dataSchedule) => {
        if (dataSchedule && !_.isEmpty(dataSchedule)) {

            let date = moment.unix(+dataSchedule.date / 1000).format('dddd - DD/MM/YYYY')
            let capitalizeFirstLetterTime = capitalizeFirstLetter(date)
            let time = dataSchedule.timeTypeData.valueVi

            return `${time} -  ${date}`
        }
        return ``
    }

    const buidDoctorName = (dataSchedule) => {
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let name = `${dataSchedule.doctorData.lastName} ${dataSchedule.doctorData.firstName}`
            return name
        }
        return ``
    }
    const handleConfirmBooking = async () => {
        let timeType = dataSchedule.timeType
        setTimeType(timeType)

        let timeString = buidTimeBooking(dataSchedule)
        let doctorName = buidDoctorName(dataSchedule)
        let date = new Date(birthday).getTime()
        let res = await postPatientBookingAppointment({
            email: email,
            doctorId: doctorId,
            timeType: timeType,
            date: date,
            fullName: fullName,
            selectedGender: selectedGender.value,
            address: address,
            phoneNumber: phoneNumber,
            reason: reason,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Đặt lịch thành công!')
            handleClose()
        } else {
            toast.error('Đặt lịch thất bại!')
            handleClose()
        }
    }

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
                    <ProfileDoctor
                        isShowDescriptionDoctor={false}
                        dataSchedule={dataSchedule}
                        doctorId={doctorId}
                    />

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                className='form-control'
                                value={fullName}
                                onChange={(event) => setFullname(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                className='form-control'
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                className='form-control'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                className='form-control'
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} >
                            <Form.Label>Lý do khám bệnh</Form.Label>
                            <Form.Control
                                type="text"
                                className='form-control'
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Ngày sinh</Form.Label>
                            <DatePicker
                                className='form-control'
                                value={birthday}
                                onChange={(date) => handleOnChangeDatePicker(date)}
                                dateFormat="dd/MM/yyyy"
                                selected={birthday}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Giới tính</Form.Label>
                            <Select
                                placeholder='Giới tính'
                                className='select'
                                onChange={handleChangeSelectedGender}
                                options={genders}
                                value={selectedGender}
                                name='selectedGender'
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handleConfirmBooking()}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookingModal;