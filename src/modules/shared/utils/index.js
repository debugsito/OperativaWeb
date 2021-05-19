
export const getRubroById = (array, rubro_id) => {
    if (rubro_id === "") {
        return ""
    } else {
        const rubro = array.filter(item => item.id === rubro_id)
        return rubro[0]?.name
    }
}