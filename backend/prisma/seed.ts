import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Usuń istniejące składniki i przepisy, jeśli istnieją
  await prisma.recipeStep.deleteMany({});
  await prisma.recipe.deleteMany({});
  await prisma.ingredient.deleteMany({});
  
  console.log('Rozpoczęcie seedowania...');

  // Utwórz użytkownika
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

  interface Ingredient {
    title: string;
    unit: string;
    category: string;
  }

  // Lista składników często używanych w kuchni
  const ingredients: Ingredient[] = [
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
    },
    {
      title: 'Marchewka',
      unit: 'g',
      category: 'Warzywa'
    },
    {
      title: 'Proszek do pieczenia',
      unit: 'g',
      category: 'Dodatki'
    },
    {
      title: 'Cynamon',
      unit: 'g',
      category: 'Przyprawy'
    },
    {
      title: 'Orzechy włoskie',
      unit: 'g',
      category: 'Orzechy'
    },
    {
      title: 'Drożdże',
      unit: 'g',
      category: 'Dodatki'
    }
  ];

  // Dodaj każdy składnik do bazy danych
  const createdIngredients: Ingredient[] = [];
  for (const ingredient of ingredients) {
    const created = await prisma.ingredient.create({
      data: ingredient
    });
    createdIngredients.push(created);
  }

  console.log(`Dodano ${ingredients.length} składników do bazy danych.`);

  interface Step {
    title: string;
    stepType: 'ADD_INGREDIENT' | 'COOKING' | 'DESCRIPTION';
    ingredientId?: number;
    amount?: number;
    time?: string;
    temperature?: number;
    mixSpeed?: number;
    description?: string;
  }

  interface Recipe {
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    userId: number;
    steps: Step[];
  }

  // Dodaj przepisy
  const recipes: Recipe[] = [
    {
      title: 'Ciasto marchewkowe',
      description: 'Pyszne i wilgotne ciasto marchewkowe z orzechami włoskimi',
      category: 'deser',
      price: 15.99,
      image: 'https://res.cloudinary.com/dco9zum8l/image/upload/v1746961475/lthhttzqk7zcpzjvjx0m.png',
      userId: 1,
      steps: [
        {
          title: 'Dodaj mąkę',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Mąka pszenna'),
          amount: 250
        },
        {
          title: 'Dodaj jajka',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Jajka'),
          amount: 3
        },
        {
          title: 'Dodaj cukier',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Cukier'),
          amount: 200
        },
        {
          title: 'Dodaj marchewkę',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Marchewka'),
          amount: 300
        },
        {
          title: 'Dodaj proszek do pieczenia',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Proszek do pieczenia'),
          amount: 10
        },
        {
          title: 'Dodaj cynamon',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Cynamon'),
          amount: 5
        },
        {
          title: 'Dodaj orzechy włoskie',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Orzechy włoskie'),
          amount: 100
        },
        {
          title: 'Mieszaj składniki',
          stepType: 'COOKING',
          time: '05:00',
          temperature: 2,
          mixSpeed: 2
        },
        {
          title: 'Piecz w piekarniku',
          stepType: 'DESCRIPTION',
          description: "Piecz w piekarniku przez 45min. 180°C"
        },
        {
          title: 'Studź przed podaniem',
          stepType: 'DESCRIPTION',
          description: 'Pozostaw ciasto do ostudzenia przez około 30 minut przed pokrojeniem'
        }
      ]
    },
    {
      title: 'Naleśniki',
      description: 'Klasyczne naleśniki, idealne na śniadanie lub deser',
      category: 'sniadanie',
      price: 10.50,
      image: 'https://res.cloudinary.com/dco9zum8l/image/upload/v1746961643/ap4wjpcva3xafifcrjal.png',
      userId: 1,
      steps: [
        {
          title: 'Dodaj mąkę',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Mąka pszenna'),
          amount: 200
        },
        {
          title: 'Dodaj jajka',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Jajka'),
          amount: 2
        },
        {
          title: 'Dodaj mleko',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Mleko'),
          amount: 500
        },
        {
          title: 'Dodaj sól',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Sól'),
          amount: 2
        },
        {
          title: 'Dodaj olej',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Olej roślinny'),
          amount: 30
        },
        {
          title: 'Wymieszaj ciasto',
          stepType: 'COOKING',
          time: '03:00',
          temperature: 1,
          mixSpeed: 3
        },
        {
          title: 'Odstaw ciasto',
          stepType: 'DESCRIPTION',
          description: 'Odstaw ciasto na 30 minut, aby mąka napęczniała'
        },
        {
          title: 'Smaż naleśniki',
          stepType: 'DESCRIPTION',
          description: '2 minuty na stronę',
        }
      ]
    },
    {
      title: 'Bułki domowe',
      description: 'Puszyste domowe bułki z chrupiącą skórką',
      category: 'sniadanie',
      price: 8.99,
      image: 'https://res.cloudinary.com/dco9zum8l/image/upload/v1746961550/qvewzvbyos5uexma57mz.png',
      userId: 1,
      steps: [
        {
          title: 'Dodaj mąkę',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Mąka pszenna'),
          amount: 500
        },
        {
          title: 'Dodaj drożdże',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Drożdże'),
          amount: 15
        },
        {
          title: 'Dodaj sól',
          stepType: 'ADD_INGREDIENT',
          ingredientId: findIngredientIdByTitle(createdIngredients, 'Sól'),
          amount: 10
        },
        {
          title: 'Dodaj ciepłą wodę',
          stepType: 'DESCRIPTION',
          description: 'Dodaj około 300ml ciepłej wody (nie gorącej)'
        },
        {
          title: 'Wyrabiaj ciasto',
          stepType: 'COOKING',
          time: '10:00',
          temperature: 1,
          mixSpeed: 2
        },
        {
          title: 'Pozostaw do wyrośnięcia',
          stepType: 'DESCRIPTION',
          description: 'Przykryj ciasto ściereczką i pozostaw w ciepłym miejscu na około 1 godzinę, aż podwoi swoją objętość'
        },
        {
          title: 'Formuj bułki',
          stepType: 'DESCRIPTION',
          description: 'Podziel ciasto na 8 równych części i uformuj bułki'
        },
        {
          title: 'Ponownie pozostaw do wyrośnięcia',
          stepType: 'DESCRIPTION',
          description: 'Pozostaw bułki na blasze pod ściereczką na około 30 minut'
        },
        {
          title: 'Piecz bułki',
          stepType: 'DESCRIPTION',
          description: 'Piecz bułki przez 20min. w 220°C',
        },
        {
          title: 'Studź przed podaniem',
          stepType: 'DESCRIPTION',
          description: 'Pozostaw bułki do ostudzenia przez kilka minut przed podaniem'
        }
      ]
    }
  ];

  // Funkcja pomocnicza do znajdowania ID składnika po nazwie
  function findIngredientIdByTitle(ingredients: Ingredient[], title: string) {
    return ingredients.findIndex((ing) => ing.title === title) + 1;
  }

  // Dodaj przepisy do bazy danych
  for (const recipe of recipes) {
    const { steps, ...recipeData } = recipe;
    
    const createdRecipe = await prisma.recipe.create({
      data: {
        ...recipeData,
        steps: {
          create: steps
        }
      }
    });
    
    console.log(`Dodano przepis: ${recipe.title} (ID: ${createdRecipe.id})`);
  }

  console.log(`Dodano ${recipes.length} przepisów do bazy danych.`);
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