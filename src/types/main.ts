export interface Target {
  title: string;
  contents?: string;
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
}

export interface CoreTarget extends Target {
  detailList: DetailTarget[];
}

export interface DetailTarget extends Target {
  modifyAt?: Date;
  coreId: string;
  todoList: TodoTarget[];
}

export interface TodoTarget extends Target {
  modifyAt?: Date;
  coreId: string;
  detailId: string;
}
