function FormtaDataSalvar(data: string){
        const d = data.split('/')
        const dateFormat = `${d[2]}-${d[1]}-${d[0]}`
        return dateFormat
}


export default FormtaDataSalvar