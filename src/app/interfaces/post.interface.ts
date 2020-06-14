import { IUsuario } from './user.interface';
export interface IRespuestaPosts {
    ok:     boolean;
    pagina: number;
    posts:  IPost[];
}

export interface IPost {
    _id?:           string;
    coords?:        string;
    createdAt?:     string;
    imagenes?:      string[];
    mensaje?:       string;
    updatedAt?:     string;
    usuario?:       IUsuario;
}