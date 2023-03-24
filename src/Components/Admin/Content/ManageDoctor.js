import MarkdownIt from 'markdown-it';
import './ManageDoctor.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchAllCode, getAllDoctors, getDetailInforDoctor, saveDetailDoctor } from '../../../service/userService';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';

const ManageDoctor = () => {

    const [contentMarkDown, setContentMarkDown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [description, setDescription] = useState('')
    const [loadingApi, setLoadingApi] = useState(false)
    const [hasOldData, setHasOldData] = useState(false)

    const [allDoctors, setAllDoctors] = useState({})
    const [selectedDoctor, setSelectedDoctor] = useState(null)

    //doctor infor table
    const [listPrice, setListPrice] = useState({})
    const [selectedPrice, setSelectedPrice] = useState(null)

    const [listPayment, setListPayment] = useState({})
    const [selectedPayment, setSelectedPayment] = useState(null)

    const [listProvince, setListProvince] = useState({})
    const [selectedProvince, setSelectedProvince] = useState(null)

    const [nameClinic, setNameClinic] = useState('')
    const [addressClinic, setAddressClinic] = useState('')
    const [note, setNote] = useState('')

    const handleEditorChange = ({ html, text }) => {
        setContentMarkDown(text)
        setContentHTML(html)
        console.log('handleEditorChange', html, text);
    }

    const handleSaveContentMarkDown = async () => {
        setLoadingApi(true)
        let res = await saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkDown,
            description: description,
            doctorId: selectedDoctor.value,
            action: hasOldData === true ? 'EDIT' : 'CREATE'
        })

        if (res.errCode === 0) {
            setLoadingApi(false)
            toast.success(res.errMessage)
        } else {
            toast.success(res.errMessage)
        }

        console.log(selectedDoctor);
    }

    const handleChangeSelect = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor)
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            setContentHTML(markdown.contentHTML)
            setContentMarkDown(markdown.contentMarkdown)
            setDescription(markdown.description)
            setHasOldData(true)
        } else {
            setContentHTML('')
            setContentMarkDown('')
            setDescription('')
            setHasOldData(false)
        }
    };

    const handleOnChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    useEffect(() => {
        handleGetAllDoctors()
    }, [])

    const handleGetAllDoctors = async () => {
        let res = await getAllDoctors();
        if (res.errCode === 0) {
            let dataSelect = buidDataSelect(res.data);
            setAllDoctors(dataSelect)
        }
    }

    // const getRequiredDoctorInfor = async () => {
    //     let resPrice = await fetchAllCode('PRICE');
    //     let resPayment = await fetchAllCode('PAYMENT');
    //     let resProvince = await fetchAllCode('PROVINCE');

    //     if (resPrice && resPrice.errCode === 0 &&
    //         resPayment && resPayment.errCode === 0 &&
    //         resProvince && resProvince.errCode === 0 &&
    //     ) {
    //         let data = {
    //             resPrice: resPrice.data,
    //             resPayment: resPayment.data,
    //             resProvince: resProvince.data
    //         }
    //     }
    // }

    useEffect(() => {
        fetAllCodePrice()
        fetAllCodePayment()
        fetAllCodeProvince()
    }, [])

    const fetAllCodePrice = async () => {
        let res = await fetchAllCode('PRICE')
        if (res.errCode === 0) {
            setListPrice(res.data)
        }
    }

    const fetAllCodePayment = async () => {
        let res = await fetchAllCode('PAYMENT')
        if (res.errCode === 0) {
            setListPayment(res.data)
        }
    }

    const fetAllCodeProvince = async () => {
        let res = await fetchAllCode('PROVINCE')
        if (res.errCode === 0) {
            setListProvince(res.data)
        }
    }

    const buidDataSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`

                obj.label = labelVi
                obj.value = item.id
                result.push(obj)
            })
        }
        return result;
    }

    return (
        <div className='manage-doctor-container'>

            <div className='manage-doctor-title'>
                Add Information Doctor
            </div>

            <div className='more-infor'>
                <div className='content-left'>
                    <label>Chọn bác sĩ</label>
                    <Select
                        placeholder='Chọn bác sĩ'
                        className='select'
                        value={selectedDoctor}
                        onChange={handleChangeSelect}
                        options={allDoctors}
                    />
                </div>

                <div className='content-right form-group'>
                    <label>Thông tin giới thiệu</label>
                    <textarea
                        className='form-control infor'
                        rows={4}
                        value={description}
                        onChange={(event) => handleOnChangeDescription(event)}
                    >
                        a
                    </textarea>
                </div>
            </div>

            <div className='more-infor-extra row'>
                <div className='col-4 form-group'>
                    {/* <label>Chọn giá</label>
                    <Select
                        placeholder='Chọn giá'
                        className='select'
                        // value={selectedDoctor}
                        // onChange={handleChangeSelect}
                        options={listPrice}
                    /> */}
                    <Form.Label>Chọn giá</Form.Label>
                    <Form.Select >
                        {
                            listPrice && listPrice.length > 0 &&
                            listPrice.map((item, index) => {
                                return (
                                    <option key={`gender-${index}`} value={item.keyMap} >
                                        {item.valueVi}
                                    </option>
                                )
                            })
                        }
                    </Form.Select>
                </div>

                <div className='col-4 form-group'>
                    <Form.Label>Phương thức thanh toán</Form.Label>
                    <Form.Select >
                        {
                            listPayment && listPayment.length > 0 &&
                            listPayment.map((item, index) => {
                                return (
                                    <option key={`gender-${index}`} value={item.keyMap} >
                                        {item.valueVi}
                                    </option>
                                )
                            })
                        }
                    </Form.Select>
                </div>

                <div className='col-4 form-group'>
                    <Form.Label>Chọn tỉnh thành</Form.Label>
                    <Form.Select >
                        {
                            listProvince && listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return (
                                    <option key={`gender-${index}`} value={item.keyMap} >
                                        {item.valueVi}
                                    </option>
                                )
                            })
                        }
                    </Form.Select>
                </div>

                <div className='col-4 form-group'>
                    <label>Tên phòng khám</label>
                    <input className='form-control' />
                </div>

                <div className='col-4 form-group'>
                    <label>Địa chỉ phòng khám</label>
                    <input className='form-control' />
                </div>

                <div className='col-4 form-group'>
                    <label>Lưu ý</label>
                    <input className='form-control' />
                </div>
            </div>

            <div className='manage-doctor-editor'>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkDown}
                />
            </div>

            <div className='btnSave'>
                <button
                    className={hasOldData === true ? 'btn btn-warning' : 'btn btn-primary'}
                    onClick={() => handleSaveContentMarkDown()}
                    disabled={loadingApi}
                >
                    {
                        loadingApi &&
                        <i disabled={loadingApi} className="fa-solid fa-circle-notch fa-spin"></i>
                    } {hasOldData === true ? 'Sửa' : 'Lưu'}
                </button>
            </div>
        </div>
    );
}

export default ManageDoctor;