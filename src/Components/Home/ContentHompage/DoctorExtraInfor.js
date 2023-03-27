import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExtraInforDoctorById } from '../../../service/userService';
import './DoctorExtraInfor.scss'
import NumberFormat from 'react-number-format'

const DoctorExtraInfor = (props) => {

    const [isShowDetailInfor, setIsShowDetailInfor] = useState(false)
    const [dataExtraInfor, setDataExtraInfor] = useState('')
    let { doctorId } = props

    const handleShowHideInforDoctor = () => {
        setIsShowDetailInfor(!isShowDetailInfor)
    }

    useEffect(() => {
        getExtraInforDoctor()
    }, [])

    const getExtraInforDoctor = async () => {
        let res = await getExtraInforDoctorById(doctorId)
        if (res && res.errCode === 0) {
            setDataExtraInfor(res.data)
        }
    }

    return (
        <div className='doctor-extra-infor-container'>
            <div className='content-up'>
                <div className='text-address'><i className="fas fa-map-marker-alt"></i>Địa chỉ khám</div>

                <div className='name-clinic'>
                    {dataExtraInfor && dataExtraInfor.nameClinic ? dataExtraInfor.nameClinic : ''}
                </div>

                <div className='detail-address'>
                    {dataExtraInfor && dataExtraInfor.addressClinic ? dataExtraInfor.addressClinic : ''}
                </div>
            </div>

            <div className='content-down'>

                {
                    isShowDetailInfor === false &&
                    <div className='short-infor'>
                        <span className='price-shortInfor'>GIÁ KHÁM</span>: {dataExtraInfor && dataExtraInfor.priceTypeData && dataExtraInfor.priceTypeData.valueVi &&
                            <NumberFormat
                                value={dataExtraInfor.priceTypeData.valueVi}
                                displayType={'text'}
                                suffix={' VNĐ'}
                                className='currency'
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                            />
                        }

                        <span className='detail' onClick={() => handleShowHideInforDoctor()}>Xem chi tiết</span>
                    </div>
                }

                {
                    isShowDetailInfor === true &&
                    <>
                        <div className='title-price'>GIÁ KHÁM: </div>
                        <div className='detail-infor'>
                            <div className='price'>
                                <span className='left'>Giá khám</span>
                                <span className='right'>
                                    {dataExtraInfor && dataExtraInfor.priceTypeData && dataExtraInfor.priceTypeData.valueVi &&
                                        <NumberFormat
                                            value={dataExtraInfor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            suffix={' VNĐ'}
                                            className='currency'
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                        />
                                    }
                                </span>
                            </div>
                            <div className='note'>
                                {dataExtraInfor && dataExtraInfor.note ? dataExtraInfor.note : ''}
                            </div>
                        </div>
                        <div className='payment'>
                            Người bệnh có thể thanh toán chi phí bằng hình thức :
                            {dataExtraInfor && dataExtraInfor.paymentTypeData ? dataExtraInfor.paymentTypeData.valueVi : ''}
                        </div>
                        <div className='hide-price'>
                            <span onClick={() => handleShowHideInforDoctor()}>Ẩn bảng giá</span>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default DoctorExtraInfor;