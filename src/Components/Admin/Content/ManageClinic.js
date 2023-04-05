import { Container } from 'react-bootstrap';
import './ManageClinic.scss'
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { createNewClinic, fetchAllClinic, getDetailUpdelClinicById } from '../../../service/userService';
import Table from 'react-bootstrap/Table';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import CommonUtils from '../../../ultis/CommonUtils';
import { toast } from 'react-toastify';
import ModalDeleteClinic from './Modal/ModalDeleteClinic';

const ManageClinic = () => {

    const [previewImage, setPreviewImage] = useState('')
    const [descriptionHTML, setDescriptionHTML] = useState('')
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('')
    const [listClinics, setListClinics] = useState({})
    const [selectedClinic, setSelectedClinic] = useState({})
    const mdParser = new MarkdownIt();
    const [loadingApi, setLoadingApi] = useState(false)
    const [imageBase64, setImageBase64] = useState('')
    const [showModalDelClinic, setShowModalDelClinic] = useState(false)
    const [dataClinic, setDataClinic] = useState({})

    const handleEditorChange = ({ html, text }) => {
        setDescriptionMarkDown(text)
        setDescriptionHTML(html)
    }

    const buildDataSelectedClinic = (inputData) => {
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
        getAllClinic()
    }, [])

    const getAllClinic = async () => {
        let res = await fetchAllClinic();
        if (res && res.errCode === 0) {
            let dataSelectClinic = buildDataSelectedClinic(res.data)
            setListClinics(dataSelectClinic)
        }
    }

    const handleChangeSelectClinic = async (selectedOption) => {
        setSelectedClinic(selectedOption)

        let res = await getDetailUpdelClinicById(selectedOption.value)
        if (res && res.errCode === 0) {
            setDescriptionHTML(res.data.descriptionHTML)
            setDescriptionMarkDown(res.data.descriptionMarkDown)
            setPreviewImage(res.data.image)
        }
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

    const handleDeleteClinic = (item) => {
        setShowModalDelClinic(true)
        setDataClinic(item)
    }

    const handleSaveUpdateSpecialty = async () => {
        setLoadingApi(true)
        let res = await createNewClinic({
            action: 'EDIT',
            name: selectedClinic.label,
            image: previewImage,
            descriptionHTML: descriptionHTML,
            descriptionMarkDown: descriptionMarkDown,
        })
        if (res && res.errCode === 0) {
            toast.success('Sửa phòng khám thành công!')
            setLoadingApi(false)
        } else {
            toast.error('Sửa phòng khám thất bại!')
            setLoadingApi(false)
        }
    }

    return (
        <Container>
            <div className='manage-clinic-container'>
                <div className='name-clinic'>Quản lí phòng khám</div>
                <div className='content-up'>
                    <div className='content-left'>
                        <div className='col-8 form-group'>
                            <label>Chọn phòng khám</label>
                            <Select
                                placeholder='Chọn chuyên khoa'
                                className='select'
                                onChange={handleChangeSelectClinic}
                                options={listClinics}
                                value={selectedClinic}
                                name='listSpecialty'
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label htmlFor='imgClinic' className='titleImg'>
                                <span>
                                    <i className="far fa-image"></i> Đổi ảnh
                                </span>
                            </label>
                            <div>
                                <input
                                    className='form-control-file'
                                    type={'file'}
                                    onChange={(event) => handleUploadImage(event)}
                                    id='imgClinic'
                                    hidden
                                />
                            </div>

                        </div>

                        <div className='col-md-6 img-preview-clinic'>
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
                                    listClinics && listClinics.length > 0 &&
                                    listClinics.map((item, index) => {
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
                        onClick={() => handleSaveUpdateSpecialty()}
                    >
                        {
                            loadingApi &&
                            <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                        } Sửa
                    </button>

                </div>

            </div>

            <ModalDeleteClinic
                dataClinic={dataClinic}
                show={showModalDelClinic}
                setShow={setShowModalDelClinic}
            />
        </Container>
    );
}

export default ManageClinic;