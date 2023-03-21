import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../core/items.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

    constructor(private itemService: ItemsService) {}

    ngOnInit(): void {
      
    }
}
