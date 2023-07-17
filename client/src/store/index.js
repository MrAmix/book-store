import { makeAutoObservable } from "mobx";
import {
  makePersistable,
  clearPersistedStore,
  hydrateStore,
} from "mobx-persist-store";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  basketId = null;
  countBasket = 0;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "SampleStore",
      properties: ["user", "isAuth", "isLoading", "countBasket", "basketId"],
      storage: window.localStorage,
    });
  }

  setAuth(boolean) {
    this.isAuth = boolean;
  }

  setCoutBasket(number) {
    this.countBasket = number;
  }

  setBasket(basketId) {
    this.basketId = basketId ? Number(basketId) : basketId;
  }

  setUser(user) {
    this.user = Object.keys(user).length ? { ...user } : {};
  }

  async clearStoredDate() {
    await clearPersistedStore(this);
  }

  async hydrateStore() {
    await hydrateStore(this);
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
      this.setUser(json.user);
      this.setAuth(true);
      this.setBasket(this.user.user_id);
      this.setCoutBasket(this.user.booksCount);
      this.hydrateStore();
      return { status: true };
    }

    this.setAuth(false);

    return { status: false, errorStatus: response.status };
  }

  async logout() {
    this.setUser({});
    this.setAuth(false);
    this.setBasket(null);
    this.setCoutBasket(0);
    this.clearStoredDate();
  }
}
