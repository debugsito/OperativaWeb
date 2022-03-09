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

      if (key == "gender" || key == "education" || key == "rubro" || key == "experience" || key == "extra") {
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
      else if (key == "age" || key == "salaryExpectations") {
        Object.keys(options).forEach((item) => {
          const element = options[item]
          if (element) {
            queryParamsTemp[queryParam] = `${queryParamsTemp[queryParam] ? queryParamsTemp[queryParam] + "," : ""}${element}`
          }
        })
      }

      else if (key == "residence") {
        options.forEach(item => {
          queryParamsTemp.district_id = `${queryParamsTemp.district_id ? queryParamsTemp.district_id + "," : ""}${item.district_id}`
          queryParamsTemp.province_id = `${queryParamsTemp.province_id ? queryParamsTemp.province_id   + "," : ""}${item.province_id}`
          queryParamsTemp.department_id = `${queryParamsTemp.department_id ? queryParamsTemp.department_id + "," : ""}${item.department_id}`
        })
      }


    })
    console.log("queryParamsTemp", queryParamsTemp)
    return queryParamsTemp
  }