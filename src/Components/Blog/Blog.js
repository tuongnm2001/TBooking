import './Blog.scss'
import { fetchAllBlogs } from '../../service/userService'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Auth/Footer'

const Blog = () => {

    const [listBlogs, setListBlogs] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getAllBlog()
    }, [])

    const getAllBlog = async () => {
        let res = await fetchAllBlogs()
        if (res && res.errCode === 0) {
            setListBlogs(res.data)
        }
    }

    const handleClickBlogDetail = (item) => {
        navigate(`/detail-blog/${item.id}`)
    }

    console.log('check listBlogs : ', listBlogs);


    return (
        <>
            <section id="blog" className="blog-mf sect-pt4 route">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="title-box text-center">
                                <h3 className="title-a">
                                    Blog
                                </h3>
                                <p className="subtitle-a">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                </p>
                                <div className="line-mf"></div>
                            </div>
                        </div>
                    </div>

                    <div className='items-blog'>
                        <div className='col-sm-12'>
                            {
                                listBlogs && listBlogs.length > 0 &&
                                listBlogs.map((item, index) => {
                                    return (
                                        <div className="row " key={`blog-${index}`}>
                                            <div className="col-md-4 ">
                                                <div className="card card-blog">
                                                    <div className="card-img">
                                                        <span><img src={item.image} /></span>
                                                    </div>
                                                    <div className="card-body">
                                                        <h3 className="card-title"><span>{item.name}</span></h3>
                                                        <p className="card-description">
                                                            {item.descriptionBlog}
                                                        </p>
                                                    </div>
                                                    <div className="card-footer">
                                                        <div className="post-date">
                                                            <button
                                                                className='btn btn-primary'
                                                                onClick={() => handleClickBlogDetail(item)}
                                                            >
                                                                Đọc thêm
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Blog;