export interface Target {
  title: string;
  contents?: string;
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
}

export interface CoreTarget extends Target {
  detailList: DetailTarget[];
  id: string;
}

export interface DetailTarget extends Target {
  modifyAt?: Date;
  coreId: string;
  todoList: TodoTarget[];
  id: string;
}

export interface TodoTarget extends Target {
  modifyAt?: Date;
  coreId: string;
  detailId: string;
  id: string;
}
