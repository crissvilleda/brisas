import React from 'react';
import Lightbox from 'react-image-lightbox';

export default function Foto(props) {
    const [lightbox, setLightbox] = React.useState(false);

    const { foto } = props;
    return (
        <React.Fragment>
            <div key={foto.id} className="foto">
                <img src={foto.foto} onClick={() => setLightbox(true)} />
                {lightbox && (
                    <Lightbox
                        mainSrc={foto.foto}
                        onCloseRequest={() => setLightbox(false)}
                    />
                )}
            </div>
        </React.Fragment>
    );
}
