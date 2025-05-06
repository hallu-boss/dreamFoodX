import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Usuń istniejące składniki, jeśli istnieją (opcjonalne)
  await prisma.ingredient.deleteMany({});

  console.log('Rozpoczęcie seedowania składników...');

  const users = [
    {
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      cookingHours: 0.0
    },
  ]

  for (const user of users) {
    const { name, surname, email, password, cookingHours } = user
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        cookingHours
      }
    });
  }
  // Lista składników często używanych w kuchni
  const ingredients = [
    {
      title: 'Mąka pszenna',
      unit: 'g',
      category: 'Produkty zbożowe'
    },
    {
      title: 'Cukier',
      unit: 'g',
      category: 'Słodycze'
    },
    {
      title: 'Sól',
      unit: 'g',
      category: 'Przyprawy'
    },
    {
      title: 'Jajka',
      unit: 'szt',
      category: 'Nabiał'
    },
    {
      title: 'Mleko',
      unit: 'ml',
      category: 'Nabiał'
    },
    {
      title: 'Masło',
      unit: 'g',
      category: 'Nabiał'
    },
    {
      title: 'Olej roślinny',
      unit: 'ml',
      category: 'Tłuszcze'
    },
    {
      title: 'Cebula',
      unit: 'szt',
      category: 'Warzywa'
    },
    {
      title: 'Czosnek',
      unit: 'szt',
      category: 'Warzywa'
    },
    {
      title: 'Pomidory',
      unit: 'g',
      category: 'Warzywa'
    },
    {
      title: 'Kurczak (filet)',
      unit: 'g',
      category: 'Mięso'
    },
    {
      title: 'Ryż',
      unit: 'g',
      category: 'Produkty zbożowe'
    },
    {
      title: 'Makaron',
      unit: 'g',
      category: 'Produkty zbożowe'
    },
    {
      title: 'Ser żółty',
      unit: 'g',
      category: 'Nabiał'
    },
    {
      title: 'Pieprz czarny',
      unit: 'g',
      category: 'Przyprawy'
    }
  ];


  // Dodaj każdy składnik do bazy danych
  for (const ingredient of ingredients) {
    await prisma.ingredient.create({
      data: ingredient
    });
  }

  console.log(`Dodano ${ingredients.length} składników do bazy danych.`);
}

// Wywołaj funkcję seed
main()
  .catch((e) => {
    console.error('Błąd podczas seedowania:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Zamknij połączenie Prisma po zakończeniu seedowania
    await prisma.$disconnect();
  });
