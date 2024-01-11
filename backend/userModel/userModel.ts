import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const validator = require('validator') 

const prisma = new PrismaClient();

interface SignUpParams {
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

class User {
  static async signup({ email, password }: SignUpParams) {
    // validation
    if (!email || !password) {
      throw new Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw new Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error('Password not strong enough');
    }

    const exists = await prisma.user.findUnique({ where: { email } });

    if (exists) {
      throw new Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      // @ts-ignore
      data: { email, password: hash },
    });
    return user;
  }

  static async login({ email, password }: LoginParams) {
    if (!email || !password) {
      throw new Error('All fields must be filled');
    }
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email');
    }
// @ts-ignore
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Incorrect Password');
    }
    return user;
  }
}

export default User;
