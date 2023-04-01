import './ManagePatient.scss'
import Table from 'react-bootstrap/Table';
import DatePicker from '../../Admin/Content/DoctorSchedule/DatePicker';
import { useState } from 'react';
import { getAllPatientForDoctor } from '../../../service/userService';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import RemedyModal from '../../Admin/Content/Modal/RemedyModal';

const ManagePatient = () => {

    const account = useSelector(state => state.user.account)
    const [currentDate, setCurrentDate] = useState(
        moment(new Date()).startOf('day').valueOf()
    );
    const [dataPatient, setDataPatient] = useState([])
    const [isShowModalRemedy, setIsShowModalRemedy] = useState(false)
    const [dataModal, setDataModal] = useState({})

    const handleOnChangeDatePicker = (async (date) => {
        setCurrentDate(date[0])
        await getDataPatient()
    })

    useEffect(() => {
        getDataPatient()
    }, [])

    console.log(account, currentDate);

    const getDataPatient = async () => {
        let formatedDate = new Date(currentDate).getTime()

        let res = await getAllPatientForDoctor({
            doctorId: account.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            setDataPatient(res.data);
        }
        console.log(res);
    }

    const handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email
        }

        setIsShowModalRemedy(true)
        setDataModal(data)
    }

    return (
        <div className='manage-patient-container'>
            <div className='manage-patient-title'>
                Quản lí bệnh nhân khám bệnh
            </div>

            <div className='manage-patient-body row'>
                <div className='col-4 form-group'>
                    <label>Chọn ngày khám</label>
                    <DatePicker
                        selected={currentDate}
                        value={currentDate}
                        className='form-control'
                        onChange={handleOnChangeDatePicker}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>

                <div className='col-12 my-3'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Họ và tên</th>
                                <th>Giới tính</th>
                                <th>Thời gian</th>
                                <th>Địa chỉ</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={`patient-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>
                                                    <button
                                                        className='btn btn-primary mx-3'
                                                        onClick={() => handleConfirm(item)}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr style={{ textAlign: 'center', padding: '10px 0' }}>
                                        <td colSpan={6}>Không có dữ liệu</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

            <RemedyModal
                show={isShowModalRemedy}
                setShow={setIsShowModalRemedy}
                dataModal={dataModal}
            />
        </div>
    );
}

export default ManagePatient;