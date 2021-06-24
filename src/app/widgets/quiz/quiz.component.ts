import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() widget: any;

  constructor(public globals: Globals, public api: ApiService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getQuizes();
  }
  public hidden: boolean = true;
  public titleValue: String = "";
  public linkValue: String = "";
  public lastSelectedItem: any;
  public quizes: any = [];

  getQuizes() {
    this.api.getAllQuizes().subscribe((data: any) => {
      console.log(data);
      this.quizes = data.result.quiz;
      console.log(this.quizes);
      this.changeDetection.detectChanges();
    });
  }

  createNewQuiz() {
    if (this.linkValue != '' && this.titleValue != '') {
      this.api.createNewQuiz(this.titleValue, this.linkValue).subscribe((data: any) => {
        this.titleValue = "";
        this.linkValue = "";
        this.api.getAllQuizes().subscribe((data: any) => {
          this.quizes = data.result.quiz;
          this.changeDetection.detectChanges();
        });
      });
    }
  }

  selectQuiz(item: any) {
    console.log(item);

    this.titleValue = item.Title;
    this.linkValue = item.Url;
    this.hidden = false;

    // this.globals.quiz_list_original.forEach((item: any) => {
    //   if (item.title === this.titleChecked) {
    //     this.api.setQuizStatus(this.titleChecked, true).subscribe((data) => {
    //       console.log(data);
    //     });
    //   }
    // });
  }

  updateQuiz(status: boolean) {
    this.api.updateQuiz(this.titleValue, this.linkValue, status).subscribe(data => {
      console.log(data);
    })
  }
}
