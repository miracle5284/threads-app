import {effect, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IUser} from '../interfaces/user.interface';
import {environment} from '../../../environ';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  localStorageKey = 'threads-user'

  userFromStorage: IUser = {} as IUser;

  createUser(firstName: string, lastName: string, email: string, username: string){
    return this.http.post<IUser>(`${environment.apiBaseUrl}/users`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
    });
  }

  saveUserToLocalStorage(user: IUser) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    let user = null;
    effect(() => {
      user = localStorage.getItem(this.localStorageKey);
      console.log(1111, user);
    });
    return user ? JSON.parse(user) as IUser: null;
  }

  retrieveUserFromLocalStorage() {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) as IUser: null;
  }

  constructor() {
  //   let user = this.getUserFromLocalStorage()
  //
  //   if (!user) {
  //     const names = ["Alice", "Bob", "Miracle", "Grace", "John", "Sam"];
  //     this.createUser(
  //       names[Math.floor(Math.random() * names.length)],
  //       names[Math.floor(Math.random() * names.length)],
  //       "testuser@gmail.com",
  //       Math.random().toString(36).substring(2, 2 + 8)
  //     ).subscribe(_user => {
  //       console.log('\n\n\n',123456, _user);
  //       this.userFromStorage = _user;
  //       localStorage.setItem(this.localStorageKey, JSON.stringify(this.userFromStorage));
  //   });
  // }
}}
