import {Component, effect, inject, Input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component'
import {IComment, ICommentTextForm} from '../../interfaces/comment.interface';
import {CommentService} from '../../services/comment.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, CommentFormComponent],
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!: IComment;
  isExpanded = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService);
  userService = inject(UserService);

  nestedComments = signal<IComment[]>([]);

  nestedCommentEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.getComments(this.comment._id).subscribe(
        nestedComments => {
          this.nestedComments.set(nestedComments);
        })
    }
  })

  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded());
  }

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpanded.set(true);
    }
  }

  createReplyComment(formEventValues: ICommentTextForm) {
    const {text} = formEventValues;
    const user = this.userService.retrieveUserFromLocalStorage();
    console.log(3589024, user);
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text: text,
      userId: user!._id,
      parentId: this.comment._id
    }).subscribe(createdComment => {
      this.nestedComments.set([createdComment, ...this.nestedComments()]);
    });
  }

}
