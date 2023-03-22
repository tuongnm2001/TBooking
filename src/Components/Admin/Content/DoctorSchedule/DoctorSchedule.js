import { useEffect, useState } from 'react';
import './DoctorSchedule.scss'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'
import { getScheduleByDate } from '../../../../service/userService';
import { useParams } from "react-router-dom";

const DoctorSchedule = () => {

    const [allDays, setAllDays] = useState([])
    let params = useParams();


    useEffect(() => {
        getArrDay()
    }, [])

    const getArrDay = async () => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(object)
        }


        setAllDays(arrDays)
    }

    console.log(allDays);

    const handleOnchangeSelect = async (event) => {
        let doctorId = params.id
        let date = event.target.value
        let res = await getScheduleByDate(doctorId, date)
        console.log('check : ', res);
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

            </div>
        </div>
    );
}

export default DoctorSchedule;