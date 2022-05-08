const QUESTION = {
    Si: 1,
    No: 0
  }

export function buildQueryParams(data){
    const valueTemp = { ...data }
    let queryParamsTemp = {}
    Object.keys(valueTemp).forEach((key) => {
      const options = valueTemp[key]?.answers;
      const queryParam = valueTemp[key]?.queryParam

      if (key == "gender" || key == "education" || key == "rubro" || key == "experience" || key == "extra" || key=="shirt_size" || key=="pants_size" ) {
        Object.keys(options).forEach((item) => {
          const element = options[item]
          if (element.active) {
            queryParamsTemp[queryParam] = `${queryParamsTemp[queryParam] ? queryParamsTemp[queryParam] + "," : ""}${element.value}`
          }
        })
      }
      else if (key == "labor" || key == "transport" || key == "economy" || key == "personal" || key == "health" || key == "family") {
        Object.keys(options).forEach((item) => {
          const element = options[item]
          if (element.value) {
            queryParamsTemp[element.queryParam] = `${QUESTION[element.value]}`
          }
        })
      }
      else if (key == "age" || key == "salaryExpectations" || key=="shoe_size") {
        Object.keys(options).forEach((item) => {
          const element = options[item]
          if (element) {
            queryParamsTemp[queryParam] = `${queryParamsTemp[queryParam] ? queryParamsTemp[queryParam] + "," : ""}${element}`
          }
        })
      }

      else if (key == "residence") {
        options.forEach(item => {
          if(item.district_id){
            queryParamsTemp.district_id = `${queryParamsTemp.district_id ? queryParamsTemp.district_id + "," : ""}${item.district_id}`
          } 
          if(item.province_id){
            queryParamsTemp.province_id = `${queryParamsTemp.province_id ? queryParamsTemp.province_id   + "," : ""}${item.province_id}`
          } 
          if(item.department_id){
            queryParamsTemp.department_id = `${queryParamsTemp.department_id ? queryParamsTemp.department_id + "," : ""}${item.department_id}`
          } 
        })
      }


    })
    return queryParamsTemp
  }

  export function buildArrayLabels(valueTemp){
    let arrayLabel = [];

    Object.keys(valueTemp).map((key) => {
      const options = valueTemp[key]?.answers;
      if (key == "gender" || key == "education" || key == "rubro" || key == "experience" || key == "extra" || key=="shirt_size" || key=="pants_size") {
        Object.keys(options).forEach((element) => {
          if (options[element].active) {
            arrayLabel.push({ key, option: element, label: options[element].label })
          }
        })
      }else if (key == "labor" || key == "transport" || key == "economy" || key == "personal" || key == "health" || key == "family") {
        Object.keys(options).forEach((element) => {
          if (options[element].value) {
            arrayLabel.push({ key, option: element, label: `${options[element].label}: ${options[element].value}` })
          }
        })
      }else if (key == "age" || key == "salaryExpectations" || key=="shoe_size") {
        if(options.from != "" && options.to != ""){
          arrayLabel.push({ key, option: key, label: `${valueTemp[key].label}: ${options.from} - ${options.to}` })
        }
      }else if (key == "residence") {
        options.forEach(item => {
          arrayLabel.push({ key, option: item.key, label: `${item.district_id? "DISTRITO":(item.province_id? "PROVINCE": "DEPARTAMENTO")}: ${item.label}` })
        })
      }
    })
    return arrayLabel;
  }