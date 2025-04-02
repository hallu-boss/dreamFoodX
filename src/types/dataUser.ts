
// dataUser.ts


export  interface UserInterface {
    name: string;
    countRecipe: number;
    coockingHours: number;
    email: string;
    isLoggedIn: boolean;
  }


export class UserLogin implements UserInterface {

  constructor (
    readonly name: string,
    readonly countRecipe: number,
    readonly coockingHours: number,
    readonly email: string,
    private isLoggedIn: boolean,
  ) {}

  checkLoginStatus():boolean {
    console.log('Użytkownik: ${this.isLoggedIn?"zalogowany" : "niezalogowany"}');
    return this.isLoggedIn;
  }
}
