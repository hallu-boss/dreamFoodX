//  Klasa użytkownika korzystajacego z danej chwili z witryny

export class UserData  {
  // TODO id użytkownika - opcjonalnie
  name: string;
  surname: string
  cookingHours: number;
  email: string;
  isLoggedIn: boolean = false;

 

  constructor (
        name="Guest",
        surname ="",
        email="",
        cookingHours = 0,
        isLoggedIn=false
    ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.cookingHours = cookingHours;
    this.isLoggedIn = isLoggedIn;
  }

  //  METODY

  checkLoginStatus() : boolean {
    return this.isLoggedIn;
  }

  

  setDataUser(name: string, surname: string, cookingHours: number) {
    this.name = name;
    this.surname = surname;
    this.cookingHours = cookingHours;
  }

  logout() : void {
    this.isLoggedIn = false;
    this.setGuest();
  }

  private setGuest() : void {
    this.name = "Guest"; 
    this.surname = "";
    this.email = "";
    this.cookingHours = 0;
  }
}

export default UserData;