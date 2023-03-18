import './Doctor.scss'
import imgDoctor from '../../../assets/img/doctors/doctors-1.jpg'
import Carousel from 'react-bootstrap/Carousel';
import Slider from "react-slick";
//Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Doctor = () => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

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
                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                                <div className="member" data-aos="fade-up" data-aos-delay="100">
                                    <div className="member-img">
                                        <img src={imgDoctor} />
                                    </div>
                                    <div className="member-info">
                                        <h4>Walter White</h4>
                                        <span>Chief Medical Officer</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                                <div className="member" data-aos="fade-up" data-aos-delay="200">
                                    <div className="member-img">
                                        <img src={imgDoctor} />
                                    </div>
                                    <div className="member-info">
                                        <h4>Sarah Jhonson</h4>
                                        <span>Anesthesiologist</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                                <div className="member" data-aos="fade-up" data-aos-delay="300">
                                    <div className="member-img">
                                        <img src={imgDoctor} />
                                    </div>
                                    <div className="member-info">
                                        <h4>William Anderson</h4>
                                        <span>Cardiology</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                                <div className="member" data-aos="fade-up" data-aos-delay="400">
                                    <div className="member-img">
                                        <img src={imgDoctor} />
                                    </div>
                                    <div className="member-info">
                                        <h4>Amanda Jepson</h4>
                                        <span>Neurosurgeon</span>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                                <div className="member" data-aos="fade-up" data-aos-delay="400">
                                    <div className="member-img">
                                        <img src={imgDoctor} />
                                    </div>
                                    <div className="member-info">
                                        <h4>Amanda Jepson</h4>
                                        <span>Neurosurgeon</span>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>
        </div >
    );
}

export default Doctor;