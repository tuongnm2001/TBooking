import { useState } from 'react';
import Header from '../../Header/Header'
import DoctorSchedule from '../../Admin/Content/DoctorSchedule/DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import './DetailSpecialty.scss'
import { useParams } from 'react-router-dom';
import ProfileDoctor from './ProfileDoctor';

const DetailSpecialty = () => {
    const [arrDoctorId, setArrDoctorId] = useState([56, 57, 58])

    return (
        <>
            <div className='detail-specialty-container'>
                <Header />
                <div className='detail-specialty-body'>

                    <div className='description-specialty'>
                        <div className='profile-doctor'>

                        </div>
                    </div>

                    {
                        arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={`arrDoctor-${index}`}>
                                    <div className='detail-content-left'>
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriptionDoctor={true}
                                        />
                                    </div>

                                    <div className='detail-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorId={item}
                                                key={index}
                                            />
                                        </div>

                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorId={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default DetailSpecialty;