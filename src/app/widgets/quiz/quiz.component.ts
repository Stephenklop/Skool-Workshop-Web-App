import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() widget: any;

  constructor(public globals: Globals, public api: ApiService) { }

  ngOnInit(): void {
  }

  public titleChecked: String = '';
  public titleInput: String = "";
  public linkInput: String = "";


  createNewQuiz() {
    if (this.linkInput != '' && this.titleInput != '') {
      this.api.createNewQuiz(this.titleInput, this.linkInput).subscribe((data: any) => {
        this.titleInput = '';
        this.linkInput = '';
        this.api.getAllQuizes().subscribe((data: any) => {
          this.globals.quiz_list_original = data.quiz;
        });
      });
    }
  }

  selectQuiz() {
    this.globals.quiz_list_original.forEach((item: any) => {
      if (item.title === this.titleChecked) {
        this.api.setQuizStatus(this.titleChecked, true).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }
}
