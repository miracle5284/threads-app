import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ICommentForm } from '../../interfaces/comment.interface';


@Component({
  selector: 'app-comment-form',
  imports: [CommonModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent {
  @Input() placeholder = "Write something ...";
  @Input() submitAction = "Create";
  @Output() onSubmit = new EventEmitter<ICommentForm>();

  submitForm(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const commentTextEl = form.elements.namedItem("commentText") as HTMLTextAreaElement;
    const commentText = commentTextEl.value;
    form.reset();
    this.onSubmit.emit({
      text: commentText,
      parentId: null
    })
  }
}
