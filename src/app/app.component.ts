import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'QUIZ APP';

  quizForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }
  questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      options: this.fb.array([]),
    });
  }

  addQuestion() {
    console.log('Adding a Question');
    this.questions().push(this.newQuestion());
  }

  removeQuestion(index: number) {
    this.questions().removeAt(index);
  }

  questionOptions(index: number): FormArray {
    return this.questions().at(index).get('options') as FormArray;
  }

  newOption(): FormGroup {
    return this.fb.group({
      option: '',
    });
  }
  addQuestionOption(index: number) {
    this.questionOptions(index).push(this.newOption());
  }
  removeQuestionOption(questionIndex: number, optionIndex: number) {
    this.questionOptions(questionIndex).removeAt(optionIndex);
  }
  onSubmit() {
    console.log(this.quizForm.value);
  }
}
