import Express from "express";
import MedicineRoute from "./router/medicineRouter";

const app = Express();
// allow to read a body request with JSON format

app.use(Express.json());

// prefix for medicine route
app.use(`/medicine`, MedicineRoute);

const PORT = 1992;
app.listen(PORT, () => {
  console.log(`Server Drugstore run on port ${PORT}`);
});
