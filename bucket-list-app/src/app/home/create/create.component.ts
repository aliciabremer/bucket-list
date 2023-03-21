import { Component,Output,EventEmitter,Input,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() error: string = ''
  @Input() title: string = ''

  

  @Input() text:string = ''

  @Output() complete = new EventEmitter<[boolean,any]>();

  createForm = new FormGroup({
    item: new FormControl('')
  })

  constructor () {}

  ngOnInit(): void {
      this.createForm.value.item = this.text
  }

  close(success: boolean, item:any) {
    this.complete.emit([success, item]);
  }

  create() {
    this.close(
      true,
      {
        text: this.createForm.value.item ? this.createForm.value.item : ""
      }
    )    
  }

}
