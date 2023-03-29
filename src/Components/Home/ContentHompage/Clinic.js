import './Clinic.scss'
import { fetchAllClinic } from '../../../service/userService';
import { useState } from 'react';
import { useEffect } from 'react';

const Clinic = () => {

    const [dataClinic, setDataClinic] = useState({})

    useEffect(() => {
        getAllClinic()
    }, [])

    const getAllClinic = async () => {
        let res = await fetchAllClinic()
        if (res.errCode === 0) {
            setDataClinic(res.data)
        }
    }

    const handleClinic = () => {
        alert('hello')
    }

    return (
        <>
            <section id="services" className="services">
                <div className="container" data-aos="fade-up">

                    <div className="section-header">
                        <h2>Cơ sở y tế nổi bật</h2>
                        <p>Ea vitae aspernatur deserunt voluptatem impedit deserunt magnam occaecati dssumenda quas ut ad dolores adipisci aliquam.</p>
                    </div>

                    <div className="row gy-5">
                        {
                            dataClinic && dataClinic.length > 0 &&
                            dataClinic.map((item, index) => {
                                return (
                                    <div className="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="200" key={`clinic-${index}`}>
                                        <div className="service-item" onClick={() => handleClinic()}>
                                            <div className='content-up'>
                                                <img src={item.image} className="img-fluid" alt="" />
                                            </div>

                                            <div className='content-down'>
                                                <div className="details position-relative">
                                                    <span href="#" className="stretched-link">
                                                        <h3>{item.name}</h3>
                                                    </span>
                                                    <p>{item.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Clinic;