'use client'
import axios from "axios";

const BASE_URL = 'https://test/api'

const api = axios.create({
	baseURL: BASE_URL,
})


export default api