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
            birth_date: DateTime.fromISO(data?.user?.birth_date).toUTC().toFormat("yyyy-LL-dd"),
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
                speciality_id: data_temp?.speciality_id,
                otherSpeciality: data_temp?.speciality_id === 28 ? data_temp.field_other : null, //28 === OTHERS
            }
        }
    },
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
    },
    questionnaireData(data) {
        return {
            have_children : data?.user?.have_children!=null ? data?.user?.have_children +"" : null,
            support_child_care : data?.user?.support_child_care!=null ? data?.user?.support_child_care+"" :null,
            person_under_care : data?.user?.person_under_care!=null ? data?.user?.person_under_care +"" :null,
            person_under_care_text : data?.user?.person_under_care_text!=null ? data?.user?.person_under_care_text : '',
            live_alone : data?.user?.live_alone!=null ? data?.user?.live_alone +"": null,
            rented_or_own_house : data?.user?.rented_or_own_house!=null ? data?.user?.rented_or_own_house+"" : null,
            received_extra_bonus : data?.user?.received_extra_bonus!=null ? data?.user?.received_extra_bonus +"": null,
            financial_help_at_home : data?.user?.financial_help_at_home!=null ? data?.user?.financial_help_at_home +"" : null,
            easy_to_take_transport : data?.user?.easy_to_take_transport!=null ? data?.user?.easy_to_take_transport +"" : null,
            worked_as_an_operator : data?.user?.worked_as_an_operator!=null ? data?.user?.worked_as_an_operator +"" : null,
            quit_because_dont_like : data?.user?.quit_because_dont_like!=null ? data?.user?.quit_because_dont_like +"" : null,
            was_part_of_a_union : data?.user?.was_part_of_a_union!=null ? data?.user?.was_part_of_a_union+"" : null,
            have_allergy : data?.user?.have_allergy!=null ? data?.user?.have_allergy+"" : null,
            have_any_operation : data?.user?.have_any_operation!=null ? data?.user?.have_any_operation+"" : null,
            have_any_operation_text : data?.user?.have_any_operation_text!=null ? data?.user?.have_any_operation_text+"" : null,
            spinal_problems : data?.user?.spinal_problems!=null ? data?.user?.spinal_problems+"" : null,
            diabetes : data?.user?.diabetes!=null ? data?.user?.diabetes+"" : null,
            wear_glasses : data?.user?.wear_glasses!=null ? data?.user?.wear_glasses+"": null,
            had_covid : data?.user?.had_covid!=null ? data?.user?.had_covid+"" : null,
            covid_time : data?.user?.covid_time!=null ? data?.user?.covid_time+"" : null,
            says_your_opinion : data?.user?.says_your_opinion!=null ? data?.user?.says_your_opinion+"" : null,
            person_in_charge : data?.user?.person_in_charge!=null ? data?.user?.person_in_charge+"" : null,
            motivates_working_as_operator : data?.user?.motivates_working_as_operator!=null ? data?.user?.motivates_working_as_operator+"" : null,
            change_your_mind : data?.user?.change_your_mind!=null ? data?.user?.change_your_mind +"": null,
            problems_with_your_bosses : data?.user?.problems_with_your_bosses!=null ? data?.user?.problems_with_your_bosses+"" : null,
            teamwork : data?.user?.teamwork!=null ? data?.user?.teamwork +"" : null,
        }
    }
}