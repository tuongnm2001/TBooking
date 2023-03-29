import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Select from 'react-select';
import { getAllSpecialty } from '../../../service/userService';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import CommonUtils from '../../../ultis/CommonUtils';
import Table from 'react-bootstrap/Table';
import './ManageSpecialty.scss'


const ManageSpecialty = () => {

    const [listSpecialty, setListSpecialty] = useState({})
    const [selectedSpecialty, setSelectedSpecialty] = useState({})
    const [previewImage, setPreviewImage] = useState('')
    const mdParser = new MarkdownIt();
    const [descriptionHTML, setDescriptionHTML] = useState('')
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('')
    const [imageBase64, setImageBase64] = useState('')


    const buidDataSelectSpecialty = (inputData) => {
        let result = [];
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
        fetchAllSpecialty()
    }, [])

    const fetchAllSpecialty = async () => {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            let dataSelectSpecialy = buidDataSelectSpecialty(res.data)
            setListSpecialty(dataSelectSpecialy)
        }
    }

    const handleChangeSelectSpecialty = (selectedOption) => {
        console.log(selectedOption);
    }

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

    return (
        <Container>
            <div className='manage-specialty-container'>
                <label className='title-specialty'>Quản lý chuyên khoa</label>
                <div className='content-up'>
                    <div className='content-left'>
                        <div className='col-8 form-group'>
                            <label>Chọn chuyên khoa</label>
                            <Select
                                placeholder='Chọn chuyên khoa'
                                className='select'
                                onChange={handleChangeSelectSpecialty}
                                options={listSpecialty}
                                value={selectedSpecialty}
                                name='listSpecialty'
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label htmlFor='img' className='titleImg'>
                                <span>
                                    <i className="far fa-image"></i> Tải ảnh lên
                                </span>
                            </label>
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

                        <div className='col-md-6 img-preview-sp'>
                            {
                                previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span className='textPreview'>Tải ảnh lên</span>
                            }
                        </div>
                    </div>

                    <div className='content-right'>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên chuyên khoa</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listSpecialty && listSpecialty.length > 0 &&
                                    listSpecialty.map((item, index) => {
                                        return (
                                            <tr key={`specialty-${index}`}>
                                                <td>{item.value}</td>
                                                <td>{item.label}</td>
                                                <td>
                                                    <button className='btn btn-danger'>Xóa</button>
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
                    {/* <button
                        disabled={loadingApi}
                        className='btn btn-primary my-3'
                        onClick={() => handleSaveNewSpectialty()}
                    >
                        {
                            loadingApi &&
                            <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                        } Lưu
                    </button> */}
                    <button className='btn btn-primary my-3'>Lưu</button>
                </div>
            </div>
        </Container>
    );
}

export default ManageSpecialty;