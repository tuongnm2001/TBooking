import './ManageBlog.scss'
import { Container } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { createNewBlog, fetchAllBlogs, getDetailUpdelBlogById } from '../../../service/userService';
import Table from 'react-bootstrap/Table';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import CommonUtils from '../../../ultis/CommonUtils';
import { toast } from 'react-toastify';
import ModalDeleteClinic from './Modal/ModalDeleteClinic';
import ModalDeleteBlog from './Modal/ModalDeleteBlog';

const ManageBlog = () => {

    const [previewImage, setPreviewImage] = useState('')
    const [descriptionHTML, setDescriptionHTML] = useState('')
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('')
    const [listBlogs, setListBlogs] = useState({})
    const [selectedBlog, setSelectedBlog] = useState({})
    const mdParser = new MarkdownIt();
    const [loadingApi, setLoadingApi] = useState(false)
    const [imageBase64, setImageBase64] = useState('')
    const [showModalDelBlog, setShowModalDelBlog] = useState(false)
    const [dataBlog, setDataBlog] = useState({})
    const [descriptionBlog, setDescriptionBlog] = useState('')

    const handleEditorChange = ({ html, text }) => {
        setDescriptionMarkDown(text)
        setDescriptionHTML(html)
    }

    const buildDataSelectedBlog = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                obj.label = item.name
                obj.value = item.id
                result.push(obj)
            })
        }
        return result;
    }

    useEffect(() => {
        getAllBlog()
    }, [])

    const getAllBlog = async () => {
        let res = await fetchAllBlogs();
        if (res && res.errCode === 0) {
            let dataSelectBlog = buildDataSelectedBlog(res.data)
            setListBlogs(dataSelectBlog)
        }
    }

    const handleChangeSelectBlog = async (selectedOption) => {
        setSelectedBlog(selectedOption)

        let res = await getDetailUpdelBlogById(selectedOption.value)
        if (res && res.errCode === 0) {
            setDescriptionHTML(res.data.descriptionHTML)
            setDescriptionMarkDown(res.data.descriptionMarkDown)
            setPreviewImage(res.data.image)
            setDescriptionBlog(res.data.descriptionBlog)
        }
    }

    const handleUploadImage = async (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let base64 = await CommonUtils.getBase64(event.target.files[0])
            if (event.target.files[0] !== 0) {
                setPreviewImage(URL.createObjectURL(event.target.files[0]));
            }
            setImageBase64(base64)
            setPreviewImage(base64)
        }
    }

    const handleDeleteClinic = (item) => {
        setShowModalDelBlog(true)
        setDataBlog(item)
    }

    const handleSaveUpdateBlog = async () => {
        setLoadingApi(true)
        let res = await createNewBlog({
            action: 'EDIT',
            name: selectedBlog.label,
            descriptionBlog: descriptionBlog,
            image: previewImage,
            descriptionHTML: descriptionHTML,
            descriptionMarkDown: descriptionMarkDown,
        })
        if (res && res.errCode === 0) {
            toast.success('Sửa Blog thành công!')
            setLoadingApi(false)
        } else {
            toast.error('Sửa Blog thất bại!')
            setLoadingApi(false)
        }
    }


    return (
        <>
            <div className='manage-blog-container'>
                <div className='title-blogs'>Quản lý bài Blog</div>
                <div className='content-up'>
                    <div className='content-left'>
                        <div className='col-8 form-group'>
                            <label>Chọn bài Blog</label>
                            <Select
                                placeholder='Chọn bài Blog'
                                className='select'
                                onChange={handleChangeSelectBlog}
                                options={listBlogs}
                                value={selectedBlog}
                                name='listBlogs'
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label>Tiêu đề</label>
                            <textarea
                                className='form-control descriptionBlog'
                                type={'text'}
                                value={descriptionBlog}
                                onChange={(event) => setDescriptionBlog(event.target.value)}
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label htmlFor='imgBlog' className='titleImg'>
                                <span>
                                    <i className="far fa-image"></i> Đổi ảnh
                                </span>
                            </label>
                            <div>
                                <input
                                    className='form-control-file'
                                    type={'file'}
                                    onChange={(event) => handleUploadImage(event)}
                                    id='imgBlog'
                                    hidden
                                />
                            </div>

                        </div>

                        <div className='col-md-6 img-preview-blog'>
                            {
                                previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span className='textPreview'>Ảnh</span>
                            }
                        </div>
                    </div>

                    <div className='content-right'>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên phòng khám</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listBlogs && listBlogs.length > 0 &&
                                    listBlogs.map((item, index) => {
                                        return (
                                            <tr key={`specialty-${index}`}>
                                                <td>{item.value}</td>
                                                <td>{item.label}</td>
                                                <td>
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => handleDeleteClinic(item)}
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>

                <div className='col-12'>
                    <MdEditor
                        className='mdEditor'
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={descriptionMarkDown}
                    />
                </div>

                <div>
                    <button
                        disabled={loadingApi}
                        className='btn btn-warning my-3'
                        onClick={() => handleSaveUpdateBlog()}
                    >
                        {
                            loadingApi &&
                            <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                        } Sửa
                    </button>

                </div>

            </div>
            <ModalDeleteBlog
                show={showModalDelBlog}
                setShow={setShowModalDelBlog}
                dataBlog={dataBlog}
                fetchAllBlogs={fetchAllBlogs}
            />
        </>
    );
}

export default ManageBlog;