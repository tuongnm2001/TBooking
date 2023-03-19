import MarkdownIt from 'markdown-it';
import './ManageDoctor.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useState } from 'react';

import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];



const ManageDoctor = () => {

    const [contentMarkDown, setContentMarkDown] = useState('')
    const [contentHTML, setContentHTML] = useState('')
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [selectedDoctor, setselectedDoctor] = useState(null)
    const [description, setDescription] = useState('')

    const handleEditorChange = ({ html, text }) => {
        setContentMarkDown(text)
        setContentHTML(html)
        console.log('handleEditorChange', html, text);
    }

    const handleSaveContentMarkDown = () => {
        console.log(selectedDoctor);
    }

    const handleChange = (selectedDoctor) => {
        setselectedDoctor(selectedDoctor)
    };

    const handleOnChangeDescription = (event) => {
        setDescription(event.target.value)
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
                        value={selectedDoctor}
                        onChange={handleChange}
                        options={options}
                    />
                </div>

                <div className='content-right form-group'>
                    <label>Thông tin giới thiệu</label>
                    <textarea
                        className='form-control'
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