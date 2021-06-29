import api from "../../../modules/shared/libs/api/images.api";
//Guardar imagen
const saveImage = async (body) => {
    console.log("body", body)
    const response = await api.post(`/images`, body);
    return response;
}

export default {
    saveImage
}