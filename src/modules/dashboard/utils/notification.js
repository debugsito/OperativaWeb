export function messageSuccessful(text=""){
    return{
      open:true,
      severity:"success",
      message:`Se guardo correctamente los datos. ${text}`
    }
}

export function messageError(text=""){
    return{
      open:true,
      severity:"error",
      message:`Ocurrio un error al guardar, inténtalo mas tarde. ${text}`
    }
}