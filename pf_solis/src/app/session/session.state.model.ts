import { UsuarioItem } from "./usuario-item";

export interface SessionState {
    sinUsuarioActual: boolean;
    usuarioActual: UsuarioItem;
}