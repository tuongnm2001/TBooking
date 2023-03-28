//Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Doctor.scss'
import Slider from "react-slick";
import { getTopDoctor } from '../../../service/userService';
import { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";
import DetailDoctor from "./DetaiDoctor";

const Doctor = () => {

    const [listDoctors, setListDoctors] = useState({})
    const [dataDoctorInfor, setDataDoctorInfor] = useState({})
    const [showHeader, setShowHedear] = useState(false)
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate();

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    useEffect(() => {
        handleGetTopDoctor()
    }, [])

    const handleGetTopDoctor = async () => {
        setLoading(true)
        let res = await getTopDoctor('');
        if (res.errCode === 0) {
            setListDoctors(res.data)
        }
        setLoading(false)
    }

    const handleViewDetailDoctor = (doctor) => {
        setDataDoctorInfor(doctor);
        navigate(`/detail-doctor/${doctor.id}`);
        setShowHedear(true)
    }

    console.log(listDoctors);

    return (
        <>
            <div className='section-doctor-container'>
                <section className="doctors section-bg">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2>Bác sĩ nổi bật</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="row">
                            <Slider {...settings}>
                                {
                                    listDoctors && listDoctors.length > 0 &&
                                    listDoctors.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                        let positionName = `${item.Doctor_Infor.specialtyData.name}`
                                        return (
                                            <div
                                                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                                                key={`doctor-${index}`}
                                                onClick={() => handleViewDetailDoctor(item)}
                                            >
                                                <div className="member">
                                                    <div className="member-img">
                                                        <img src={imageBase64} />
                                                    </div>
                                                    <div className="member-info">
                                                        <h4>{nameVi}</h4>
                                                        <span>
                                                            {positionName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </section>

                {
                    loading &&
                    <i className="fas fa-spinner fa-pulse loading-doctor"></i>
                }
            </div >



            {
                showHeader &&
                <DetailDoctor
                    dataDoctorInfor={dataDoctorInfor}
                />

            }
        </>

    );
}

export default Doctor;