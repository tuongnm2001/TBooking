import { useState } from 'react';
import './DoctorExtraInfor.scss'

const DoctorExtraInfor = () => {

    const [isShowDetailInfor, setIsShowDetailInfor] = useState(true)

    const handleShowHideInforDoctor = () => {
        setIsShowDetailInfor(!isShowDetailInfor)
    }

    return (
        <div className='doctor-extra-infor-container'>
            <div className='content-up'>
                <div className='text-address'>Địa chỉ khám</div>
                <div className='name-clinic'>Phòng khám chuyên khoa Da Liễu</div>
                <div className='detail-address'>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
            </div>

            <div className='content-down'>
                {
                    isShowDetailInfor === false &&
                    <div className='short-infor'>
                        GIÁ KHÁM:250.000đ.
                        <span onClick={() => handleShowHideInforDoctor()}>Xem chi tiết</span>
                    </div>
                }

                {
                    isShowDetailInfor === true &&
                    <>
                        <div className='title-price'>GIÁ KHÁM: </div>
                        <div className='detail-infor'>
                            <div className='price'>
                                <span className='left'>Giá khám</span>
                                <span className='right'>250.000đ</span>
                            </div>
                            <div className='note'>Giá khám Được ưu tiên</div>
                        </div>
                        <div className='payment'>THanh toán hoặc quẹt thẻ</div>
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