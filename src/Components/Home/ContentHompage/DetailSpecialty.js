import { useState } from 'react';
import Header from '../../Header/Header'
import DoctorSchedule from '../../Admin/Content/DoctorSchedule/DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import './DetailSpecialty.scss'
import { useParams } from 'react-router-dom';
import ProfileDoctor from './ProfileDoctor';
import { fetchAllCode, getDetailSpecialtyById } from '../../../service/userService';
import { useEffect } from 'react';
import _ from 'lodash'
import { Buffer } from 'buffer';

const DetailSpecialty = () => {
    const [arrDoctorId, setArrDoctorId] = useState([])
    const [dataDetailSpecialty, setDataDetailSpecialty] = useState({})
    const [listProvince, setListProvince] = useState({})

    let params = useParams();
    let id = params.id

    useEffect(() => {
        fetchAllDetailSpecialy()
    }, [])

    const fetchAllDetailSpecialy = async () => {
        let res = await getDetailSpecialtyById({
            id: id,
            location: 'ALL'
        })

        let resProvince = await fetchAllCode('PROVINCE')

        if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
            let data = res.data
            let arrDoctorId = []
            if (data && !_.isEmpty(res.data)) {
                let arr = data.doctorSpecialty
                if (arr && arr.length > 0) {
                    arr.map(item => {
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }

            let dataProvince = resProvince.data
            if (dataProvince && dataProvince.length > 0) {
                dataProvince.unshift({
                    createdAt: null,
                    keyMap: 'ALL',
                    type: 'PROVINCE',
                    valueVi: 'Toàn quốc'
                })
            }

            setDataDetailSpecialty(res.data)
            setArrDoctorId(arrDoctorId)
            setListProvince(dataProvince)
        }
    }

    const handleOnchangeSelect = async (event) => {
        let id = params.id
        let location = event.target.value

        let res = await getDetailSpecialtyById({
            id: id,
            location: location
        })
        if (res && res.errCode === 0) {
            let data = res.data
            let arrDoctorId = []
            if (data && !_.isEmpty(res.data)) {
                let arr = data.doctorSpecialty
                if (arr && arr.length > 0) {
                    arr.map(item => {
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }
            setDataDetailSpecialty(res.data)
            setArrDoctorId(arrDoctorId)
        }
    }

    return (
        <>
            <div className='detail-specialty-container'>
                <Header />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        <div className='profile-doctor'>
                            {
                                dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div dangerouslySetInnerHTML={{
                                    __html: dataDetailSpecialty.descriptionHTML
                                }} />
                            }
                        </div>
                    </div>


                    <div className='search-doctor my-3'>
                        <select
                            onChange={(event) => handleOnchangeSelect(event)}
                        >
                            {
                                listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option
                                            key={`province-${index}`}
                                            value={item.keyMap}
                                        >
                                            {item.valueVi}
                                        </option>
                                    )
                                })
                            }
                        </select>
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

export default DetailSpecialty;