import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient({ errorFormat: "minimal" });

const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin_name: string = req.body.admin_name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const findEmail = await prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (findEmail) {
      return res.status(400).json({
        message: `Email has exists, please try another email!`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    // 12 adalah perulangan dari enkripsinya atau password akan diacak sebanyak 12x

    const newAdmin = await prisma.admin.create({
      data: {
        admin_name,
        email,
        password: hashPassword,
      },
    });
    return res.status(200).json({
      message: `New admin has been created`,
      data: newAdmin,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const readAdmin = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const allAdmin = await prisma.admin.findMany({
      where: {
        OR: [{ admin_name: { contains: search?.toString() || "" } }],
      },
    });

    return res.status(200).json({
      message: `Admin has been retrieved`,
      data: allAdmin,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findAdmin = await prisma.admin.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!findAdmin) {
      return res.status(200).json({
        message: `Admin is not found!`,
      });
    }

    const { admin_name, email, password } = req.body;

    const saveAdmin = await prisma.admin.update({
      where: {
        id: Number(id),
      },
      data: {
        admin_name: admin_name ? admin_name : findAdmin.admin_name,
        email: email ? email : findAdmin.email,
        password: password ? await bcrypt.hash(password, 12) : findAdmin.password,
      },
    });

    return res.status(200).json({
      message: `Admin has been updated`,
      data: saveAdmin,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findAdmin = await prisma.admin.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!findAdmin) {
      return res.status(200).json({
        message: `Medicine is not found`,
      });
    }

    const saveAdmin = await prisma.admin.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: `Admin has been removed`,
      data: saveAdmin,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const authentication = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findAdmin = await prisma.admin.findFirst({ where: { email } });
    if (!findAdmin) {
      return res.status(200).json({ message: "Email not registered" });
    }
    const isMatchPassword = await bcrypt.compare(password, findAdmin.password);
    if (!isMatchPassword) {
      return res.status(200).json({ message: "Invalid Password" });
    }
    // prepare to generate token using JWT \\
    const payload = {
      admin_name: findAdmin.admin_name,
      email: findAdmin.email,
    };
    const signature = process.env.SECRET || ``;

    const token = jwt.sign(payload, signature);

    return res.status(200).json({ logged: true, token, id: findAdmin.id, admin_name: findAdmin.admin_name, email: findAdmin.email });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json(error);
  }
};

export { createAdmin, readAdmin, updateAdmin, deleteAdmin, authentication };
