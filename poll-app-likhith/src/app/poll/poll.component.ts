import { Component, OnInit } from '@angular/core';
import { PollServices } from '../poll.services';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {
  newPoll: Poll = {
    id: 0,
    question: '',
    options: [
      { optionText: '', voteCount: 0 },
      { optionText: '', voteCount: 0 }
    ]
  };

  polls: Poll[] = [];

  constructor(private pollServices: PollServices) { }

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollServices.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (error) => {
        console.error('Error fetching polls: ', error);
      }
    });
  }

  createPoll() {
    this.pollServices.createPoll(this.newPoll).subscribe({
      next: (createdPoll) => {
        this.polls.push(createdPoll);

        this.resetNewPoll();        // ✅ Clear form
        this.loadPolls();
      },
      error: (error) => {
        console.error('Error creating poll: ', error);
      }
    });
  }

  resetNewPoll() {
    this.newPoll = {
      id: 0,
      question: '',
      options: [
        { optionText: '', voteCount: 0 },
        { optionText: '', voteCount: 0 }
      ]
    };
  }

  addOption() {
    this.newPoll.options.push({ optionText: '', voteCount: 0 });
  }

  removeOption() {
    if (this.newPoll.options.length > 2) {
      this.newPoll.options.pop();
    } else {
      alert('At least 2 options are required.');
    }
  }
  vote(pollId: number, optionIndex: number) {
    this.pollServices.vote(pollId, optionIndex).subscribe({
      next: () => {
        const poll = this.polls.find(p => p.id === pollId);
        if (poll) {
          poll.options[optionIndex].voteCount++;
        }
      },
      error: (error) => {
        console.error('Error voting on a poll: ', error);
      }

    });
  }
  trackByIndex(index: number): number {
    return index;
  }


}
