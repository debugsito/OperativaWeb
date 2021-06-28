const EDUCATION_DATA = {
    level_id: "",
    name_inst: "",
    from_year: "",
    endYear: "",
    speciality_id: "",
    otherSpeciality: null,
}

const WORKING_DATA = {
    name_inst: "",
    district_id: "",
    rubro_id: "",
    job_level_id: "",
    from_year: "",
    to_year: "",
    hour_rate: "",
    job_sati: "",
    monthly_income: "",
    over_time: "",
    job_invol: "",
    attrition: "",
}

//data es el objeto de respuesta
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
        const data_temp = data.education[0]
        if (!data_temp) {
            return EDUCATION_DATA
        } else {
            return {
                level_id: data_temp.level_id,
                name_inst: data_temp.name_inst,
                from_year: data_temp.from_year,
                endYear: "2020", // En duro
                speciality_id: 5, //En duro
                otherSpeciality: null, //En duro
            }
        }
    },
    //No estas enviando la info cuando cuando el postulante no tiene experiencia
    //Solo estas enviando la ultima expereriencia
    workExperienceData(data) {
        const data_temp = data.job
        return data_temp.map((item) => ({
            name_inst: item.name_inst,
            district_id: item.district_id,
            rubro_id: parseInt(item.rubro_id),
            job_level_id: parseInt(item.job_level_id),
            from_year: item.from_year,
            to_year: item.to_year,
            hour_rate: parseInt(item.hour_rate),
            job_sati: parseInt(item.job_sati),
            monthly_income: parseInt(item.monthly_income),
            over_time: parseInt(item.over_time),
            job_invol: parseInt(item.job_invol),
            attrition: parseInt(item.attrition),
        }))
    }
}