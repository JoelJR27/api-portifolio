import bcrypt from "bcrypt";
export default async function hashData(data: string) {
  const hashedData = await bcrypt.hash(data, 10);
  return hashedData;
}
