import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.SERVER_PORT;
const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.CLUSTER_ID}.mongodb.net/`;

const corsOptions = {
  origin: `http://localhost:${process.env.FRONT_PORT}` 
};
app.use(cors(corsOptions));
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

app.get('/books', async (req, res) => {
  try {
    const client = await MongoClient.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    const collection = client.db('atsiskaitymas').collection('knygos');

    // Filtrai
    const { title, genres, yearFrom, yearTo, inStock, sortBy, order, page } = req.query;
    const filters = {};

    // Pavadinimo paieška
    if (title) {
      filters.title = { $regex: title, $options: 'i' }; // case-insensitive paieška
    }

    // Žanrai
    if (genres && genres.length > 0) {
      filters.genres = { $in: genres.split(',') };
    }

    // Leidimo metai
    if (yearFrom || yearTo) {
      filters.year = {};
      if (yearFrom) filters.year.$gte = parseInt(yearFrom);
      if (yearTo) filters.year.$lte = parseInt(yearTo);
    }

    // Ar šiuo metu turime knygų sandėlyje
    if (inStock === 'true') {
      filters.copies = { $gt: 0 };
    }

    // Puslapiavimas ir rikiavimas
    const limit = 10;
    const pageNum = parseInt(page) || 1;
    const skip = (pageNum - 1) * limit;

    let sortCriteria = {};
    if (sortBy) {
      const orderValue = order === 'desc' ? -1 : 1;
      sortCriteria[sortBy] = orderValue;
    }

    // Gauname knygas
    const data = await collection.find(filters)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalBooks = await collection.countDocuments(filters);

    await client.close();

    res.send({
      totalBooks,
      books: data,
      currentPage: pageNum,
      totalPages: Math.ceil(totalBooks / limit)
    });
  } catch (error) {
    console.error("Klaida gaunant knygų sąrašą:", error);
    res.status(500).send({ error: "Klaida gaunant knygų sąrašą." });
  }
});

// Konkrečios knygos gavimas pagal ID
app.get('/books/:id', async (req, res) => {
  try {
    const client = await MongoClient.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    const bookId = new ObjectId(req.params.id);
    const data = await client.db('biblioteka').collection('knygos').findOne({ _id: bookId });

    await client.close();
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Knyga nerasta." });
    }
  } catch (error) {
    console.error("Klaida gaunant knygą:", error);
    res.status(500).send({ error: "Klaida gaunant knygos informaciją." });
  }
});


