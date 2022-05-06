import axios from 'axios';


const api = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a53334972afcc0581bd39f4bdd6ad144'
})

export default api;