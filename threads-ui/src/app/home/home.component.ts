import {Component, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../components/comment/comment.component';
import {CommentService} from '../services/comment.service';
import {IComment, ICommentForm, ICommentTextForm} from '../interfaces/comment.interface';
import {CommentFormComponent} from '../components/comment-form/comment-form.component';
import {UserService} from '../services/user.service';
import {IUser} from '../interfaces/user.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  userService = inject(UserService);
  comments = signal<IComment[]>([]);

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe(
      comments => {
        this.comments.set(comments);
        console.log(14, comments);
      });
  }

  createComment(formEventValues: ICommentTextForm) {
    const {text} = formEventValues;
    const user = this.userService.retrieveUserFromLocalStorage();
    console.log(3589024, user);
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text: text,
      userId: user!._id,
      parentId: null
    }).subscribe(createdComment => {
      this.comments.set([createdComment, ...this.comments()]);
    });
  }

}
