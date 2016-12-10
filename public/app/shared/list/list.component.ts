import { Component, OnInit, Input, ContentChildren, ViewChild } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ul, li'
})
class ListItem {

}


@Component({
  selector: 'list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  moduleId: module.id
})
export class List implements OnInit {

  @Input() emptyState: string = 'No list items.';

  @ViewChild('contentWrapper') contentWrapper;

  constructor() {  }

  ngAfterContentInit() {
    console.info('ContentInit: contentWrapper', this.contentWrapper);
  }

  ngAfterViewInit() {
    console.info('ViewInit: contentWrapper', this.contentWrapper);
  }

  ngOnInit() {}
}
