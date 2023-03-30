import { getDetailClinicById } from '../../../service/userService';
import './DetailClinic.scss'

import { useState } from 'react';
import Header from '../../Header/Header'
import DoctorSchedule from '../../Admin/Content/DoctorSchedule/DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import './DetailSpecialty.scss'
import { useParams } from 'react-router-dom';
import ProfileDoctor from './ProfileDoctor';
import { useEffect } from 'react';
import _ from 'lodash'
import CommonUtils from '../../../ultis/CommonUtils';

const DetailClinic = () => {

    const [arrDoctorId, setArrDoctorId] = useState([])
    const [dataDetailClinic, setDataDetailClinic] = useState({})

    let params = useParams();
    let id = params.id

    useEffect(() => {
        fetchAllDetailSpecialy()
    }, [])

    const fetchAllDetailSpecialy = async () => {
        let res = await getDetailClinicById({
            id: id
        })

        if (res && res.errCode === 0) {
            let data = res.data
            let arrDoctorId = []
            if (data && !_.isEmpty(res.data)) {
                let arr = data.doctorClinic
                if (arr && arr.length > 0) {
                    arr.map(item => {
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }

            setDataDetailClinic(res.data)
            setArrDoctorId(arrDoctorId)
        }
    }

    return (
        <>
            <div className='detail-clinic-container'>
                <Header />

                <div className='detail-clinic-body'>
                    <div className='title-clinic'>
                        <img src={dataDetailClinic.image} />
                        <div className='content-right-title'>
                            <div className='content-up-name'>
                                {dataDetailClinic.name}
                            </div>

                            <div className='content-down-address'>
                                {dataDetailClinic.address}
                            </div>
                        </div>
                    </div>

                    <div className='description-clinic'>
                        <div className='profile-doctor'>
                            {
                                dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <>

                                    <div dangerouslySetInnerHTML={{
                                        __html: dataDetailClinic.descriptionHTML
                                    }} />
                                </>
                            }
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
                                            isShowLinkDetail={true}
                                            isShowPrice={true}
                                            location={true}
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

export default DetailClinic;