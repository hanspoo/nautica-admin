import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import multer, { File as MulterFile } from 'multer';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { cloneBoat, deleteBoat, getBoatById } from './services/boatService';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static(process.env.IMAGES_DIR || '/static-images'));

const target = process.env.UPLOAD_FOLDER || path.join(__dirname, '../uploads');
// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, target),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
app.get('/api/boats', async (req, res) => {
  const boats = await prisma.boat.findMany();
  res.json(boats);
});

app.post('/api/boats/:id/clone', async (req, res) => {
  try {
    const { id } = req.params;
    const clonedBoat = await cloneBoat(id);
    res.status(201).json(clonedBoat);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error cloning boat' });
  }
});

app.delete('/api/boats/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBoat(id);
    res.json({ message: `boat ${id} deleted` });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error deleting ' + req.params.id });
  }
});

app.get('/api/boats/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const boat = await getBoatById(id);

    if (!boat) {
      return res.status(404).json({ message: 'Boat not found' });
    }

    res.json(boat);
  } catch (error) {
    console.error('Error in GET /boats/:id:', error);
    res.status(500).json({ message: 'Server error fetching boat' });
  }
});

app.post(
  '/api/boats',
  upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'detailImages', maxCount: 6 },
  ]),
  async (req: any, res) => {
    try {
      const {
        tittle,
        value,
        duracion,
        personas,
        bedrooms,
        largo,
        info,
        marca,
        materialCasco,
        año,
        modeloMotor,
        Horas,
        Carga,
        pasajeros,
        tipoDeCombustible,
        horasDeUso,
        descripcion,
        caracteristicas,
      } = req.body;

      const imagen =
        req.files && 'imagen' in req.files
          ? `/uploads/${(req.files['imagen'] as MulterFile[])[0].filename}`
          : '';

      const detailImages =
        req.files && 'detailImages' in req.files
          ? (req.files['detailImages'] as MulterFile[]).map(
              (f) => `/uploads/${f.filename}`
            )
          : [];

      const boat = await prisma.boat.create({
        data: {
          imagen,
          detailImg1: detailImages[0] || null,
          detailImg2: detailImages[1] || null,
          detailImg3: detailImages[2] || null,
          detailImg4: detailImages[3] || null,
          detailImg5: detailImages[4] || null,
          detailImg6: detailImages[5] || null,
          tittle,
          value,
          duracion,
          personas,
          bedrooms,
          largo,
          info,
          marca,
          materialCasco,
          año,
          modeloMotor,
          Horas,
          Carga,
          pasajeros,
          tipoDeCombustible,
          horasDeUso,
          descripcion,
          caracteristicas: JSON.parse(caracteristicas),
        },
      });

      res.json(boat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create boat' });
    }
  }
);

app.put(
  '/api/boats/:id',
  upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'detailImages', maxCount: 6 },
  ]),
  async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const {
        tittle,
        value,
        duracion,
        personas,
        bedrooms,
        largo,
        info,
        marca,
        materialCasco,
        año,
        modeloMotor,
        Horas,
        Carga,
        pasajeros,
        tipoDeCombustible,
        horasDeUso,
        descripcion,
        caracteristicas,
      } = req.body;

      // Prepare images
      const imagen =
        req.files && 'imagen' in req.files
          ? `/uploads/${(req.files['imagen'] as MulterFile[])[0].filename}`
          : undefined;

      const detailImages =
        req.files && 'detailImages' in req.files
          ? (req.files['detailImages'] as MulterFile[]).map(
              (f) => `/uploads/${f.filename}`
            )
          : [];

      // Update boat
      const updatedBoat = await prisma.boat.update({
        where: { id },
        data: {
          tittle,
          value,
          duracion,
          personas,
          bedrooms,
          largo,
          info,
          marca,
          materialCasco,
          año,
          modeloMotor,
          Horas,
          Carga,
          pasajeros,
          tipoDeCombustible,
          horasDeUso,
          descripcion,
          caracteristicas: JSON.parse(caracteristicas),
          ...(imagen && { imagen }),
          ...(detailImages[0] && { detailImg1: detailImages[0] }),
          ...(detailImages[1] && { detailImg2: detailImages[1] }),
          ...(detailImages[2] && { detailImg3: detailImages[2] }),
          ...(detailImages[3] && { detailImg4: detailImages[3] }),
          ...(detailImages[4] && { detailImg5: detailImages[4] }),
          ...(detailImages[5] && { detailImg6: detailImages[5] }),
        },
      });

      res.json(updatedBoat);
    } catch (error) {
      console.error('Error updating boat:', error);
      res.status(500).json({ error: 'Failed to update boat' });
    }
  }
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
