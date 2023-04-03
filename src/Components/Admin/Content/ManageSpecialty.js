import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Select from 'react-select';
import { createNewSpecialty, getAllSpecialty, getDetailUpdelSpecialtyById } from '../../../service/userService';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import CommonUtils from '../../../ultis/CommonUtils';
import Table from 'react-bootstrap/Table';
import './ManageSpecialty.scss'
import ModalDeleteSpecialty from './Modal/ModalDeleteSpecialty';
import { toast } from 'react-toastify';


const ManageSpecialty = () => {

    const [listSpecialty, setListSpecialty] = useState({})
    const [selectedSpecialty, setSelectedSpecialty] = useState({})
    const [previewImage, setPreviewImage] = useState('')
    const mdParser = new MarkdownIt();
    const [descriptionHTML, setDescriptionHTML] = useState('')
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [dataSpecialty, setDataSpecialty] = useState({})
    const [loadingApi, setLoadingApi] = useState(false)

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

    const handleChangeSelectSpecialty = async (selectedOption) => {
        setSelectedSpecialty(selectedOption);
        let res = await getDetailUpdelSpecialtyById(selectedOption.value)

        if (res && res.errCode === 0) {
            setDescriptionHTML(res.data.descriptionHTML)
            setDescriptionMarkDown(res.data.descriptionMarkDown)
            setPreviewImage(res.data.image)
        }
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

    // console.log(selectedSpecialty);

    const handleUpdateSpecialty = async () => {
        setLoadingApi(true)
        let res = await createNewSpecialty({
            name: selectedSpecialty.label,
            action: 'EDIT',
            descriptionHTML: descriptionHTML,
            descriptionMarkDown: descriptionMarkDown,
        })
        if (res && res.errCode === 0) {
            toast.success('Sửa chuyên khoa thành công!')
            setLoadingApi(false)
        }

        console.log(res);
    }

    const handleDeleteSpecialty = (item) => {
        setShowModalDelete(true)
        setDataSpecialty(item)
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
                                    <i className="far fa-image"></i> Đổi ảnh
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
                                    <span className='textPreview'>Ảnh</span>
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
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => handleDeleteSpecialty(item)}
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
                        onClick={() => handleUpdateSpecialty()}
                    >
                        {
                            loadingApi &&
                            <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                        } Sửa
                    </button>

                </div>
            </div>

            <ModalDeleteSpecialty
                show={showModalDelete}
                setShow={setShowModalDelete}
                dataSpecialty={dataSpecialty}
                fetchAllSpecialty={fetchAllSpecialty}
            />
        </Container>
    );
}

export default ManageSpecialty;