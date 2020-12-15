import React, { useState, useEffect } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { useForm } from 'react-hook-form'
import AdminService from '../../services/admin.service'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { MensajeError } from './../../utils/toast'
import { MensajeExito } from './../../utils/toast'

const DeleteSubUser = ({ open, setOpen, user, onModalClose,edit }) => {

  const {register: registerDelete, errors: errorsDelete, handleSubmit: handleSubmitDelete, formState} = useForm()
  const [see, setSee] = useState(false)
  const { isSubmitted } = formState

   const seePass = () => {
    setSee(!see)
  }

  // Eliminar
  const onSubmitDelete = (values, e) => {
    const id = user.id
    const eliminar = values.delete

    const datafield = {
      password: values.password
    }
    deleteUser(datafield, id, eliminar)
  }

  async function deleteUser(datafield, id, eliminar) {
    if (eliminar === '1') {
      try {
        const responseDeleteUser = await AdminService.deleteSubUser(datafield, id)
        if (responseDeleteUser.status === 200) {
          MensajeExito(responseDeleteUser.data.message)
          onModalClose(true)
        }
      } catch (error) {
        MensajeError('No autorizado')
      }
      setOpen(false)
    } else {
      setOpen(false)
    }
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
          <form
            onSubmit={handleSubmitDelete(onSubmitDelete)}
            className='form-container'
          >
            <div className='row justify-content-center mt-1'>
              <label className='title-modal'>¿Deseas eliminar a ?</label>
            </div>
            <label htmlFor='delete' className='label-form-modal'>
              <div className='input-container-radio justify-content-center'>
                <div className='form-check margin-right'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='delete'
                    value='1'
                    ref={registerDelete({ required: 'Seleccione una opción' })}
                  />
                  <label className='form-text-check'>Si</label>
                </div>
                <div className='form-check margin-right'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='delete'
                    value='2'
                    ref={registerDelete({ required: 'Seleccione una opción' })}
                  />
                  <label className='form-text-check'>No</label>
                </div>
              </div>
              <span className='span-error justify-content-center'>
                {errorsDelete.delete && errorsDelete.delete.message}
              </span>
            </label>
            <div className='row text-align-center'>
              <label className='title-modal'>
                Por tu seguridad, ingresa tu contraseña para continuar.
              </label>
            </div>

            <label className='label-form'>
              Contraseña
              <div className='icon-see-container'>
                {see ? (
                  <IoIosEye className='space-icon-see' onClick={seePass} />
                ) : (
                  <IoIosEyeOff className='space-icon-see' onClick={seePass} />
                )}
              </div>
              <input
                placeholder='..........'
                className={`form-control input-text ${showErrorInput(
                    errorsDelete.password
                )}`}
                name='password'
                autoComplete='off'
                type={!see ? 'password' : 'text'}
                ref={registerDelete({
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Debe contener mínimo 6 caracteres'
                  },
                  maxLength: {
                    value: 12,
                    message: 'Debe contener máximo 12 caracteres'
                  }
                })}
              />
            </label>
            <span className='span-error'>
              {errorsDelete.password && errorsDelete.password.message}
            </span>
            <div className='row justify-content-center mt-3'>
              <button
                className='btn btn-cancelar-modal' onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className='btn btn-aceptar-modal'
                type='submit'
              >
                Aceptar
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
  )
}

export default DeleteSubUser