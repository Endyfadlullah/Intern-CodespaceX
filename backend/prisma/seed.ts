import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash the password for security
  const hashedPassword = await bcrypt.hash('Admin123', 10);

  // Create a user with the role of 'admin'
  await prisma.user.create({
    data: {
      Username: 'admin',
      Email: 'admin@gmail.com',
      Password: hashedPassword,
      Role: 'admin',
      Status: 'active',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
