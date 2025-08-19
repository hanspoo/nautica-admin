export interface BoteJson {
  id: string;
  imagen: string;
  detailImg1: string;
  detailImg2: string;
  detailImg3: string;
  detailImg4: string;
  detailImg5: string;
  detailImg6: string;
  detailImg7?: string;
  tittle: string;
  value: string;
  duracion: string;
  personas: string;
  bedrooms: string;
  largo: string;
  info: string;
  marca: string;
  materialCasco: string;
  año: string;
  modeloMotor: string;
  Horas: string;
  Carga: string;
  pasajeros: string;
  tipoDeCombustible: string;
  horasDeUso: string;
  descripcion: string;
  caracteristicas: Record<string, string>;
}
