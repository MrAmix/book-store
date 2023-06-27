import { makeAutoObservable } from "mobx";

export default class Store {
  user = {};
  isAuth = false;
  countBasket = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setCoutBasket(namber) {
    this.countBasket = namber;
  }
}
