import React from 'react';
import { api } from 'api';
import './dashboard.css';
import {
    RenderCurrency,
    RenderNumber,
} from '../Utils/renderField/renderReadField';

export default function Dashboard() {
    const [proyectos, setProyectos] = React.useState([]);
    const [servicios, setServicios] = React.useState([]);

    React.useEffect(() => {
        api.get('/dashboard/data_general').then((response) => {
            if (response && response.proyectos) {
                setProyectos(response.proyectos);
            }
            if (response && response.servicios) {
                setServicios(response.servicios);
            }
        });
    }, []);

    console.log(proyectos);

    return (
        <React.Fragment>
            <div className="d-flex justify-content-center py-4">
                <h1 className="m-0" style={{ fontSize: '2.5rem' }}>
                    Sistema las Brisas
                </h1>
            </div>
            <div className="d-flex flex-column">
                <h3 className="m-0  text-dark" style={{ fontSize: '1.5rem' }}>
                    Datos de Servicios
                </h3>
                <hr
                    className="bg-white m-0"
                    style={{ height: '0.3rem', borderRadius: '0.25rem' }}
                />
                <br />
                <div className="d-flex">
                    {servicios.map((servicio) => (
                        <div className="d-flex flex-column flex-1  m-3">
                            <h4 className="pl-3 mb-2">{servicio.tipo}</h4>
                            <div className="card card-small p-3">
                                <h3 style={{ fontSize: '1rem' }}>
                                    Usuarios Insolventes:{' '}
                                    <RenderNumber
                                        value={servicio.insolventes}
                                    />
                                </h3>
                                <h3 style={{ fontSize: '1rem' }}>
                                    Usuarios Solventes:{' '}
                                    <RenderNumber value={servicio.solventes} />
                                </h3>
                                <h3 style={{ fontSize: '1rem' }}>
                                    Total Usuarios:{' '}
                                    <RenderNumber
                                        value={
                                            servicio.solventes +
                                            servicio.insolventes
                                        }
                                    />
                                </h3>
                                <h3 style={{ fontSize: '1rem' }}>
                                    Ingresos Totales:{' '}
                                    <RenderCurrency
                                        value={servicio.total_ingresos}
                                    />
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <div className="d-flex flex-column">
                <h3 className="m-0  text-dark" style={{ fontSize: '1.5rem' }}>
                    Datos de Proyectos
                </h3>
                <hr
                    className="bg-white m-0"
                    style={{ height: '0.3rem', borderRadius: '0.25rem' }}
                />
                <br />
                <div className="d-flex">
                    {proyectos.map((proyecto) => (
                        <div className="d-flex flex-column flex-1 m-3">
                            <h4 className="pl-3 mb-2">{proyecto.tipo}</h4>
                            <div className="card card-small p-3">
                                <h3 style={{ fontSize: '1rem' }}>
                                    Proyectos realizados:{' '}
                                    <RenderNumber
                                        value={proyecto.total_proyectos}
                                    />
                                </h3>
                                <h3 style={{ fontSize: '1rem' }}>
                                    Total Ingresos:{' '}
                                    <RenderCurrency
                                        value={proyecto.total_ingresos}
                                    />
                                </h3>
                                <h3 style={{ fontSize: '1rem' }}>
                                    Total Egresas:{' '}
                                    <RenderCurrency
                                        value={proyecto.total_egresos}
                                    />
                                </h3>
                                <h3 style={{ fontSize: '1rem' }}>
                                    En caja:{' '}
                                    <RenderCurrency
                                        value={
                                            proyecto.total_ingresos -
                                            proyecto.total_egresos
                                        }
                                    />
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}
