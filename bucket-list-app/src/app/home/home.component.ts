import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../core/items.service';
import { IItem } from '../shared/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemsPersonal:IItem[] = []
  itemsSaved:IItem[] = []
  
  createItems:boolean = false
  errorCreation: string = ''

  editItems:boolean = false
  errorEdit: string = ''
  editItem: IItem = {_id: '', user: '', originalUser: '', text: '', complete: false}

  constructor(
    private items: ItemsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const username = window.localStorage.getItem('Username')
    let user:any = username?username:""
    this.items.getItems(user).subscribe((lst:IItem[]) => {
      console.log(lst)
      this.itemsPersonal = lst.filter((i:IItem) => i.user === i.originalUser)
      this.itemsSaved = lst.filter((i:IItem) => i.user != i.originalUser)
    })
  }

  createItem() {
    this.createItems = true
    this.errorCreation = ""
  }

  onMarkComplete(item: IItem) {
    this.items.markComplete(item._id,!item.complete).subscribe({
      next: (data:any) => {
        item.complete = !item.complete
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  onEditItem(item: IItem, list: string) {
    this.editItems = true
    this.errorEdit = ''
    this.editItem = item
  }

  onDeleteItem(id: string, list:string) {
    this.items.deleteItem(id).subscribe({
      next: (data:any) => {
        if (list === 'personal') {
          this.itemsPersonal = this.itemsPersonal.filter((i:IItem) => i._id != id)
        }
        else {
          this.itemsSaved = this.itemsSaved.filter((i:IItem) => i._id != id)
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        if (list === 'personal') {
          this.itemsPersonal = this.itemsPersonal.filter((i:IItem) => i._id != id)
        }
        else {
          this.itemsSaved = this.itemsSaved.filter((i:IItem) => i._id != id)
        }
      }
    })
  }

  match() {
    this.router.navigate([ '/match' ]);
  }

  onCompleteCreation(success: boolean, item: any) {
    if (success) {
      this.items.createItem(item).subscribe({
        next: (data:any) => {
          const { ['__v']: v, ...newItem } = data.data
          this.itemsPersonal.push(newItem)
          this.createItems = false
          this.errorCreation = ""
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.msg) {
            this.errorCreation = err.error.msg;
          } else {
            this.errorCreation = 'Something Went Wrong!';
          }
        }
      })
    }
    this.createItems = false
  }

  onCompleteEdit(success: boolean, item: any) {
    if (success) {
      const newItem = {
        ...this.editItem,
        text: item.text
      }
      this.items.editItem(newItem).subscribe({
        next: (data:any) => {
          this.itemsPersonal = this.itemsPersonal.map((i:IItem) => i._id == newItem._id ? {...i,text:item.text} : i)
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.msg) {
            this.errorEdit = err.error.msg;
          } else {
            this.errorEdit = 'Something Went Wrong!';
          }
        }
      })
    }
    this.editItems = false
  }

}
