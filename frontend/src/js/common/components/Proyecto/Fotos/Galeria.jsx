import React from 'react';
import Uploader from '../../Utils/FileUploader/FileUploader';
import LoadMask from '../../Utils/LoadMask/LoadMask';
import Foto from './Foto';
import { Modal } from 'react-responsive-modal';

import './galeria.css';

export default function Galeria(props) {
    const [imagen, setImagen] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const { id } = props.match.params;

    React.useEffect(() => {
        if (id) {
            async function loadFotos() {
                await props.leer(id);
                await props.obtenerFotos(id);
            }
            loadFotos().then();
        } else {
            props.history.push('/404');
        }
    }, []);
    const { fotos, item } = props;

    console.log(item);
    return (
        <React.Fragment>
            <LoadMask loading={props.loader} blur>
                <div className="m-0 pt-4 ">
                    <h2 className="m-0" style={{ fontSize: '1.5rem' }}>
                        <span>Nombre Proyecto:</span> {item.nombre}
                    </h2>
                </div>
                <hr
                    className="bg-white m-0"
                    style={{ height: '0.3rem', borderRadius: '0.25rem' }}
                />
                <br />
                <div>
                    <button
                        className="btn btn-primary "
                        onClick={() => setOpen(true)}
                    >
                        <h6 className="m-0">Nueva Imagen</h6>
                    </button>
                </div>
                <div className="contenedor-galeria">
                    {fotos.map((foto) => (
                        <Foto key={foto.id} foto={foto} />
                    ))}
                </div>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    showCloseIcon={false}
                    closeOnOverlayClick={false}
                    center
                >
                    <div style={{ width: '30rem' }}>
                        <h2>Subir nueva imagen</h2>
                        <Uploader
                            onFileChange={(file) => {
                                setImagen(file);
                            }}
                        />
                        <br />
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-secondary mr-2"
                                onClick={() => {
                                    setOpen(false);
                                    setImagen(undefined);
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                className="btn btn-primary ml-2"
                                disabled={!imagen}
                                onClick={() => {
                                    props.guardarImagen(id, imagen).then(() => {
                                        setImagen(undefined);
                                        setOpen(false);
                                        props.obtenerFotos(id);
                                    });
                                }}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </Modal>
            </LoadMask>
        </React.Fragment>
    );
}
