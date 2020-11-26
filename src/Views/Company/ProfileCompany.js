import React, {useState, useEffect} from 'react';
import NavBar from '../../Components/MenuUser/index';
import { Link, withRouter } from 'react-router-dom';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useForm } from 'react-hook-form';
import { onlyNumbers } from './../../utils/validation';
import UtilService from '../../services/util.service';

registerLocale('es', es);

const ProfileCompany = (props) => {
  const { handleSubmit, register, errors, formState } = useForm();
  const { isSubmitted } = formState;
  const [ rubro, setRubro] = useState([]);

  const onSubmit = (values) => {
    console.log("AAAAAAAAA");
  };
  
  useEffect(() => {
      async function listRubro(){
      const responseRubro = await UtilService.listRubro();
      setRubro(responseRubro.areas);
  }
  listRubro();
  }, [])


  return (
    <>
    <NavBar />
    <div className="row justify-content-center padding-container row-no-magin">
        <div className="col-12 col-sm-8 col-md-6 container-no-padding">
          <h1 className="h1-custom-restore">Solicitud de nuevo usuario</h1>
          <label>Llena los siguientes campos para ser parte de Operativa</label>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <label htmlFor="name" className="label-form mt-1">
              Nombre
              <input
                placeholder="Ejemplo: Pedro Luis"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.name
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="name"
                type="text"
                autoComplete="off"
                ref={register({
                  required: { value: true, message: 'Este campo es requerido' }
                })}
              />
              <span className="span-error mt-1">
                {errors.name && errors.name.message}
              </span>
            </label>
            <label htmlFor="last_name" className="label-form mt-1">
              Apellido
              <input
                placeholder="Ejemplo: Castillo Lopez"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.last_name
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="last_name"
                type="text"
                autoComplete="off"
                ref={register({
                  required: { value: true, message: 'Este campo es requerido' }
                })}
              />
              <span className="span-error mt-1">
                {errors.last_name && errors.last_name.message}
              </span>
            </label>
            <label htmlFor="business_name" className="label-form mt-1">
              Razon Social
              <input
                placeholder="Ejemplo: Operativa"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.business_name
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="business_name"
                type="text"
                autoComplete="off"
                ref={register({
                  required: { value: true, message: 'Este campo es requerido' }
                })}
              />
              <span className="span-error mt-1">
                {errors.business_name && errors.business_name.message}
              </span>
            </label>
            <label htmlFor="ruc" className="label-form mt-1">
              RUC
              <input
                placeholder="Ejemplo: 201458745856"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.ruc
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="ruc"
                type="text"
                autoComplete="off"
                ref={register({
                  required: { value: true, message: 'Este campo es requerido' }
                })}
              />
              <span className="span-error mt-1">
                {errors.ruc && errors.ruc.message}
              </span>
            </label>
            <label className="label-form">
              Correo Electrónico
              <input
                placeholder="mail@ejemplo.com"
                className={`form-control placeholder
                                    ${
                                      isSubmitted
                                        ? !errors.usuario
                                          ? 'input-icono'
                                          : 'border-error red-input input-icoerror'
                                        : ''
                                    }
                                `}
                name="usuario"
                type="text"
                autoComplete="off"
                ref={register({
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Coloque un email valido'
                  }
                })}
              />
            </label>
            <label htmlFor="phone" className="label-form mt-1">
              Teléfono
              <input
                  placeholder="Ejemplo: 958478595"
                  className={`form-control placeholder mb-2
                      ${
                          isSubmitted ? 
                          !errors.phone ?
                          "input-icono"
                          : 
                          "border-error red-input input-icoerror"       
                          : ''
                      }
                  `}
                  name='phone'
                  type="text"
                  maxLength="9"
                  autoComplete="off"
                  onKeyPress={e =>{onlyNumbers(e)}} 
                  ref={register({
                      required: "Este campo es requerido",
                          maxLength : {
                              value: 9,
                              message: 'Coloque un número telefónico válido' 
                          },
                          minLength: {
                              value: 9,
                              message: 'Coloque un número telefónico válido' 
                          }
                  })} 
              />
              <span className="span-error">
                  { errors.phone && errors.phone.message}
              </span> 
            </label>
            <label htmlFor="cargo" className="label-form mt-1">        
              Rubro
                <select 
                    className={`form-control placeholder mb-2
                        ${
                            isSubmitted ? 
                            !errors.cargo ?
                            "input-icono"
                            : 
                            "border-error red-input input-icoerror"       
                            : ''
                        }
                    `} 
                    name="cargo" 
                    ref={register({
                        required: "Este campo es requerido", message: "Coloque un Nombre valido"
                        })}>
                    <option value="">Seleccione</option>
                    {rubro.map( e =>(
                        <option key={e.id} value={e.id}>{e.name}</option>
                        )
                    )}	
                </select>
                <span className="span-error mt-1">
                    { errors.cargo && errors.cargo.message}
                </span>
            </label>
            <label className="">
              <input
                className="terms-checkbox "
                name="terms"
                type="checkbox"
                ref={register({
                  required: 'Debe aceptar los términos y condiciones'
                })}
              />
              <span className="info-form-term">
                Acepto los{' '}
                
                <button type="button" className="terminos">
                  términos y condiciones
                </button>
              </span>
            </label>
            <span className="span-error">{errors.terms && errors.terms.message}</span>

            <section className="container-buttons-continue">
              <Link className="btn-cancel-pr btn" to="/registro">
                CANCELAR
              </Link>
              <button className="button-continue-restore btn" type="submit">
                <span className="text-button-continue-restore">CONTINUAR</span>
                <span className="icon-next"></span>
              </button>
            </section>
          </form>
        </div>
      </div>

    </>
  );
};

export default withRouter(ProfileCompany);
