import Header from '../Header/Header';
import Footer from '../Auth/Footer'
import './BlogDetail.scss'
import { getDetailBlogById } from '../../service/userService';
import { useState } from 'react';
import { useEffect } from 'react';
import _ from 'lodash'
import { useParams } from 'react-router-dom';

const BlogDetail = () => {

    const [dataBlogs, setDataBlogs] = useState({})
    let params = useParams();
    let id = params.id

    useEffect(() => {
        getAllBlogs()
    }, [])

    const getAllBlogs = async () => {
        let res = await getDetailBlogById({
            id: id
        })
        if (res && res.errCode == 0) {
            setDataBlogs(res.data)
        }
    }

    return (
        <>
            <Header />
            <div className='blog-detail-container'>
                <div className='content-left' >
                    <img src={dataBlogs.image} />
                    <div className='title-blog'>{dataBlogs.name}</div>
                    <div className='content-blog'>
                        {
                            dataBlogs && !_.isEmpty(dataBlogs) &&
                            <>

                                <div dangerouslySetInnerHTML={{
                                    __html: dataBlogs.descriptionHTML
                                }} />
                            </>
                        }
                    </div>
                </div>

                <div className='content-right'>
                    content-left
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BlogDetail;