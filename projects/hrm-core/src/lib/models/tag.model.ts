export class Tag {
    id: number;
    tagName: string;
    colorCode: string;
    icon: string;
    constructor(
        id: number,
        tagName: string,
        colorCode: string,
        icon: string,
    ) {
        this.id = id;
        this.tagName = tagName;
        this.colorCode = colorCode;
        this.icon = icon;
    }
}

export class TagModel {
    id: string;
    type: string;
    language: string;
    displayRow: number;
    rowSize: number;
    multiSelect: boolean;
    datas: valueListModel[] = [];
    constructor(
        id: string,
        type: string,
        language: string,
        displayRow: number,
        rowSize: number,
        multiSelect: boolean,
        datas: any[],
    ) {
        this.id = id;
        this.type = type;
        this.language = language;
        this.displayRow = displayRow;
        this.rowSize = rowSize;
        this.multiSelect = multiSelect;
        this.datas = datas;
    }
}

export class valueListModel {
    value: string;
    text: string;
    defaultT: string;
    color: string;
    textColor: string;
    icon: string;
    idx: number;
    constructor(
        value: string,
        text: string,
        defaultT: string,
        color: string,
        textColor: string,
        icon: string,
        idx: number,
    ) {
        this.value = value;
        this.text = text;
        this.defaultT = defaultT;
        this.color = color;
        this.textColor = textColor;
        this.icon = icon;
        this.idx = idx;
    }
}