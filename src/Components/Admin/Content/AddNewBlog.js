import './AddNewBlog.scss'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import { createNewBlog } from '../../../service/userService';
import { toast } from 'react-toastify';
import CommonUtils from '../../../ultis/CommonUtils';
import ManageBlog from './ManageBlog';

const AddNewBlog = () => {

    const [key, setKey] = useState('home');
    const [loadingApi, setLoadingApi] = useState(false)
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [name, setName] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    const [descriptionHTML, setDescriptionHTML] = useState('')
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [descriptionBlog, setDescriptionBlog] = useState('')

    const handleEditorChange = ({ html, text }) => {
        setDescriptionMarkDown(text)
        setDescriptionHTML(html)
    }

    const handleUploadImage = async (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let base64 = await CommonUtils.getBase64(event.target.files[0])
            if (event.target.files[0] !== 0) {
                setPreviewImage(URL.createObjectURL(event.target.files[0]));
            }
            setImageBase64(base64)
        }
    }

    const handleSaveNewBlog = async () => {
        setLoadingApi(true)
        let res = await createNewBlog({
            action: 'CREATE',
            imageBase64,
            name,
            descriptionBlog,
            descriptionHTML,
            descriptionMarkDown
        })

        if (res && res.errCode === 0) {
            setLoadingApi(false)
            toast.success('Tạo bài Blog thành công!')
            setName('')
            setImageBase64('')
            setDescriptionHTML('')
            setDescriptionMarkDown('')
            setPreviewImage('')
            setDescriptionBlog('')
        } else {
            toast.error('Tạo bài Blog thất bại!')
            setLoadingApi(false)
        }
    }


    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            fill
            justify
        >
            <Tab eventKey="home" title="Thêm bài Blog">
                <div className='manage-blog-container'>
                    <div className='ms-title'>Thêm bài Blog</div>

                    <div className='add-new-blog row'>
                        <div className='col-6 form-group'>
                            <label>Tên Blog</label>
                            <input
                                className='form-control'
                                type={'text'}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label>Tiêu đề</label>
                            <textarea
                                className='form-control'
                                type={'text'}
                                value={descriptionBlog}
                                onChange={(event) => setDescriptionBlog(event.target.value)}
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label htmlFor='img' className='titleImg'><span>
                                <i className="far fa-image"></i> Tải ảnh lên
                            </span></label>
                            <div>
                                <input
                                    className='form-control-file'
                                    type={'file'}
                                    onChange={(event) => handleUploadImage(event)}
                                    id='img'
                                    hidden
                                />
                            </div>
                            <div className='col-md-6 img-preview-blog'>
                                {
                                    previewImage ?
                                        <img src={previewImage} />
                                        :
                                        <span className='textPreview'>Tải ảnh lên</span>
                                }
                            </div>
                        </div>

                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange}
                                value={descriptionMarkDown}
                            />
                        </div>

                        <div>
                            <button
                                disabled={loadingApi}
                                className='btn btn-primary my-3'
                                onClick={() => handleSaveNewBlog()}
                            >
                                {
                                    loadingApi &&
                                    <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                                } Lưu
                            </button>
                        </div>
                    </div>

                </div >

            </Tab>

            <Tab eventKey="profile" title="Quản lý bài Blog">
                <ManageBlog />
            </Tab>
        </Tabs>
    );
}

export default AddNewBlog;