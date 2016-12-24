import {User} from "../user/user";
import {JokesGroup} from "../jokes-groups/jokes-groups";
export class Joke{
  id: number;
  content: string;
  group: JokesGroup;
  date: Date;
  author: User;
  votes: number;
  constructor(id: number, content: string, group: JokesGroup, date: Date, author: User, votes: number){
    this.id = id;
    this.content = content;
    this.group = group
    this.date = date;
    this.author = author;
    this.votes = votes;
  }
}
