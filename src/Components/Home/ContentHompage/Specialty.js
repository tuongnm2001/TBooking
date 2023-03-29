import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSpecialty } from '../../../service/userService';
import DetailSpecialty from './DetailSpecialty';
import './Specialty.scss'


const Specialty = () => {

    const [dataSpecialty, setDataSpecialty] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllSpecialty()
    }, [])

    const fetchAllSpecialty = async () => {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            setDataSpecialty(res.data)
        }
    }

    const handleViewDetailSpecialty = (item) => {
        navigate(`/detail-specialty/${item.id}`)
    }

    console.log('check data dataSpecialty :', dataSpecialty);

    return (
        <>
            <div className='section-specialty-container'>
                <section id="services" className="services">
                    <div className="container">

                        <div className="section-title">
                            <h2>Chuyên khoa phổ biến</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="row specilty">
                            {
                                dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className="col-lg-4 col-md-6 d-flex align-items-stretch p-3"
                                            key={`specialty-${index}`}
                                            onClick={() => handleViewDetailSpecialty(item)}
                                        >
                                            <div className="icon-box">
                                                {/* <div className='imageSpecialty'>
                                                <img src={item.image} />
                                            </div> */}
                                                <div className="icon"><i className="fas fa-heartbeat"></i></div>
                                                <h4>
                                                    <span href="">{item.name}</span>
                                                </h4>
                                                <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {/* 
                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                            <div className="icon-box">
                                <div className="icon"><i className="fas fa-pills"></i></div>
                                <h4><a href="">Sed ut perspiciatis</a></h4>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                            <div className="icon-box">
                                <div className="icon"><i className="fas fa-hospital-user"></i></div>
                                <h4><a href="">Magni Dolores</a></h4>
                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                            <div className="icon-box">
                                <div className="icon"><i className="fas fa-dna"></i></div>
                                <h4><a href="">Nemo Enim</a></h4>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                            <div className="icon-box">
                                <div className="icon"><i className="fas fa-wheelchair"></i></div>
                                <h4><a href="">Dele cardo</a></h4>
                                <p>Quis consequatur saepe eligendi voluptatem consequatur dolor consequuntur</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                            <div className="icon-box">
                                <div className="icon"><i className="fas fa-notes-medical"></i></div>
                                <h4><a href="">Divera don</a></h4>
                                <p>Modi nostrum vel laborum. Porro fugit error sit minus sapiente sit aspernatur</p>
                            </div>
                        </div> */}

                        </div>

                    </div>
                </section>

            </div>
        </>
    );
}

export default Specialty;