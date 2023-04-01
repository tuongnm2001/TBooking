import MarkdownIt from 'markdown-it';
import './ManageDoctor.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchAllClinic, fetchAllCode, getAllDoctors, getAllSpecialty, getDetailInforDoctor, saveDetailDoctor } from '../../../service/userService';
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

    const [listClinic, setListClinic] = useState('')
    const [selectedClinic, setSelectedClinic] = useState('')

    const [listSpecialty, setListSpecialty] = useState('')
    const [selectedSpecialty, setSelectedSpecialty] = useState('')

    const [nameClinic, setNameClinic] = useState('')
    const [addressClinic, setAddressClinic] = useState('')
    const [note, setNote] = useState('')

    const handleEditorChange = ({ html, text }) => {
        setContentMarkDown(text)
        setContentHTML(html)
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
            clinicId: selectedClinic.value,
            specialtyId: selectedSpecialty.value

        })

        if (res.errCode === 0) {
            setDescription('')
            setAllDoctors('')
            setListPrice('')
            setListPayment('')
            setListProvince('')
            setListClinic('')
            setListSpecialty('')
            setNameClinic('')
            setAddressClinic('')
            setNote('')
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
                selectedProvince = '', specialtyId = '', selectedSpecialty = '', clinicId = '', selectedClinic = ''
            if (res.data.Doctor_Infor) {
                nameClinic = res.data.Doctor_Infor.nameClinic
                addressClinic = res.data.Doctor_Infor.addressClinic
                note = res.data.Doctor_Infor.note

                paymentId = res.data.Doctor_Infor.paymentId
                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId
                specialtyId = res.data.Doctor_Infor.specialtyId
                clinicId = res.data.Doctor_Infor.clinicId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })

                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
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
            setSelectedSpecialty(selectedSpecialty)
            setSelectedClinic(selectedClinic)
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
            selectedSpecialty('')
            setSelectedClinic('')
        }
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

    const handleChangeSelectSpecialty = async (selectedOption) => {
        let selectedSpecialty = selectedOption
        setSelectedSpecialty(selectedSpecialty)
    }

    const handleChangeSelectClinic = async (selectedOption) => {
        let selectedClinic = selectedOption
        setSelectedClinic(selectedClinic)
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

    useEffect(() => {
        fetAllCodePrice()
        fetAllCodePayment()
        fetAllCodeProvince()
        fetAllSpecialty()
        fetAllClinic()
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

    const fetAllSpecialty = async () => {
        let res = await getAllSpecialty()
        if (res.errCode === 0) {
            let dataSelectSpecialy = buidDataSelectSpecialty(res.data)
            setListSpecialty(dataSelectSpecialy)
        }
    }

    const fetAllClinic = async () => {
        let res = await fetchAllClinic()
        if (res.errCode === 0) {
            let dataSelectClinic = buidDataSelectSpecialty(res.data)
            setListClinic(dataSelectClinic)
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

    return (
        <div className='manage-doctor-container'>

            <div className='manage-doctor-title'>
                Thông tin bác sĩ
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



                <div className='col-4 form-group'>
                    <label>Chọn phòng khám</label>
                    <Select
                        placeholder='Chọn phòng khám'
                        className='select'
                        onChange={handleChangeSelectClinic}
                        options={listClinic}
                        value={selectedClinic}
                        name='listClinic'
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