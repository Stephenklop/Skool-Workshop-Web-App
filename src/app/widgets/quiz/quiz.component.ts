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
    this.getQuizes();
  }
  public titleValue: String = "";
  public linkValue: String = "";

  public quizes: any = [];

  public titleChecked: String = '';
  public titleInput: String = "";
  public linkInput: String = "";

  getQuizes() {
    this.api.getAllQuizes().subscribe((data: any) => {
      console.log(data);
      this.quizes = data.result.quiz;
      console.log(this.quizes);
    });
  }

  createNewQuiz() {
    if (this.linkValue != '' && this.titleValue != '') {
      this.api.createNewQuiz(this.titleValue, this.linkValue).subscribe((data: any) => {
        console.log(data);
        this.titleValue = '';
        this.linkValue = '';
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
