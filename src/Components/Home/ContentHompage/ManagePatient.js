import './ManagePatient.scss'
import Table from 'react-bootstrap/Table';
import DatePicker from '../../Admin/Content/DoctorSchedule/DatePicker';
import { useState } from 'react';
import { getAllPatientForDoctor } from '../../../service/userService';
import { useEffect } from 'react';

const ManagePatient = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date)
    }

    // useEffect(() => {
    //     fetchAllPatientForDoctor()
    // }, [])

    // const fetchAllPatientForDoctor = async () => {
    //     let res = await getAllPatientForDoctor({

    //     })
    //     console.log(res);
    // }

    return (
        <div className='manage-patient-container'>
            <div className='manage-patient-title'>
                Quản lí bệnh nhân khám bệnh
            </div>

            <div className='manage-patient-body row'>
                <div className='col-4 form-group'>
                    <label>Chọn ngày khám</label>
                    <DatePicker
                        className='form-control'
                        selected={currentDate}
                        value={currentDate}
                        onChange={(date) => handleOnChangeDatePicker(date)}
                        // minDate={yesterday}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>

                <div className='col-12 my-3'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ManagePatient;