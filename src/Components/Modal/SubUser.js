import React, {useEffect } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { onlyLetters } from '../../utils/validation'
import AdminService from '../../services/admin.service'
import { MensajeError } from './../../utils/toast'
import { MensajeExito } from './../../utils/toast'

const SubUser = ({ open, setOpen, user, onModalClose, edit, titulo }) => {

  const { handleSubmit, register, errors, formState } = useForm();
  const { isSubmitted } = formState;

  const onSubmit = (values) => {
    const flag = edit;
    const datafield = {
      email: values.mail,
      user: {
        first_name: values.first_name,
        last_name: values.last_name,
        area_input: values.area,
        cargo_input: values.cargo
      }
    }

    if(flag === 1){
        editUser(datafield, user.id)
    } else {
        createUser(datafield);
    }
  }

  async function editUser(datafield, id) {
    try {
      const responseEditUser = await AdminService.editSubUser(datafield, id)
      if (responseEditUser.status === 200) {
        MensajeExito("Se actualizo el usuario");
        onModalClose(true)
      }
    } catch (error) {
      MensajeError(error.response.data.message)
    }
    setOpen(false)
  }

  async function createUser(datafield) {
    try {
      const responseCreateUser = await AdminService.createUser(datafield)
      if (responseCreateUser.status === 200) {
        MensajeExito("Se creo un nuevo usuario")
        onModalClose(true)
      }
    } catch (error) {
      MensajeError(error.response.data.message)
    }
    setOpen(false)
  }

  const showErrorInput = (error) => {
    return isSubmitted
      ? !error
        ? 'input-icono'
        : 'border-error red-input input-icoerror'
      : ''
  }
  
  const onClose = () => {
    setOpen(false)
    onModalClose(false)
  }
  
  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <Modal className='modal-solicitud' isOpen={open}>
      <ModalBody>
        <div className='row justify-content-center mt-1 mb-2'>
          <label className='title-modal'>{titulo}</label>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
          <label htmlFor='first_name' className='label-form mt-1'>
            Nombre
            <input
              placeholder='Ejemplo: Pedro Luis'
              className={`form-control input-text ${showErrorInput(
                errors.first_name
              )}`}
              defaultValue={user.user.first_name}
              name='first_name'
              type='text'
              maxLength='25'
              onKeyPress={(e) => {
                onlyLetters(e)
              }}
              autoComplete='off'
              ref={register({
                required: { value: true, message: 'Este campo es requerido' }
              })}
            />
            <span className='span-error mt-1'>
              {errors.first_name && errors.first_name.message}
            </span>
          </label>
          <label htmlFor='last_name' className='label-form mt-1'>
            Apellidos
            <input
              defaultValue={user.user.last_name}
              placeholder='Ejemplo: Chavez Flores'
              className={`form-control input-text ${showErrorInput(
                errors.last_name
              )}`}
              name='last_name'
              type='text'
              maxLength='25'
              onKeyPress={(e) => {
                onlyLetters(e)
              }}
              autoComplete='off'
              ref={register({
                required: { value: true, message: 'Este campo es requerido' }
              })}
            />
            <span className='span-error mt-1'>
              {errors.last_name && errors.last_name.message}
            </span>
          </label>
          <label htmlFor='cargo' className='label-form mt-1'>
            Cargo
            <input
              placeholder='Ejemplo: Asistente RRHH'
              className={`form-control input-text ${showErrorInput(
                errors.cargo
              )}`}
              defaultValue={user.user.cargo_input}
              name='cargo'
              type='text'
              maxLength='20'
              onKeyPress={(e) => {
                onlyLetters(e)
              }}
              autoComplete='off'
              ref={register({
                required: { value: true, message: 'Este campo es requerido' }
              })}
            />
            <span className='span-error mt-1'>
              {errors.cargo && errors.cargo.message}
            </span>
          </label>
          <label htmlFor='area' className='label-form mt-1'>
            Área
            <input
              placeholder='Ejemplo: Recursos Humanos'
              className={`form-control input-text ${showErrorInput(
                errors.area
              )}`}
              defaultValue={user.user.area_input}
              name='area'
              type='text'
              maxLength='25'
              onKeyPress={(e) => {
                onlyLetters(e)
              }}
              autoComplete='off'
              ref={register({
                required: { value: true, message: 'Este campo es requerido' }
              })}
            />
            <span className='span-error mt-1'>
              {errors.area && errors.area.message}
            </span>
          </label>
          <label htmlFor='mail' className='label-form'>
            Correo Electrónico
            <input
              placeholder='mail@ejemplo.com'
              className={`form-control input-text ${showErrorInput(
                errors.mail
              )}`}
              defaultValue={user.email}
              name='mail'
              type='text'
              autoComplete='off'
              ref={register({
                required: 'Este campo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Coloque un email valido'
                }
              })}
            />
            <span className='span-error mt-1'>
              {errors.mail && errors.mail.message}
            </span>
          </label>
          <div className='row justify-content-center'>
            <button className='btn btn-cancelar-modal' type='button' onClick={onClose}>
              Cancelar
            </button>
            <button className='btn btn-aceptar-modal' type='submit'>
              Aceptar
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default SubUser