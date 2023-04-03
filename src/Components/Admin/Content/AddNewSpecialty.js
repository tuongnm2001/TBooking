import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import './AddNewSpecialty.scss'
import { useState } from 'react';
import { createNewSpecialty } from '../../../service/userService';
import { toast } from 'react-toastify';
import CommonUtils from '../../../ultis/CommonUtils';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ManageSpecialty from './ManageSpecialty';

const AddNewSpecialty = (props) => {

    const [key, setKey] = useState('home');
    const [loadingApi, setLoadingApi] = useState(false)
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [name, setName] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    const [descriptionHTML, setDescriptionHTML] = useState('')
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('')
    const [previewImage, setPreviewImage] = useState('')

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

    const handleSaveNewSpectialty = async () => {
        setLoadingApi(true)
        let res = await createNewSpecialty({
            action: 'CREATE',
            name,
            imageBase64,
            descriptionHTML,
            descriptionMarkDown
        })

        if (res && res.errCode === 0) {
            setLoadingApi(false)
            toast.success('Tạo chuyên khoa thành công!')
            setName('')
            setImageBase64('')
            setDescriptionHTML('')
            setDescriptionMarkDown('')
            setPreviewImage('')
        } else {
            toast.error('Tạo chuyên khoa thất bại!')
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
            <Tab eventKey="home" title="Thêm chuyên khoa">
                <div className='add-new-specialty-container'>
                    <div className='ms-title'>Thêm mới chuyên khoa</div>

                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Tên chuyên khoa</label>
                            <input
                                className='form-control'
                                type={'text'}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
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

                        </div>

                        <div className='col-md-6 img-preview'>
                            {
                                previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span className='textPreview'>Tải ảnh lên</span>
                            }
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
                                onClick={() => handleSaveNewSpectialty()}
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

            <Tab eventKey="profile" title="Quản lý chuyên khoa">
                <ManageSpecialty />
            </Tab>
        </Tabs>
    );
}

export default AddNewSpecialty;