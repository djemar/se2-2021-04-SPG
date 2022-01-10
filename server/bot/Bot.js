export class Bot {
  constructor() {
    this.users = [];
  }
  addUser = (id, name, surname, username) => {
    let user = this.users.find((u) => u.getId() === id);
    if (!user) {
      user = new User(id, name, surname, username);
      this.users.push(user);
      console.log("[TELEGRAM] User created: ", id);
    }
    return true;
  };
  subscribeUser = (id) => {
    const user = this.users.find((u) => u.getId() === id);
    if (user) {
      if (!user.isSubscribed()) {
        user.subscribe();
        console.log(
          "[TELEGRAM] User: " + user.getId() + " " + user.getName() + " - Subscribed!"
        );
      }
    }
  };
  unsubscribeUser = (id) => {
    const user = this.users.find((u) => u.getId() === id);
    if (user) {
      if (user.isSubscribed()) {
        user.unsubscribe();
        console.log(
          "[TELEGRAM] User: " + user.getId() + " " + user.getName() + " - Unsubscribed!"
        );
      }
    }
  };
  getSubscribedUsersId = () => {
    return this.users.filter((u) => u.isSubscribed()).map((u) => u.getId());
  };
  getUsersId = () => {
    return this.users.map((u) => u.getId());
  };
  getUserId = (id) => {
    return this.users.find((u) => u.getId() === id).map((u) => u.getId());
  };
  getUserInfo = (id) => {
    const user = this.users.find((u) => u.getId() === id);
    return user.id + " " + user.name;
  };
  isUserSubscribed = (id) => {
    const user = this.users.find((u) => u.getId() === id);
    if (user) {
      return user.isSubscribed();
    }
  };
}

export class User {
  constructor(id, name, surname, username) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.subscribed = false;
  }
  getId = () => {
    return this.id;
  };
  getName = () => {
    return this.name;
  };
  isSubscribed = () => {
    return this.subscribed;
  };
  subscribe = () => {
    this.subscribed = true;
  };
  unsubscribe = () => {
    this.subscribed = false;
  };
}
