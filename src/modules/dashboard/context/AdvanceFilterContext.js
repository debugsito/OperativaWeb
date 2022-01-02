import React, { createContext, useState } from "react";

export const defaultValues = {
  residence: {
    label: "Lugar de residencia",
    active: false,
    locations: [],
  },
  transport: {
    label: "Transporte",
    active: false,
    has_transport: "",
  },
  experience: {
    label: "Experiencia",
    active: false,
    answers: {
      with_experience_one: "",
      with_experience_two: "",
      with_experience_three: "",
      with_experience_four: "",
      whitout_experience_one: "",
      whitout_experience_two: "",
      whitout_experience_three: "",
      whitout_experience_four: "",
      whitout_experience_five: "",
    },
  },
  rubro: {
    label: "Rubro de interés",
    active: false,
    answers: {
      rubro_production: "",
      rubro_maintenance: "",
      rubro_call_center: "",
      rubro_motorizados: "",
      rubro_construction: "",
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
    answers: {
      whitout_education: "",
      education_primary_incomplete: "",
      education_primary_complete: "",
      education_secondary_incomplete: "",
      education_secondary_complete: "",
      education_tecnic_incomplete: "",
      education_tecnic_complete: "",
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
    answers: {
      male: "",
      female: "",
      other: "",
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
  const resetItem = (index) => {
    const newValues = { ...values };
    newValues[index] = defaultValues[index];
    setValues(newValues);
  };
  return (
    <Context.Provider
      value={{
        values,
        setValues,
        resetItem,
      }}
    >
      {children}
    </Context.Provider>
  );
}
