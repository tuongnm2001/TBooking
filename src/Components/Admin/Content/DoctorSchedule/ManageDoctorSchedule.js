import './ManageDoctorSchedule.scss'
import Select from 'react-select';
import { fetchAllCode, getAllDoctors, getDetailInforDoctor, saveBulkScheduleDoctor } from '../../../../service/userService';
import { useEffect, useState } from 'react';
import DatePicker from './DatePicker'
import { toast } from 'react-toastify';
import _, { result } from 'lodash'

const ManageDoctorSchedule = () => {

    const [selectedDoctor, setselectedDoctor] = useState(null)
    const [allDoctors, setAllDoctors] = useState({})
    const [hasOldData, setHasOldData] = useState(false)
    const [currentDate, setCurrentDate] = useState('');
    const [rangeTime, setRangTime] = useState({})
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));


    useEffect(() => {
        handleGetAllDoctors()
    }, [])

    useEffect(() => {
        fetchAllCodeService()
    }, [])

    const handleChangeSelect = async (selectedDoctor) => {
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            setselectedDoctor(selectedDoctor)
        }
    };


    const fetchAllCodeService = async () => {
        let res = await fetchAllCode('TIME')
        if (res.errCode === 0) {
            let data = res.data
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item, isSelected: false
                }))
            }
            setRangTime(data)
        }
    }

    const handleGetAllDoctors = async () => {
        let res = await getAllDoctors();
        if (res.errCode === 0) {
            let dataSelect = buidDataSelect(res.data);
            setAllDoctors(dataSelect)
        }
    }


    const buidDataSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`

                obj.label = labelVi
                obj.value = item.id
                result.push(obj)
            })
        }
        return result;
    }

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date)
    }

    const handleClickBtnTime = (time) => {

        if (rangeTime && rangeTime.length > 0) {
            rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                    return item;
                }
            })
            setRangTime(rangeTime)
        }

    }

    const handleSaveSchedule = async () => {

        let result = []

        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid Selected Doctor!')
            return;
        }

        if (!currentDate) {
            toast.error('Invalid date!')
            return;
        }

        // let formatedDate = moment(currentDate).format('DD/MM/YYYY')
        let formatedDate = new Date(currentDate).getTime();

        let selectedTime = rangeTime.filter(item => item.isSelected === true)

        if (selectedTime && selectedTime.length > 0) {
            selectedTime.map((item, index) => {
                let object = {}
                object.doctorId = selectedDoctor.value
                object.date = formatedDate
                object.timeType = item.keyMap
                result.push(object)
            })
        } else {
            toast.error('Invalid Selected Time!')
            return;
        }

        console.log('check result : ', result);

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: '' + formatedDate
        })
        if (res && res.errCode === 0) {
            toast.success('Save infor Success')
        } else {
            toast.error('Save infor faild')
        }
    }

    return (
        <div className='manage-schedule-container'>
            <div className='m-s-title'>QUẢN LÍ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ</div>
            <div className='container'>
                <div className='row'>
                    <div className='col-6 form-group my-3'>
                        <label className='text-chooseDoctor'>Chọn bác sĩ</label>
                        <Select
                            className='select'
                            value={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={allDoctors}
                        />
                    </div>

                    <div className='col-6 my-3'>
                        <label className='text-chooseDate'>Chọn ngày</label>
                        <DatePicker
                            className='form-control'
                            selected={currentDate}
                            value={currentDate}
                            onChange={(date) => handleOnChangeDatePicker(date)}
                            minDate={yesterday}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className='col-12 pick-hour-container'>
                        {
                            rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button
                                        key={`time-${index}`}
                                        onClick={() => handleClickBtnTime(item)}
                                        className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                    >
                                        {item.valueVi}
                                    </button>
                                )
                            })
                        }
                    </div>

                    <div className='col-12'>
                        <button
                            className='btn btn-primary btnSave'
                            onClick={() => handleSaveSchedule()}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageDoctorSchedule;