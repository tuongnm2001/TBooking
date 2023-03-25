import MarkdownIt from 'markdown-it';
import './ManageDoctor.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchAllCode, getAllDoctors, getDetailInforDoctor, saveDetailDoctor } from '../../../service/userService';
import { toast } from 'react-toastify';

const ManageDoctor = () => {

    const [contentMarkDown, setContentMarkDown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [description, setDescription] = useState('')
    const [loadingApi, setLoadingApi] = useState(false)
    const [hasOldData, setHasOldData] = useState(false)

    const [allDoctors, setAllDoctors] = useState({})
    const [selectedDoctor, setSelectedDoctor] = useState('')

    //doctor infor table
    const [listPrice, setListPrice] = useState({})
    const [selectedPrice, setSelectedPrice] = useState('')

    const [listPayment, setListPayment] = useState({})
    const [selectedPayment, setSelectedPayment] = useState('')

    const [listProvince, setListProvince] = useState({})
    const [selectedProvince, setSelectedProvince] = useState('')

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
            action: hasOldData === true ? 'EDIT' : 'CREATE',

            selectedPrice: selectedPrice.value,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            nameClinic: nameClinic,
            addressClinic: addressClinic,
            note: note,

        })

        if (res.errCode === 0) {
            setLoadingApi(false)
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
            setLoadingApi(false)
        }
    }

    const handleChangeSelect = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor)
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown

            let nameClinic = '', addressClinic = '', paymentId = '',
                priceId = '', provinceId = '', note = '', selectedPayment = '', selectedPrice = '',
                selectedProvince = ''
            if (res.data.Doctor_Infor) {
                nameClinic = res.data.Doctor_Infor.nameClinic
                addressClinic = res.data.Doctor_Infor.addressClinic
                note = res.data.Doctor_Infor.note

                paymentId = res.data.Doctor_Infor.paymentId
                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }

            setContentHTML(markdown.contentHTML)
            setContentMarkDown(markdown.contentMarkdown)
            setDescription(markdown.description)
            setHasOldData(true)
            setNameClinic(nameClinic)
            setAddressClinic(addressClinic)
            setNote(note)
            setSelectedPayment(selectedPayment)
            setSelectedPrice(selectedPrice)
            setSelectedProvince(selectedProvince)
        } else {
            setContentHTML('')
            setContentMarkDown('')
            setDescription('')
            setHasOldData(false)
            setNameClinic('')
            setAddressClinic('')
            setNote('')
            setSelectedPayment('')
            setSelectedPrice('')
            setSelectedProvince('')
        }
        console.log(res);
    };

    const handleChangeSelectPrice = async (selectedOption) => {
        let selectedPrice = selectedOption
        setSelectedPrice(selectedPrice)
    }

    const handleChangeSelectPayment = async (selectedOption) => {
        let selectedPayment = selectedOption
        setSelectedPayment(selectedPayment)
    }

    const handleChangeSelectProvince = async (selectedOption) => {
        let selectedProvince = selectedOption
        setSelectedProvince(selectedProvince)
    }

    console.log(selectedPrice, selectedPayment
        , selectedProvince);

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

    useEffect(() => {
        fetAllCodePrice()
        fetAllCodePayment()
        fetAllCodeProvince()
    }, [])

    const fetAllCodePrice = async () => {
        let res = await fetchAllCode('PRICE')
        if (res.errCode === 0) {
            let dataSelectPrice = buidDataSelectInforDoctor(res.data, 'PRICE')
            setListPrice(dataSelectPrice)
        }
    }

    const fetAllCodePayment = async () => {
        let res = await fetchAllCode('PAYMENT')
        if (res.errCode === 0) {
            let dataSelectPayment = buidDataSelectInforDoctor(res.data, 'PAYMENT')
            setListPayment(dataSelectPayment)
        }
    }

    const fetAllCodeProvince = async () => {
        let res = await fetchAllCode('PROVINCE')
        if (res.errCode === 0) {
            let dataSelectProvince = buidDataSelectInforDoctor(res.data, 'PROVINCE')
            setListProvince(dataSelectProvince)
        }
    }

    const buidDataSelectInforDoctor = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.valueVi}`

                obj.label = labelVi
                obj.value = item.keyMap
                result.push(obj)
            })
        }
        return result;
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
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
            </div>

            <div className='more-infor-extra row'>
                <div className='col-4 form-group'>
                    <label>Chọn giá</label>
                    <Select
                        placeholder='Chọn giá'
                        options={listPrice}
                        className='select'
                        onChange={handleChangeSelectPrice}
                        value={selectedPrice}
                        name='selectedPrice'
                    />
                </div>

                <div className='col-4 form-group'>
                    <label>Phương thức thanh toán</label>
                    <Select
                        placeholder='Phương thức thanh toán'
                        className='select'
                        onChange={handleChangeSelectPayment}
                        options={listPayment}
                        value={selectedPayment}
                        name='selectedPayment'
                    />
                </div>

                <div className='col-4 form-group'>
                    <label>Chọn tỉnh thành</label>
                    <Select
                        placeholder='Chọn tỉnh thành'
                        className='select'
                        onChange={handleChangeSelectProvince}
                        options={listProvince}
                        value={selectedProvince}
                        name='selectedProvince'

                    />
                </div>

                <div className='col-4 form-group'>
                    <label>Tên phòng khám</label>
                    <textarea
                        className='form-control'
                        value={nameClinic}
                        onChange={(event) => setNameClinic(event.target.value)}
                    />
                </div>

                <div className='col-4 form-group'>
                    <label>Địa chỉ phòng khám</label>
                    <textarea
                        className='form-control'
                        value={addressClinic}
                        onChange={(event) => setAddressClinic(event.target.value)}
                    />
                </div>

                <div className='col-4 form-group'>
                    <label>Lưu ý</label>
                    <textarea
                        className='form-control'
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                    />
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