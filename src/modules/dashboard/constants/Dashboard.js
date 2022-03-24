export const POSTULANTS = {
    rejected: 0,
    current: 1,
    inProgress: 2,
    hired: 3,
}

export const QUESTION_TYPE = {
    open:1,
    closed:2,
    multiple:3
}

export const FIELD_TYPE = {
    text:1,
    radiobutton:2,
    checkbox:3
}

export const FORM_TYPE = {
    evaluation:1,
    question_aditional:2,
}

export const MEET_TYPE = {
    virtual:"1",
    presencial:"2",
}

export const MESSAGE_STATUS = {
    idle:{status:"idle",cod:"00"},
    sending:{status:"sending",cod:"01"},
    success:{status:"success",cod:"02"},
    error:{status:"error",cod:"03"},
}

export const DEFAULT_VALUES_MESSAGE = {
    subject: "Gracias por postular",
    body: `Hola Postulante,
 
Nuestro departamento de Recursos Humanos te agradece  por habernos permitido contar con tu participación en el proceso de selección, estamos conscientes del valioso espacio de tiempo que nos has brindado para poder conocerte y comprender tus intereses y aspiraciones. Lamentablemente en esta oportunidad no podrás ser considerada para la siguiente etapa.
    
Te agradecemos por haber participado en el proceso, deseándote muchos éxitos en el desarrollo de tus actividades.
     
Saludos,
    
La empresa`,
};

export const ROWS_PER_PAGE = 10

export const FILTER_BY = {
    residence: "",
    transport: "easy_to_take_transport",
    experience: "experience",
    rubro: "interest_rubro_id",
    labor:{
        workedAsOperator: "worked_as_an_operator",
        quitHisJob: "quit_because_dont_like",
        hasUnionSindicate: "was_part_of_a_union",
    },
    economy:{
        ownHome: "rented_or_own_house",
        receivedBonus: "received_extra_bonus",
        financialAssistanceAtHome: "financial_help_at_home",
    },
    salary: "salary",
    education: "level_id",
    age: "edad",
    gender: "gender",
    questionAditional: {
        rotating_schedule: "rotating_schedule",
        work_weekend: "work_weekend",
        work_strange_hours: "work_strange_hours"

    },
    family: {
        hasChildren: "have_children",
        hasResponsabilityPerson: "person_under_care",
        liveAlone: "live_alone",
    },
    health: {
        hasAllergies: "have_allergy",
        hasOperation: "have_any_operation",
        hasProblemOfColumn: "spinal_problems",
        hasDiabetes: "diabetes",
        useGlasses: "wear_glasses",
        hadCovid: "had_covid",
    },
    personalQuestion: {
        says_your_opinion: "says_your_opinion",
        person_in_charge: "person_in_charge",
        motivates_working_as_operator: "motivates_working_as_operator",
        change_your_mind: "change_your_mind",
        problems_with_your_bosses: "problems_with_your_bosses",
        teamwork: "teamwork",
    },
}