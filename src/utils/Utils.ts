import bcrypt from 'bcrypt';

export default class Utils {
  static encrypt(password: string): string {
    const salt = +(process.env.BCRYPT_SALT as string);
    return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt);
  }

  static decrypt(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(
      `${password}${process.env.BCRYPT_PASSWORD}`,
      hashPassword
    );
  }
}
