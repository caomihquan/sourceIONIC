import {
  Component, Input, OnInit, Output, EventEmitter
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { IPConfig } from 'src/IPConfig';


export interface Item {
  title: string;
  id: string | number;
  children?: Item[];
  parent?: string|number;
}
@Component({
  selector: 'app-standard-header',
  templateUrl: './StandardHeader.component.html',
  styleUrls: ['./StandardHeader.component.scss']
})
export class HrmStandardHeaderComponent {
  @Input() title: string;
  @Input() icon:string;
  @Input() href:string;
  @Input() iconRight:string;
  @Input() isIconRight = false;

  @Output() outClickIconRight = new EventEmitter();

  width;
  tetst;
  constructor(private platform:Platform,private sanitizer:DomSanitizer){
    this.width = (platform.width() - 90) + 'px';
    this.tetst =this.sanitizer.bypassSecurityTrustHtml(`<style>
    ion-back-button::part(text){
    overflow: hidden;
    max-width: ${this.width};
    text-overflow: ellipsis;
    }
  </style>`)

  }
  onClickIconRight(){
    this.outClickIconRight.emit();
  }
}
