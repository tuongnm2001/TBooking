import './ManageDoctorSchedule.scss'
import Select from 'react-select';
import { fetchAllCode, getAllDoctors, getDetailInforDoctor } from '../../../../service/userService';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import DatePicker from './DatePicker'

const ManageDoctorSchedule = () => {

    const [contentMarkDown, setContentMarkDown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [selectedDoctor, setselectedDoctor] = useState(null)
    const [description, setDescription] = useState('')
    const [allDoctors, setAllDoctors] = useState({})
    const [hasOldData, setHasOldData] = useState(false)
    const [currentDate, setCurrentDate] = useState('');
    const [rangeTime, setRangTime] = useState({})

    const handleChangeSelect = async (selectedDoctor) => {
        setselectedDoctor(selectedDoctor)
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            setContentHTML(markdown.contentHTML)
            setContentMarkDown(markdown.contentMarkdown)
            setDescription(markdown.description)
            setHasOldData(true)
        } else {
            setContentHTML('')
            setContentMarkDown('')
            setDescription('')
            setHasOldData(false)
        }
    };

    useEffect(() => {
        handleGetAllDoctors()
    }, [])

    useEffect(() => {
        fetchAllCodeService()
    }, [])

    const fetchAllCodeService = async () => {
        let res = await fetchAllCode('TIME')
        if (res.errCode === 0) {
            setRangTime(res.data)
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
        setCurrentDate(date[0])
    }

    console.log(currentDate);

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
                            minDate={new Date()}
                        />
                    </div>

                    <div className='col-12 pick-hour-container'>
                        {
                            rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button
                                        key={`time-${index}`}
                                        className='btn btn-schedule'
                                    >
                                        {item.valueVi}
                                    </button>
                                )
                            })
                        }
                    </div>

                    <div className='col-12'>
                        <button className='btn btn-primary btnSave'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageDoctorSchedule;