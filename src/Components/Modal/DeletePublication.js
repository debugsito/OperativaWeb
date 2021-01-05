import React, {useEffect } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { useForm } from 'react-hook-form'
import CompanyService from '../../services/company.service'
import { MensajeError } from './../../utils/toast'
import { MensajeExito } from './../../utils/toast'

const DeletePublication = ({ open, setOpen, publication, onModalClose,edit }) => {

  const {handleSubmit: handleSubmitDelete} = useForm()

  // Eliminar
  const onSubmitDelete = () => {
    deletePublication(publication.id)
  }

  async function deletePublication(id){
    try{
      const responsePublication = await CompanyService.deletePublication(id);
      if(responsePublication.status === 200){
          MensajeExito(responsePublication.data.message)
          onModalClose(true)
          setOpen(false)
        }
    }catch(error){
        MensajeError("Error: " + error.response.data.message);
    }
  }

  const onClose = () => {
    setOpen(false)
    onModalClose(false)
  }

  useEffect(() => {
    console.log(publication.id);
  }, [publication])


  return (
    <Modal className='modal-solicitud' isOpen={open}>
        <ModalBody>
          <form
            onSubmit={handleSubmitDelete(onSubmitDelete)}
            className='form-container'
          >
            <div className='row ml-3  mt-1 mb-1'>
              <label className='title-modal'>¿Eliminar para todos?</label>
            </div>
            <div className='row ml-3'>
              <label className='title-modal'>
                Se eliminará definitivamente la publicación de Motorizados de la plataforma.
              </label>
            </div>
            <div className='row justify-content-center mt-3'>
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

export default DeletePublication