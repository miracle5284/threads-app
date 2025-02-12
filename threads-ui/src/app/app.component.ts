import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'threads-ui';
  userService = inject(UserService);

  constructor() {
    let user = this.userService.getUserFromLocalStorage();
    if (!user) {
      const names = ["Alice", "Bob", "Miracle", "Grace", "John", "Sam"];
      this.userService.createUser(
        names[Math.floor(Math.random() * names.length)],
        names[Math.floor(Math.random() * names.length)],
        "testuser@gmail.com",
        Math.random().toString(36).substring(2, 2 + 8)
      ).subscribe(_user => this.userService.saveUserToLocalStorage(_user!));

    }
  }
}

