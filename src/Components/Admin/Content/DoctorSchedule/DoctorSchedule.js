import { useEffect, useState } from 'react';
import './DoctorSchedule.scss'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'
import { getScheduleByDate } from '../../../../service/userService';
import { useParams } from "react-router-dom";
import { FaRegHandPointUp } from 'react-icons/fa';
import BookingModal from '../../../Home/ContentHompage/BookingModal';


const DoctorSchedule = (props) => {


    const { doctorId } = props

    const [allDays, setAllDays] = useState([])
    const [allAvailabelTime, setAllAvailabelTime] = useState({})
    const [isShowModalBooking, setIsShowModalBooking] = useState(false)
    const [dataSchedule, setDataSchedule] = useState({})

    useEffect(() => {
        getArrDay()
    }, [])

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getArrDay = async () => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            object.label = capitalizeFirstLetter(labelVi)
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(object)
        }
        setAllDays(arrDays)
    }

    const handleOnchangeSelect = async (event) => {
        let date = event.target.value
        let res = await getScheduleByDate(doctorId, date)
        if (res && res.errCode === 0) {
            setAllAvailabelTime(res.data)
        }
    }

    useEffect(() => {
        fetchScheduleFirstDay()
    }, [allDays])

    const fetchScheduleFirstDay = async () => {
        try {
            let res = await getScheduleByDate(doctorId, allDays[0].value)
            if (res && res.errCode === 0) {
                setAllAvailabelTime(res.data)
            }
        } catch (error) {
        }
    }

    const handleShowModalBooking = (time) => {
        setIsShowModalBooking(true)
        setDataSchedule(time)
    }

    return (
        <>
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => handleOnchangeSelect(event)}>
                        {
                            allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        key={`day-${index}`}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='all-available-time'>
                    <div className='text-canlendar'>
                        <i className='fa-solid fa-calendar-days'></i>
                        <span>Lịch khám</span>
                    </div>

                    <div className='time-content'>
                        {
                            allAvailabelTime && allAvailabelTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {

                                            allAvailabelTime.map((item, index) => {
                                                return (
                                                    <button
                                                        onClick={() => handleShowModalBooking(item)}
                                                        key={`time-${index}`}
                                                        className='btn btn-time'
                                                    >
                                                        {item.timeTypeData.valueVi}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='book-free'>
                                        <span>Chọn</span> <FaRegHandPointUp /> <span>và đặt (miễn phí)</span>
                                    </div>
                                </>
                                :
                                <div className='text-noSchedule'>Bác sĩ không có lịch hẹn trong thời gian này !</div>
                        }
                    </div>
                </div>
            </div >

            <BookingModal
                show={isShowModalBooking}
                setShow={setIsShowModalBooking}
                dataSchedule={dataSchedule}
                doctorId={doctorId}
            />
        </>
    );
}

export default DoctorSchedule;