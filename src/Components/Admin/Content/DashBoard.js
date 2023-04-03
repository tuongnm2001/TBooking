import './DashBoard.scss'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { fetchAllClinic, getAllDoctors, getAllSpecialty } from '../../../service/userService';
import { useEffect } from 'react';
import { useState } from 'react';

const DashBoard = (props) => {

    const [listTotalDoctor, setListTotalDoctor] = useState({})
    const [listTotalSpecialty, setListTotalSpecialty] = useState({})
    const [listTotalClinic, setListTotalClinic] = useState({})

    const data = [
        {
            "name": "Bác sĩ",
            "BS": listTotalDoctor.length
        },
        {
            "name": "Chuyên khoa",
            "CK": listTotalSpecialty.length
        },
        {
            "name": "Phòng khám",
            "PK": listTotalClinic.length
        },
        {
            "name": "Bài Blog",
            "BL": 10
        }
    ]

    useEffect(() => {
        totalDoctor()
        totalSpecialty()
        totalClinic()
    }, [])

    let totalDoctor = async () => {
        let res = await getAllDoctors();
        if (res && res.errCode === 0) {
            setListTotalDoctor(res.data)
        }
    }

    let totalSpecialty = async () => {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            setListTotalSpecialty(res.data)
        }
    }

    let totalClinic = async () => {
        let res = await fetchAllClinic()
        if (res && res.errCode === 0) {
            setListTotalClinic(res.data)
        }
    }

    return (
        <div className='dashboard-container'>
            <div className='title'>Thống Kê</div>
            <div className='content'>
                <div className='content-left'>
                    <div className='child doctor'>
                        <span className='text-1'>Tổng bác sĩ</span>
                        <span className='text-2'>{listTotalDoctor.length}</span>
                    </div>

                    <div className='child specialty'>
                        <span className='text-1'>Tổng chuyên khoa</span>
                        <span className='text-2'>{listTotalSpecialty.length}</span>
                    </div>

                    <div className='child clinic'>
                        <span className='text-1'>Tổng phòng khám</span>
                        <span className='text-2'>{listTotalClinic.length}</span>
                    </div>

                    <div className='child blog'>
                        <span className='text-1'>Tổng bài blog</span>
                        <span className='text-2'>100</span>
                    </div>
                </div>

                <div className='content-right'>
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            className='barChart'
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="BS" fill="#061b64" />
                            <Bar dataKey="CK" fill="#04297a" />
                            <Bar dataKey="PK" fill="#7a4f01" />
                            <Bar dataKey="BL" fill="#7a0c2e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;