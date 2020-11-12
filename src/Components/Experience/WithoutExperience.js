import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";

import MultiSelect from 'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

const WithoutExperience = (props) => { 

    const {handleSubmit, register, errors,control} = useForm();

    const [value, setValue ] = useState('');

    const  handleOnchange  =  val  => {
        setValue(val);
    }

    const  options  = [
        { label:  'Option 1', value:  'option_1'  },
        { label:  'Option 2', value:  'option_2'  },
        { label:  'Option 3', value:  'option_3'  },
        { label:  'Option 4', value:  'option_4'  },
    ]

    /*
    useEffect( () => {
    async function listRubro(){
        const responseRubro = await UtilService.listRubro();
        setRubro(responseRubro.data);
    }
    listRubro();
    }, []);

    */

    const onSubmit = (values) => {

        // props.history.push('/informacion-completada-con-exito')

        const datafield = {
            id_account: 1,
            rubro: values.rubro,
            hour: values.hour,
            over_time: values.over_time,
        };

        console.log(datafield);
    } 

    return (
        <>
            <form name="myForm" onSubmit={handleSubmit(onSubmit)} className=''>
                <label htmlFor="rubro" className="label-form mt-1">
                    Rubro de interés
                    <Controller
                        control={control}
                        name="rubro"
                        defaultValue=""
                        render={(props) => (
                        <MultiSelect
                            selected={props.value}
                            width="100vr"
                            name="rubro"
                            placeholder="Seleccione"
                            onChange={handleOnchange}
                            options={options}
                        />
                    )}
                        rules={{
                            required: 'Seleccione un rubro'
                        }}
                    />
                    <span className="span-error mt-1">
                        {errors.rubro && errors.rubro.message}
                    </span>
                </label>
                <label htmlFor="hour" className="label-form mt-1">
                    ¿Posibilidad de trabajar horas extras?
                    <div className="input-container-radio mt-2">
                        <div className="form-check margin-right">
                            <input 
                                className="form-check-input"
                                type="radio" 
                                name="hour"
                                value="1"
                                ref={register({ required: "Seleccione una opción" })}
                            />
                            <label className="form-text-check">
                                Si
                            </label>
                        </div>
                        <div className="form-check margin-right">
                            <input 
                                className="form-check-input"
                                type="radio" 
                                name="hour"
                                value="0"
                                ref={register({ required: "Seleccione una opción" })}
                            />
                            <label className="form-text-check">
                                No
                            </label>
                        </div>
                    </div>
                    <span className="span-error">
                        { errors.hour && errors.hour.message}
                    </span>
                </label>
                <label htmlFor="over_time" className="label-form mt-1">
                    ¿Posibilidad de trabajar en horarios rotativos?
                    <div className= "input-container-radio mt-2">
                        <div className="form-check margin-right">
                            <input 
                                className="form-check-input"
                                type="radio" 
                                name="over_time"
                                value="1"
                                ref={register({ required: "Seleccione una opción" })}
                            />
                            <label className="form-text-check">
                                Si
                            </label>
                        </div>
                        <div className="form-check margin-right">
                            <input 
                                className="form-check-input"
                                type="radio" 
                                name="over_time"
                                value="2"
                                ref={register({ required: "Seleccione una opción" })}
                            />
                            <label className="form-text-check">
                                No
                            </label>
                        </div>
                    </div>
                    <span className="span-error">
                        { errors.over_time && errors.over_time.message}
                    </span>
                </label>
                <section  className="container-buttons-form">
                    <Link
                        className="btn-cancel-form btn" 
                        to='/inicio'
                        >
                        CANCELAR
                    </Link> 
                    <button
                        className="button-continue-restore btn"
                        type="submit"
                    >
                        <span className="text-button-continue-restore">CONTINUAR</span>
                        <span className="icon-next"></span>
                    </button>
                </section>
            </form>                
        </>
    )
}

export default withRouter(WithoutExperience)
