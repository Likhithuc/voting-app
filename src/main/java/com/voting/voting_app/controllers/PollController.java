package com.voting.voting_app.controllers;


import com.voting.voting_app.model.Poll;
import com.voting.voting_app.request.Vote;
import com.voting.voting_app.services.PollService;
import jdk.jfr.Registered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")

@CrossOrigin(origins = "http://localhost:4200/")
public class PollController {
  private PollService pollService;


  public PollController(PollService pollService){
      this.pollService=pollService;
  }

  @PostMapping
  public ResponseEntity<?> createPoll(@RequestBody Poll poll){
    System.out.println("Received poll: " + poll);
    try {
      Poll created = pollService.createPoll(poll);
      return ResponseEntity.ok(created);
    } catch (Exception e) {
      e.printStackTrace(); // This prints the real cause in the terminal
      return ResponseEntity.status(500).body("Error creating poll: " + e.getMessage());
    }
  }


  @GetMapping
    public List<Poll> getAllPolls(){
      return pollService.getAllPolls();
    }

  @GetMapping("/{id}")
  public ResponseEntity<Poll> getPolls(@PathVariable Long id){
    return pollService.getPollById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
  }
  //post
  //vote
  //->Service
  @PostMapping("/vote")
  public void vote(@RequestBody Vote vote){
    pollService.vote(vote.getPollId(),vote.getOptionIndex());
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<?> deletePoll(@PathVariable Long id) {
    pollService.deletePoll(id);
    return ResponseEntity.ok().build();
  }



}
