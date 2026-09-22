// Dev-only seed script: crea usuarios de prueba con distintos roles para
// poder verificar manualmente el login y la navegación por rol (tasks 9.1 y
// 9.3 de openspec/changes/secretaria-academica). No es un endpoint HTTP:
// se corre a mano contra la base de desarrollo con `npm run seed`.
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function upsertUsuario(email, password, roles) {
  const passwordHash = await bcrypt.hash(password, 10);
  const usuario = await prisma.usuario.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  // Se asignan los roles por fuera del upsert de arriba y con su propio
  // upsert por rol: si el usuario ya existía, la rama `update` no toca
  // relaciones, y algunos tests de este repo hacen
  // `usuarioRol.deleteMany({})` sin filtrar (bug de esos tests, no de este
  // script) que vacía la tabla de asignaciones entera. Así el seed queda
  // realmente idempotente y se puede re-correr para reparar esa pérdida.
  for (const nombre of roles) {
    const rol = await prisma.rol.upsert({ where: { nombre }, update: {}, create: { nombre } });
    await prisma.usuarioRol.upsert({
      where: { usuarioId_rolId: { usuarioId: usuario.id, rolId: rol.id } },
      update: {},
      create: { usuarioId: usuario.id, rolId: rol.id },
    });
  }

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
