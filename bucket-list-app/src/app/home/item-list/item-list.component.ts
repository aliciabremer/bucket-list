import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IItem } from '../../shared/interfaces';
import { ItemsService } from '../../core/items.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() title:string = "Bucket List Items";
  @Input() lst: IItem[] = [];
  @Input() editable: boolean = true;
  @Input() button:string = "Button";

  @Output() clicked = new EventEmitter();
  @Output() markComplete = new EventEmitter<IItem>();
  @Output() edit = new EventEmitter<IItem>();
  @Output() delete = new EventEmitter<string>();

  constructor() {}

  onSelection(item: IItem) {
    this.markComplete.emit(item)
    item.complete = !item.complete
    
  }
}
