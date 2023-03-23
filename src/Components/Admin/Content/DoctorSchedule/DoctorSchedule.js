import { useEffect, useState } from 'react';
import './DoctorSchedule.scss'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'
import { getScheduleByDate } from '../../../../service/userService';
import { useParams } from "react-router-dom";

const DoctorSchedule = () => {

    const [allDays, setAllDays] = useState([])
    const [allAvailabelTime, setAllAvailabelTime] = useState({})

    let params = useParams();


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
        let doctorId = params.id
        let date = event.target.value
        let res = await getScheduleByDate(doctorId, date)
        if (res && res.errCode === 0) {
            setAllAvailabelTime(res.data)
        }
    }

    return (
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
                            allAvailabelTime.map((item, index) => {
                                return (
                                    <button
                                        key={`time-${index}`}
                                        className='btn btn-time'
                                    >
                                        {item.timeTypeData.valueVi}
                                    </button>
                                )
                            })
                            :
                            <div className='text-noSchedule'>Không lịch hẹn trong thời gian này , vui lòng chọn thời gian khác !</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default DoctorSchedule;