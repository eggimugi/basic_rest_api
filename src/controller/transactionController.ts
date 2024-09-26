import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "minimal" });
type transaction_detail = {
  medicine_id: number;
  qty: number;
};
const createTransaction = async (req: Request, res: Response) => {
  try {
    // read a request data \\
    const cashier_name: string = req.body.cashier_name;
    const order_date: Date = new Date(req.body.order_date);
    const transaction_detail: transaction_detail[] = req.body.transaction_detail;

    //checking medicine\\
    const arrMedicineId: number[] = transaction_detail.map((item) => item.medicine_id);

    //checking database\\
    const findMedicine = await prisma.medicine.findMany({
      where: {
        id: {
          in: arrMedicineId,
        },
      },
    });
    //check id obatt yang gada\\
    const notFoundMedicine = arrMedicineId.filter((item) => !findMedicine.map((obat) => obat.id).includes(item));

    if (notFoundMedicine.length > 0) {
      return res.status(200).json({ message: `There are no medicine` });
    }

    // save transctation\\
    const newTransaction = await prisma.transaction.create({
      data: {
        cashier_name,
        order_date,
      },
    });
    // prepare data for transctation\\
    let newDetail = [];
    for (let index = 0; index < transaction_detail.length; index++) {
      const { medicine_id, qty } = transaction_detail[index];
      // find price at each other \\
      const medicineItems = findMedicine.find((item) => item.id === medicine_id);
      //\\
      newDetail.push({
        transaction_id: newTransaction.id,
        medicine_id,
        qty,
        price: medicineItems?.price || 0,
      });
    }

    // save transctation detail\\
    await prisma.transaction_detail.createMany({
      data: newDetail,
    });

    return res.status(200).json({ message: "New transaction has been created" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { createTransaction };
