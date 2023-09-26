import {
  Component, Input, OnInit, Output, EventEmitter
} from '@angular/core';
import CommonConst from '../../../../../../src/libs/constants/CommonConst.js';
export interface Item {
  title: string;
  id: string | number;
  children?: Item[];
  parent?: string|number;
}
@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class HrmTreeviewComponent {
  @Input() list = [];
  @Input() opened = new Set();
  @Input() id;
  @Input() parentId;
  @Input() title;
  @Input() isSearch = false;
  @Input() isMulti = false;
  @Output() addChild = new EventEmitter<any>();
  @Output() removeChild = new EventEmitter<any>();
  @Output() selectedTree = new EventEmitter<any>();
  textSearch:string=''
  found: Item[] = [];
  matcher = (term, item) => item[this.title].toLowerCase().includes(term.toLowerCase());
  ngOnInit() {
  }
  toggle(id) {
    this.opened.has(id) ? this.opened.delete(id) : !this.opened.add(id);
  }

  getItemsAtParent(parentId) {
    return this.list.filter(item => {
      return parentId ? item[this.parentId] === parentId : !item[this.parentId]
    });
  }

  hasChildren(id) {
    const found = this.list.find(item => item[this.parentId] === +id);
    return found;
  }



  show(id) {
    let item = this.parentId in id ? id : this.find(+id);
    if (!item) {
      return;
    }
    while (item ? item[this.parentId] : false) {
      this.opened.add(item[this.parentId]);
      item = this.find(item[this.parentId]);
    }
  }

  private find(id) {
    return this.list.find(item => item[this.id] === id);
  }

  search(term) {
    this.textSearch= term
    this.found = this.list.filter(item => this.matcher.call(this, term, item));
    this.found.forEach(item => this.show(item))
  }
  onClickItem(item){
    const children = this.getChildrenOfParent(item[this.id]);
    item.checked = !item.checked
    children.push(item);
    const employeeCodes = new Set(children.map(dataOut => dataOut[this.id]));
    this.list.map(data => {
      if(employeeCodes.has(data[this.id])){
        data.checked = item.checked;
      }
      return data;
    });
    item[CommonConst.KEY.MultiSelectedItems] = this.list.filter(data => data.checked === true).map(x => x.DepartmentCode).join(';');
    item[CommonConst.KEY.MultiSelectedItemsName] = this.list.filter(data => data.checked === true).map(x => x.DepartmentName).join(';');
    this.selectedTree.emit(item);
  }

  clear(){
    this.list.map(data => {
      data.checked = false;
      return data;
    });
  }


  getChildrenOfParent(parentId) {
    const parentNode = this.list.find(node => node[this.id] === parentId);
    let children = [];
    if (parentNode) {
      this.list.forEach(node => {
        if (node[this.parentId] === parentId) {
          children.push(node);
          children = children.concat(this.getChildrenOfParent(node[this.id]));
        }
      });
    }
    return children;
  }

}
