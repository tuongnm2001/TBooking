import Header from '../Header/Header';
import Footer from '../Auth/Footer'
import './BlogDetail.scss'
import { fetchAllBlogs, getDetailBlogById } from '../../service/userService';
import { useState } from 'react';
import { useEffect } from 'react';
import _ from 'lodash'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Menu } from 'react-pro-sidebar';

const BlogDetail = () => {

    const [dataBlogs, setDataBlogs] = useState({})
    const [listBlogs, setListBlogs] = useState({})
    let params = useParams();
    let id = params.id

    useEffect(() => {
        getDetailBlogs()
        getAllBlog()
    }, [])

    const getDetailBlogs = async () => {
        let res = await getDetailBlogById({
            id: id
        })
        if (res && res.errCode == 0) {
            setDataBlogs(res.data)
        }
    }

    const getAllBlog = async () => {
        let res = await fetchAllBlogs()
        if (res && res.errCode === 0) {
            setListBlogs(res.data)
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
                    <div className='title-blogs'>Blog khác</div>
                    {
                        listBlogs && listBlogs.length > 0 &&
                        listBlogs.map((item, index) => {
                            return (
                                <div className='aside-blog' key={`asideBlog-${index}`}>
                                    <Menu>
                                        <a href={`/detail-blog/${item.id}`} className='nav-link'> &#9472; {item.name}</a>
                                    </Menu>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BlogDetail;