import React from 'react';
import Lightbox from 'react-image-lightbox';
import { URL_MEDIA_FILES } from '../../../../utility/constants';

export default function Foto(props) {
    const [lightbox, setLightbox] = React.useState(false);

    const { foto } = props;
    return (
        <React.Fragment>
            <div key={foto.id} className="foto">
                <img
                    src={URL_MEDIA_FILES + foto.foto}
                    onClick={() => setLightbox(true)}
                />
                {lightbox && (
                    <Lightbox
                        mainSrc={URL_MEDIA_FILES + foto.foto}
                        onCloseRequest={() => setLightbox(false)}
                    />
                )}
            </div>
        </React.Fragment>
    );
}
