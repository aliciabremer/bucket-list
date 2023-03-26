import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../core/items.service';
import { Router } from '@angular/router';
import { IItem } from '../shared/interfaces';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

    matchItems:IItem[] = []
    ind: number = 0
    user: string = ""

    constructor(
      private itemService: ItemsService,
      private router: Router
     ) {}

    ngOnInit(): void {
      const username = window.localStorage.getItem('Username')
      let user:any = username?username:""
      this.user = user
      this.itemService.getMatchItems(user).subscribe((lst:IItem[]) => {
        this.matchItems = lst
      })
    }

    navigateHome(): void {
      this.router.navigate(['/home'])
    }

    noMatch(): void {
      this.ind += 1
    }

    addMatch(): void {
      const item: IItem = {
        ...this.matchItems[this.ind],
        user: this.user
      }
      this.itemService.createItem(item).subscribe()
      this.ind += 1
    }
    
}
