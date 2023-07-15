import { makeAutoObservable } from "mobx";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  countBasket = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(boolean) {
    this.isAuth = boolean;
  }
  setCoutBasket(number) {
    this.countBasket = number;
  }
  setBasket(basketId) {
    this.basketId = basketId;
  }

  async registration(name, login, password) {
    const response = await fetch(
      "http://localhost:5000/api/users/registration",
      {
        method: "POST",
        body: JSON.stringify({ name, login, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      return { status: true };
    }

    return { status: false, errorStatus: response.status };
  }
  async login(login, password) {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const json = await response.json();

      console.log("Успех:", JSON.stringify(json));
      this.user = { ...json.user };
      this.setAuth(true);
      this.setBasket(this.user.user_id);
      this.setCoutBasket(this.user.booksCount);
      return { status: true };
    }

    this.setAuth(false);

    return { status: false, errorStatus: response.status };
  }
}
