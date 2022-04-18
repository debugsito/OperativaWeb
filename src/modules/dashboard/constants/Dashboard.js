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

export const DEFAULT_FILTER_VALUES = {
    residence: {
      label: "Lugar de residencia",
      active: false,
      answers: [],
    },
    transport: {
      label: "Transporte",
      active: false,
      answers: {
        has_transport: {active: false, label:"Transporte", value:"", queryParam:FILTER_BY.transport},
      }
    },
    experience: {
      label: "Experiencia",
      active: false,
      queryParam:"experience",
      answers: {
        with_experience_one: {active: false, label:"6 meses exp.", value:1},
        with_experience_two: {active: false, label:"1 año exp.", value:2},
        with_experience_three: {active: false, label:"2 años exp.", value:3},
        with_experience_four: {active: false, label:"+3 años exp", value:4},
        whitout_experience_one: {active: false, label:"Voluntariado", value:5},
        whitout_experience_two: {active: false, label:"Disp. de horarios ratativos", value:6},
        whitout_experience_three: {active: false, label:"Disp. de horas extras", value:7},
        whitout_experience_four: {active: false, label:"Disp. fin de semana", value:8},
        whitout_experience_five: {active: false, label:"Disp. para viajar", value:9 },
      },
    },
    rubro: {
      label: "Rubro de interés",
      active: false,
      queryParam:FILTER_BY.rubro,
      answers: {
        rubro_production: {active: false, label:"Rubro: Producción y Operaciones", value:1},
        rubro_maintenance: {active: false, label:"Rubro: Mantenimiento y Limpieza", value:2},
        rubro_almacen: {active: false, label:"Rubro: Almacén y Transporte", value:3},
        rubro_call_center: {active: false, label:"Rubro: Call Center y Ventas", value:4},
        rubro_construction: {active: false, label:"Rubro: Construccion y Obras", value:5},
        rubro_motorizados: {active: false, label:"Rubro: Motorizados y Courier", value:6},
      },
    },
    labor: {
      label: "Laboral",
      active: false,
      answers: {
        hasUnionSindicate: {active: false, label:"Perteneció a un Sindicato", value:"", queryParam:FILTER_BY.labor.hasUnionSindicate},
        quitHisJob: {active: false, label:"Abandono un trabajo", value:"", queryParam:FILTER_BY.labor.quitHisJob},
        workedAsOperator: {active: false, label:"Trabajo como operario", value:"", queryParam:FILTER_BY.labor.workedAsOperator},
      },
    },
    economy: {
      label: "Economía",
      active: false,
      answers: {
        financialAssistanceAtHome: {active: false, label:"Ayuda Economicamente", value:"", queryParam:FILTER_BY.economy.financialAssistanceAtHome},
        ownHome: {active: false, label:"Casa propia", value:"", queryParam:FILTER_BY.economy.ownHome},
        receivedBonus: {active: false, label:"Percibió bonificacion extra", value:"", queryParam:FILTER_BY.economy.receivedBonus},
      },
    },
    salaryExpectations: {
      label: "Expectativa salarial",
      queryParam:FILTER_BY.salary,
      active: false,
      answers:{
        from: "",
        to: "",
      }
    },
    education: {
      label: "Educación",
      active: false,
      queryParam:FILTER_BY.education,
      answers: {
        whitout_education: {active: false, label:"Sin educación", value:1},
        education_primary_incomplete: {active: false, label:"Primaria incompleta", value:2},
        education_primary_complete: {active: false, label:"Primaria completa", value:3},
        education_secondary_incomplete: {active: false, label:"Secundaria incompleta", value:4},
        education_secondary_complete: {active: false, label:"Secundaria completa", value:5},
        education_tecnic_incomplete: {active: false, label:"Técnico Sup. incompleto", value:6},
        education_tecnic_complete: {active: false, label:"Técnico Sup. completo", value:7},
      },
    },
    age: {
      label: "Edad",
      queryParam:FILTER_BY.age,
      active: false,
      answers:{
        from: "",
        to: "",
      }
    },
    gender: {
      label: "Género",
      active: false,
      queryParam:FILTER_BY.gender,
      answers: {
        male: {active: false, label:"Masculino", value:1},
        female: {active: false, label:"Femenino", value:2},
        other: {active: false, label:"Otro", value:3},
      },
    },
    extra: {//SE REPITE y no concuerda con los otros filtros checkbox
      label: "Preguntas adicionales",
      active: false,
      queryParam:"question_aditional",
      answers: {
        question_one: {active: false, label:"Viajaría al interior del pais", value:1},
        question_two: {active: false, label:"Trabajar en horarios ratativos", value:2},
        question_three: {active: false, label:"Trabajar horas extras", value:3},
        question_four: {active: false, label:"Trabajar fines de semana", value:4},
      },
    },
    family: {
      label: "Familia",
      active: false,
      answers: {
        hasChildren: {active: false, label:"Tiene hijos", value:"", queryParam:FILTER_BY.family.hasChildren},
        hasResponsabilityPerson: {active: false, label:"Tiene alguna persona bajo su responsabilidad", value:"", queryParam:FILTER_BY.family.hasResponsabilityPerson},
        liveAlone: {active: false, label:"Vive solo/a", value:"", queryParam:FILTER_BY.family.liveAlone},
      },
    },
    health: {
      label: "Salud",
      active: false,
      answers: {
        hasAllergies: {active: false, label:"Tiene alguna alergia", value:"", queryParam:FILTER_BY.health.hasAllergies},
        hasOperation: {active: false, label:"Ha tenido alguna operación", value:"", queryParam:FILTER_BY.health.hasOperation},
        hasProblemOfColumn: {active: false, label:"Tiene algun problema de columna", value:"", queryParam:FILTER_BY.health.hasProblemOfColumn},
        hasDiabetes: {active: false, label:"Sufre diabetes", value:"", queryParam:FILTER_BY.health.hasDiabetes},
        useGlasses: {active: false, label:"Usa lentes", value:"", queryParam:FILTER_BY.health.useGlasses},
        hadCovid: {active: false, label:"Ha tenido COVID", value:"", queryParam:FILTER_BY.health.hadCovid},
      },
    },
    personal: {
      label: "Personal",
      active: false,
      answers: {
        questionPersonalOne: {active: false, label:"Pregunta personal 1", value:"", queryParam:FILTER_BY.personalQuestion.says_your_opinion},
        questionPersonalTwo: {active: false, label:"Pregunta personal 2", value:"", queryParam:FILTER_BY.personalQuestion.person_in_charge},
        questionPersonalThree: {active: false, label:"Pregunta personal 3", value:"", queryParam:FILTER_BY.personalQuestion.motivates_working_as_operator},
        questionPersonalFour: {active: false, label:"Pregunta personal 4", value:"", queryParam:FILTER_BY.personalQuestion.change_your_mind},
        questionPersonalFive: {active: false, label:"Pregunta personal 5", value:"", queryParam:FILTER_BY.personalQuestion.problems_with_your_bosses},
        questionPersonalSix: {active: false, label:"Pregunta personal 6", value:"", queryParam:FILTER_BY.personalQuestion.teamwork},
      },
    },
  };