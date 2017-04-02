import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Joke} from "../jokes/joke";
import {Vote} from "../votes/vote";
import {User} from "../user/user";

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {

  @Input() joke: Joke;
  @Input() votes: Vote[];
  @Input() user: User;
  @Output() deleteJoke = new EventEmitter<Joke>();
  @Output() vote = new EventEmitter<Vote>();
  canVote: boolean = true;
  currentVote: number = null;

  //let count: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.processVotes();
  }

  deleteCurrentJoke() {
    this.deleteJoke.emit(this.joke);
  }

  voteCurrentJoke(val: number): void {
    let vote = new Vote(null, this.joke, val, this.user);
    this.vote.emit(vote);
    this.votes.push(vote);
    this.canVote = false;
    this.currentVote = val;
  }

  processVotes() {
    if (!this.user.name) {
      this.canVote = false;
      return;
    }
    this.votes.forEach((vote: Vote) => {
      if (vote.joke.id === this.joke.id) {
        this.canVote = false;
        this.currentVote = vote.voteValue;
      }

    })
  }


}
