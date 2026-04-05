export interface tipoDocumentoIdentidad {
  id_tipo_documento_identidad: number;
  nombre: string;
  descripcion: string;
  n_digitos: string;
}

export interface tipoDocumentoIdentidadInsert {
  nombre: string;
  descripcion: string;
  n_digitos: string;
}

export interface tipoDocumentoIdentidadUpdate
  extends tipoDocumentoIdentidadInsert {
  id_tipo_documento_identidad: number;
}
