// Dev-only seed script: crea usuarios de prueba con distintos roles para
// poder verificar manualmente el login y la navegación por rol (tasks 9.1 y
// 9.3 de openspec/changes/secretaria-academica). No es un endpoint HTTP:
// se corre a mano contra la base de desarrollo con `npm run seed`.
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function upsertUsuario(email, password, roles) {
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.usuario.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      roles: {
        create: roles.map((nombre) => ({
          rol: { connectOrCreate: { where: { nombre }, create: { nombre } } },
        })),
      },
    },
  });
  console.log(`Usuario listo: ${email} / ${password} (roles: ${roles.join(', ') || 'ninguno'})`);
}

async function main() {
  await upsertUsuario('secretaria@iico.edu.ar', 'Secretaria123!', ['SecretariaAcademica']);
  await upsertUsuario('docente@iico.edu.ar', 'Docente123!', ['Docente']);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
