import axios from "../ultis/customizeAxios"

const handleLogin = (email, password) => {
    return axios.post(`/api/login`, { email, password })
}

const fetchAllCode = (type) => {
    return axios.get(`/api/allcode?type=${type}`)
}
const postCreateNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const fetchAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const handleDeleteUser = (inputId) => {
    return axios.delete(`/api/delete-user`, { data: { id: inputId } })
}

const handleUpdateUser = (inputId) => {
    return axios.put(`/api/edit-user`, inputId)
}

const getTopDoctor = (limit) => {
    return axios.get(`/api/top-doctor-home?=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookingAppoitment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-spectialty`, data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-all-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

export {
    handleLogin, fetchAllCode, postCreateNewUser, fetchAllUsers,
    handleDeleteUser, handleUpdateUser, getTopDoctor, getAllDoctors,
    saveDetailDoctor, getDetailInforDoctor, saveBulkScheduleDoctor,
    getScheduleByDate, getExtraInforDoctorById, getProfileDoctorById,
    postPatientBookingAppointment, postVerifyBookingAppoitment,
    createNewSpecialty, getAllSpecialty, getDetailSpecialtyById
}