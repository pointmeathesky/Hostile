import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import prisma from '../../../db';

import {authOptions} from "@/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
