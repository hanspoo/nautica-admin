import { initBoatsDB } from './initBoatsDB';
import { prisma } from './lib-prisma';

const bote1 = {
  id: 'bote1',
  imagen: 'imagen1.jpeg',
  detailImg1: 'imagen1.jpeg',
  detailImg2: 'imagen2.jpeg',
  detailImg3: 'imagen3.jpg',
  detailImg4: 'imagen4.jpeg',
  detailImg5: 'imagen5.jpeg',
  detailImg6: 'imagen6.jpeg',
  tittle: 'Chaparral 21 Ft ',
  value: '$43.500.000',
  duracion: 'Per Day',
  personas: '12 Guests',
  bedrooms: '0',
  largo: '21 Pies',
  info: 'Torre Wake, Doble hélice...',
  marca: 'Chaparral',
  materialCasco: 'Fibra de vidrio',
  año: '2010',
  modeloMotor: '5.0 MPI Mercrusier',
  Horas: '320 Hrs',
  Carga: '700 kg',
  pasajeros: '10',
  tipoDeCombustible: 'Bencina',
  horasDeUso: '3',
  descripcion:
    'Lancha Chaparral de 21 pies con plataforma de baño, con torre de waike, bimini original, tapiz original, pintura de caso original, 2 helices de acero,  equipo de audio con 4 parlantes, carro doble eje galvanizado, carpa original Chaparral, ',
  caracteristicas: [
    'Posee plataforma de baño',
    'Viene con equipo de audio incluido',
    'El tapiz y la pintura son originales',
    'Posee una torre para wakeboard',
  ],
};

describe('libPrisma', () => {
  it('puede grabar un bote', async () => {
    const newboat = await prisma.boat.create({
      data: bote1,
    });

    expect(newboat).toBeTruthy();
  });
  it('should work', async () => {
    const newboats = await initBoatsDB();

    expect(!!newboats && newboats.count).toEqual(9);
  });
});
