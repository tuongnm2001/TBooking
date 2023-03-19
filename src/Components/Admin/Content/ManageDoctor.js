import MarkdownIt from 'markdown-it';
import './ManageDoctor.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllDoctors, saveDetailDoctor } from '../../../service/userService';
import { toast } from 'react-toastify';

const ManageDoctor = () => {

    const [contentMarkDown, setContentMarkDown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [selectedDoctor, setselectedDoctor] = useState(null)
    const [description, setDescription] = useState('')
    const [allDoctors, setAllDoctors] = useState({})


    const handleEditorChange = ({ html, text }) => {
        setContentMarkDown(text)
        setContentHTML(html)
        console.log('handleEditorChange', html, text);
    }

    const handleSaveContentMarkDown = async () => {
        let res = await saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkDown,
            description: description,
            doctorId: selectedDoctor.value
        })

        if (res.errCode === 0) {
            toast.success(res.errMessage)
        } else {
            toast.success(res.errMessage)
        }

        console.log(selectedDoctor);
    }

    const handleChange = (selectedDoctor) => {
        setselectedDoctor(selectedDoctor)
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
                        onChange={handleChange}
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
                />
            </div>

            <div className='btnSave'>
                <button
                    className='btn btn-primary '
                    onClick={() => handleSaveContentMarkDown()}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default ManageDoctor;