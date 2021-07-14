import { MESES } from './constants';
export const getMes = (mes) => {
    const NombreMes = MESES.find((item) => item.value === parseInt(mes));
    if (NombreMes !== undefined) return NombreMes.label;
};
