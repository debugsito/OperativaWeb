import { DateTime } from "luxon";

const EDUCATION_DATA = {
    level_id: "",
    name_inst: "",
    from_year: "",
    endYear: "",
    speciality_id: "",
    otherSpeciality: null,
}

const WORKING_DATA = [{
    company: "",
    district: { id: "", name: "" },
    rubro_id: "",
    position: "",
    startDate: "",
    finishDate: "",
    weeklyHours: "",
    monthlyIncome: "",
    hasExtraHours: "",
    commitmentDegree: "",
    workingRelationship: "",
    withdrawalReason: "",
}]

const USER = {
    WITHOUT_EXPERIENCE: 0,
    WITH_EXPERIENCE: 1,
    EXPERIENCE_NOT_COMPLETED: null,

}

//data es el objeto de respuesta
export const normalize = {
    personalData(data) {
        return {
            first_name: data?.user?.first_name,
            last_name: data?.user?.last_name,
            document_id: data?.user?.document_id,
            document_number: data?.user?.document_number,
            birth_date: DateTime.fromISO(data?.user?.birth_date).toFormat("yyyy/LL/dd"),
            gender: data?.user?.gender,
            provider_id: data?.user?.provider_id,
            //providerSpecification: null,//En duro
        }
    },
    contactData(data) {
        return {
            department_id: data?.user?.department_id ? data?.user?.department_id : "",
            province_id: data?.user?.province_id ? data?.user?.province_id : "",
            district_id: data?.user?.district_id ? data?.user?.district_id : "",
            address: data?.user?.address ? data?.user?.address : "",
            //reference: "Referencia en duro", //En duro
            phone: data?.user?.phone ? data?.user?.phone : "",
            civil_id: data?.user?.civil_id ? data?.user?.civil_id : "",
        }
    },
    educationData(data) {
        const data_temp = data.education[0]
        if (!data_temp) {
            return EDUCATION_DATA
        } else {
            return {
                level_id: data_temp?.level_id,
                name_inst: data_temp?.name_inst,
                from_year: data_temp?.from_year,
                endYear: "2020", // En duro
                speciality_id: data_temp?.field_id,
                otherSpeciality: data_temp?.field_id === 28 ? data_temp.field_other : null, //28 === OTHERS
            }
        }
    },
    //No estas enviando la info cuando cuando el postulante no tiene experiencia
    //Solo estas enviando la ultima expereriencia
    workExperienceData(data) {
        if (data.user.experience === USER.WITHOUT_EXPERIENCE) {
            return {
                volunteering: data?.user?.volunteering,
                rotating_schedule: data?.user?.rotating_schedule,
                extra_hours: data?.user?.extra_hours,
                work_weekend: data?.user?.work_weekend
            }
        } else if (data.user.experience === USER.WITH_EXPERIENCE) {
            return data?.job?.map((item) => ({
                id: item?.id,
                company: item?.name_inst,
                district: { id: item?.district?.id, name: item?.district?.name },
                rubro_id: parseInt(item?.rubro_id),
                position: parseInt(item?.job_level_id),
                startDate: item?.from_year,
                finishDate: item?.to_year,
                weeklyHours: parseInt(item?.hour_rate),
                monthlyIncome: item?.monthly_income,
                hasExtraHours: item?.over_time + "",
                commitmentDegree: item?.job_involvement ? item.job_involvement + "" : "5",
                workingRelationship: item?.job_sati + "",
                withdrawalReason: item?.attrition_id ? parseInt(item.attrition_id) : 2,
            }))
        } else if (data.user.experience === USER.EXPERIENCE_NOT_COMPLETED) {
            return WORKING_DATA
        }
    },
    rubroOfinterestData(data) {
        return {
            interest_rubro_id: data?.user?.interest_rubro_id ? data?.user?.interest_rubro_id : ""
        }
    }
}