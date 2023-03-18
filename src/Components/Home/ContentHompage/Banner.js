import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../../assets/img/slide/slide-1.jpg'
import img2 from '../../../assets/img/slide/slide-2.jpg'
import img3 from '../../../assets/img/slide/slide-3.jpg'

const Banner = () => {
    return (
        <Carousel variant='dark'>
            <Carousel.Item>
                <img
                    className="d-block h-80 w-100"
                    src={img1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block h-80 w-100"
                    src={img2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block h-80 w-100"
                    src={img3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Banner;