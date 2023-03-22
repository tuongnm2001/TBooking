import MarkdownIt from 'markdown-it';
import './ManageDoctor.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllDoctors, getDetailInforDoctor, saveDetailDoctor } from '../../../service/userService';
import { toast } from 'react-toastify';

const ManageDoctor = () => {

    const [contentMarkDown, setContentMarkDown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [selectedDoctor, setselectedDoctor] = useState(null)
    const [description, setDescription] = useState('')
    const [allDoctors, setAllDoctors] = useState({})
    const [hasOldData, setHasOldData] = useState(false)
    const [loadingApi, setLoadingApi] = useState(false)

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
        setselectedDoctor(selectedDoctor)
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
                    } {hasOldData === true ? 'Update' : 'Save'}
                </button>
            </div>
        </div>
    );
}

export default ManageDoctor;