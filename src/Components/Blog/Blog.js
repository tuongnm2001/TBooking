import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Blog.scss'
import img from '../../assets/img/about.jpg'

const Blog = () => {
    return (
        <>
            <div className='blog-container'>
                <div className='breadcrumb'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            Library
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

            </div>

            <div className='content-main'>
                <div className='content'>
                    <img src={img} />
                    <label>
                        Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia
                    </label>
                </div>

                <div className='content'>
                    <img src={img} />
                    <label>
                        Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia
                    </label>
                </div>

                <div className='content'>
                    <img src={img} />
                    <label>
                        Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia
                    </label>
                </div>

                <div className='content'>
                    <img src={img} />
                    <label>
                        Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia
                    </label>
                </div>
                <div className='content'>
                    <img src={img} />
                    <label>
                        Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia
                    </label>
                </div>
            </div>

            <div className='footer'>

            </div>
        </>
    );
}

export default Blog;