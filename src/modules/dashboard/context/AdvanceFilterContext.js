import React, { createContext, useState } from "react";
import { FILTER_BY } from "../constants/Dashboard";
import { buildQueryParams } from "../utils/convert";

export const defaultValues = {
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
      male: {active: false, label:"Femenino", value:1},
      female: {active: false, label:"Masculino", value:2},
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
export const Context = createContext({});
export default function AdvanceFilterContext({ children }) {
  const [values, setValues] = useState(defaultValues);
  const [queryParams, setQueryParams] = useState({});

  const resetItem = (item) => {
    const newValues = { ...values };
    if (item.key == "age" || item.key == "salaryExpectations") {
      newValues[item.key] = defaultValues[item.key]
    }else if(item.key == "residence"){
      const newResidence = {...values.residence}
      const newLocation = newResidence.answers.filter(element => element.key != item.option)
      newValues[item.key].answers = [...newLocation]
    }else{
      newValues[item.key].answers[item.option] = defaultValues[item.key].answers[item.option];
    }
    setValues(newValues);
    updateQueryParams(newValues)
  };

  const updateQueryParams = (newValues) => {
    const newQueryParams = buildQueryParams(newValues)
    setQueryParams(newQueryParams)
  }

  return (
    <Context.Provider
      value={{
        values,
        setValues,
        resetItem,
        queryParams,
        setQueryParams
      }}
    >
      {children}
    </Context.Provider>
  );
}
