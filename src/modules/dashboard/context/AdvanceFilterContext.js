import React, { createContext, useState } from "react";
import { FILTER_BY } from "../constants/Dashboard";

export const defaultValues = {
  residence: {
    label: "Lugar de residencia",
    active: false,
    locations: [],
  },
  transport: {
    label: "Transporte",
    queryParam:"easy_to_take_transport",
    active: false,
    has_transport: "",
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
      hasUnionSindicate: "",
      quitHisJob: "",
      workedAsOperator: "",
    },
  },
  economy: {
    label: "Economía",
    active: false,
    financialAssistanceAtHome: "",
    ownHome: "",
    receivedBonus: "",
  },
  salaryExpectations: {
    label: "Expectativa salarial",
    active: false,
    from: "",
    to: "",
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
    active: false,
    from: "",
    to: "",
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
  extra: {
    label: "Preguntas adicionales",
    active: false,
    answers: {
      question_one: "",
      question_two: "",
      question_three: "",
      question_four: "",
    },
  },
  family: {
    label: "Familia",
    active: false,
    answers: {
      hasChildren: "",
      hasResponsabilityPerson: "",
      liveAlone: "",
    },
  },
  health: {
    label: "Salud",
    active: false,
    answers: {
      hasAllergies: "",
      hasOperation: "",
      hasProblemOfColumn: "",
      hasDiabetes: "",
      useGlasses: "",
      hadCovid: "",
    },
  },
  personal: {
    label: "Personal",
    active: false,
    answers: {
      questionPersonalOne: "",
      questionPersonalTwo: "",
      questionPersonalThree: "",
      questionPersonalFour: "",
      questionPersonalFive: "",
      questionPersonalSix: "",
    },
  },
};
export const Context = createContext({});
export default function AdvanceFilterContext({ children }) {
  const [values, setValues] = useState(defaultValues);
  const [queryParams, setQueryParams] = useState({});

  const resetItem = (index) => {
    const newValues = { ...values };
    newValues[index] = defaultValues[index];
    setValues(newValues);
    updateQueryParams(newValues)
  };

  const updateQueryParams = (newValues) => {
    const newQueryParams = buildQueryParams(newValues)
    setQueryParams(newQueryParams)
  }

  const buildQueryParams = (newValues) => {
    const valueTemp = {...newValues}
    let queryParamsTemp = {};
    for (const key in valueTemp) {
      if (Object.hasOwnProperty.call(valueTemp, key)) {
        const element = valueTemp[key];
        if(element.active){
          queryParamsTemp[element.queryParam] = element.active
        }
      }
    }
    return queryParamsTemp
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
