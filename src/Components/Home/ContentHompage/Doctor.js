//Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Doctor.scss'
import Slider from "react-slick";
import { getTopDoctor } from '../../../service/userService';
import { useEffect, useState } from "react";
import { Buffer } from 'buffer';

const Doctor = () => {

    const [listDoctors, setListDoctors] = useState({})

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
        let res = await getTopDoctor('');
        if (res.errCode === 0) {
            setListDoctors(res.data)
        }
        console.log(listDoctors);
    }

    return (
        <div className='section-doctor-container'>
            <section className="doctors section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Doctors</h2>
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
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" key={`doctor-${index}`}>
                                            <div className="member">
                                                <div className="member-img">
                                                    <img src={imageBase64} />
                                                </div>
                                                <div className="member-info">
                                                    <h4>{nameVi}</h4>
                                                    <span>Chief Medical Officer</span>
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
        </div >
    );
}

export default Doctor;