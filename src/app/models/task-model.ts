import { User } from "./user-model";
export class Task {
    constructor(
        public  taskId: number,
        public title: string,
        public description:string,
        public createDate: string,
        public dueDate: string,
        public status:string,
        public userr: User

    ) {
    }
  }