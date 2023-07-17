require(`dotenv`).config();
const express = require(`express`);
const cors = require(`cors`);
const usersRouter = require(`./routers/usersRouter`);
const ordersRouter = require(`./routers/ordersRouter`);
const booksRouter = require(`./routers/booksRouter`);
const reviewsRouter = require(`./routers/reviewsRouter`);
const authorsRouter = require(`./routers/authorsRouter`);
const PORT = process.env.POST || 5000;
const errorHandler = require("./middleware/ErrorHaddingMiddleware");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(`/api/users`, usersRouter);
app.use(`/api/orders`, ordersRouter);
app.use(`/api/books`, booksRouter);
app.use(`/api/reviews`, reviewsRouter);
app.use(`/api/authors`, authorsRouter);
app.use("/images", express.static(path.join(__dirname, "..", "storage")));
//app.use(`/api/UsersService`, UsersService);
app.listen(PORT, () => {
  console.log(`server started on post ${PORT}`);
});

// Обработка ошибок, последний Middleware
app.use(errorHandler);
