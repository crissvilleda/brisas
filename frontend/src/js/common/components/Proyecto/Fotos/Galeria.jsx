import React from 'react';
import Uploader from '../../Utils/FileUploader/FileUploader';
import LoadMask from '../../Utils/LoadMask/LoadMask';
import { Modal } from 'react-responsive-modal';
import './galeria.css';

export default function Galeria(props) {
    const [imagen, setImagen] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const { id } = props.match.params;

    React.useEffect(() => {
        if (id) props.leer(id);
    }, []);

    return (
        <React.Fragment>
            <LoadMask loading={props.loader} blur>
                <br />
                <br />
                <button onClick={() => setOpen(true)}>Nueva Imagen</button>
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
