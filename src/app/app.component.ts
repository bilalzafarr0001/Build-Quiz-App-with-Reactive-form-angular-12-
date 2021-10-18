import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'QUIZ APP';
  attempt: boolean = false;
  attemptQuestions: any;
  quizForm: FormGroup;
  isInput = false;
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
      chooseType: '',
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
  attemptQuiz() {
    this.attempt = true;
    console.log('attemping quiz ....');
    this.attemptQuestions = JSON.parse(
      localStorage.getItem('questions') || '[]'
    );
    console.log('questions from local storage are ', this.attemptQuestions);
  }
  goBack() {
    this.attempt = false;
  }
  onclickHandler(id: number) {
    console.log('id is ', id);
  }

  onSubmit() {
    console.log('form values', this.quizForm.value.questions);
    localStorage.setItem(
      'questions',
      JSON.stringify(this.quizForm.value.questions)
    );
  }
}
