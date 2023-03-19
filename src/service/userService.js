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

export {
    handleLogin, fetchAllCode, postCreateNewUser, fetchAllUsers,
    handleDeleteUser, handleUpdateUser, getTopDoctor
}