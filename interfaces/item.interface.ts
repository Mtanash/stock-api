export interface Item {
  _id?: string;
  name: string;
  quantity: number;
  date: {
    month: number;
    year: number;
  };
}
