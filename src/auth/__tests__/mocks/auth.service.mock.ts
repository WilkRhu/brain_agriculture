import { comparePasswords, hashPassword } from "@/utils/hashing.utils";
import { extractUserFields } from "@/utils/return.utils";

export const mockUserService = {
  findOneByEmail: jest.fn(),
  create: jest.fn(),
};

export const mockJwtService = {
  sign: jest.fn(),
  signAsync: jest.fn(),
};

export const mockUtils = {
  comparePasswords: jest.fn(),
  hashPassword: jest.fn(),
  extractUserFields: jest.fn(),
};
