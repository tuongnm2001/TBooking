import './ProfileDoctor.scss'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileDoctorById } from "../../../service/userService";
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import moment from 'moment';
import { FaRegHandPointUp } from 'react-icons/fa';

const ProfileDoctor = (props) => {

    const { isShowDescriptionDoctor, dataSchedule, doctorId, isShowLinkDetail, isShowPrice, location } = props
    const [dataProfile, setDataProfile] = useState('')
    // let params = useParams();
    // let id = params.id

    const navigate = useNavigate()

    useEffect(() => {
        getProfileDoctor()
    }, [])

    const getProfileDoctor = async () => {
        let res = await getProfileDoctorById(doctorId)
        if (res && res.errCode === 0) {
            setDataProfile(res.data)
        }
    }

    let nameVi = ''
    if (dataProfile && dataProfile.positionData) {
        nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const renderTimeBooking = (dataSchedule) => {
        if (dataSchedule && !_.isEmpty(dataSchedule)) {

            let date = moment.unix(+dataSchedule.date / 1000).format('dddd - DD/MM/YYYY')
            let capitalizeFirstLetterTime = capitalizeFirstLetter(date)
            let time = dataSchedule.timeTypeData.valueVi

            return (
                <>
                    <div>{time} - {capitalizeFirstLetterTime}</div>
                    <div className='book-free'>
                        <span>Chọn</span> <FaRegHandPointUp /> <span>và đặt (miễn phí)</span>
                    </div>
                </>
            )
        }
        return;
    }

    return (
        <>
            <div className="intro-doctor-profile">
                <div className="content-left">
                    <img src={dataProfile.image} />

                    {
                        isShowLinkDetail === true &&
                        <span
                            className='view-detail-doctor'
                            onClick={() => navigate(`/detail-doctor/${doctorId}`)}
                        >
                            Xem thêm
                        </span>
                    }
                </div>

                <div className="content-right">
                    <div
                        className="up"
                        onClick={() => navigate(`/detail-doctor/${doctorId}`)}
                    >
                        {`${nameVi}`}
                    </div>
                    {
                        isShowDescriptionDoctor ?

                            <div className="down">
                                {
                                    dataProfile.Markdown && dataProfile.Markdown.description
                                    &&
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span>
                                }

                                {
                                    location &&
                                    <div>
                                        <i className="fas fa-map-marker-alt my-3"></i>
                                        {
                                            dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.provinceTypeData && dataProfile.Doctor_Infor.provinceTypeData.valueVi ?
                                                dataProfile.Doctor_Infor.provinceTypeData.valueVi :
                                                ''
                                        }
                                    </div>
                                }
                            </div>
                            :
                            <>
                                {renderTimeBooking(dataSchedule)}
                            </>
                    }
                </div>

            </div>

            {
                !isShowPrice &&
                <div className='priceBooking'>
                    <span>Giá khám : </span>
                    {
                        dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData.valueVi &&
                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                            displayType={'text'}
                            suffix={' VNĐ'}
                            className='currency'
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                        />
                    }
                </div>
            }
        </>
    );
}

export default ProfileDoctor;