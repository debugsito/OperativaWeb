export const normalize = {
    personalData(data) {
        return {
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            document_id: data.user.document_id,
            document_number: data.user.document_number,
            birth_date: data.user.birth_date,
            gender: data.user.gender,
            provider_id: data.user.provider_id,
            providerSpecification: null,//En duro
        }
    },
    contactData(data) {
        return {
            department_id: data.user.department_id,
            province_id: data.user.province_id,
            district_id: data.user.district_id,
            address: data.user.address,
            reference: "Referencia en duro", //En duro
            phone: data.user.phone,
            civil_id: data.user.civil_id,
        }
    },
    educationData(data) {
        return {
            level_id: data.level_id,
            name_inst: data.name_inst,
            from_year: data.from_year,
            endYear: "2020", // En duro
            speciality_id: 5, //En duro
            otherSpeciality: null, //En duro
        }
    },
}