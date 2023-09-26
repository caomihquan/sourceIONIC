export class Event {
  allDay: boolean;
  endTime: Date;
  startTime: Date;
  title: string;
  id: number;

  /**
   *
   */
  constructor(allDay: boolean,
    endTime: Date,
    startTime: Date,
    title: string,
    id: number) {
    this.allDay = allDay;
    this.endTime = endTime;
    this.startTime = startTime;
    this.title = title;
    this.id = id
  }

}
export class SortedEvent {
  allDay: boolean;
  endDate: Date;
  endTime: string;
  startTime: string;
  startDate: Date;
  title: string;
  id: number;
  isEndDate: boolean;
  isStartDate: boolean;
  /**
   *
   */
  constructor(
    allDay: boolean,
    isEndDate: boolean,
    isStartDate: boolean,
    endTime: string,
    startTime: string,
    endDate: Date,
    startDate: Date,
    title: string,
    id: number) {
    this.allDay = allDay;
    this.endDate = endDate;
    this.startDate = startDate;
    this.endTime = endTime;
    this.startTime = startTime;
    this.title = title;
    this.id = id;
    this.isStartDate = isStartDate;
    this.isEndDate = isEndDate;
  }

}
export class eventCard {
  key: number;
  dayBegin: number;
  list: Event2[] = [];
  /**
   *
   */
  constructor(key: number, list: Event2[] = []) {
    this.key = key;
    this.list = list
  }
}
export class Event2 {
  allDay: boolean;
  endTime: Date;
  startTime: Date;
  title: string;
  colorCode: string = '8ED921';
  /**
   *
   */
  constructor(
    title: string,
    startTime: Date,
    endTime: Date,
    allDay: boolean,
    colorCode: string = '8ED921'
  ) {
    this.allDay = allDay;
    this.endTime = endTime;
    this.startTime = startTime;
    this.title = title;
    this.colorCode = colorCode;
  }

}
