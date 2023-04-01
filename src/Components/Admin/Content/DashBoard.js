import './DashBoard.scss'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const DashBoard = (props) => {

    const data = [
        {
            "name": "Bác sĩ",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Chuyên khoa",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Phòng khám",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Bài Blog",
            "uv": 2780,
            "pv": 3908
        }
    ]


    return (
        <div className='dashboard-container'>
            <div className='title'>Thống Kê</div>
            <div className='content'>
                <div className='content-left'>
                    <div className='child doctor'>
                        <span className='text-1'>Tổng bác sĩ</span>
                        <span className='text-2'>100</span>
                    </div>

                    <div className='child specialty'>
                        <span className='text-1'>Tổng chuyên khoa</span>
                        <span className='text-2'>100</span>
                    </div>

                    <div className='child clinic'>
                        <span className='text-1'>Tổng phòng khám</span>
                        <span className='text-2'>100</span>
                    </div>

                    <div className='child blog'>
                        <span className='text-1'>Tổng bài blog</span>
                        <span className='text-2'>100</span>
                    </div>
                </div>

                <div className='content-right'>
                    <BarChart
                        className='barChart'
                        width={400}
                        height={300}
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;