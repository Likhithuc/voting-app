package com.voting.voting_app.services;


import com.voting.voting_app.model.OptionVote;
import com.voting.voting_app.model.Poll;
import com.voting.voting_app.repositories.PollRepositories;
import com.voting.voting_app.request.Vote;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    private PollRepositories pollRepositories;
    public PollService(PollRepositories pollRepositories) {
        this.pollRepositories = pollRepositories;
    }
  public Poll createPoll(Poll poll){
      poll.setId(null);
        return pollRepositories.save(poll);
  }

  public List<Poll> getAllPolls(){
        return pollRepositories.findAll();
  }

  public Optional<Poll> getPollById(Long id){
        return pollRepositories.findById(id);

  }
  public void vote(Long pollIds,int optionIndex){
        //Get Poll from DB
      Poll poll=pollRepositories.findById(pollIds)
              .orElseThrow(()-> new RuntimeException("Poll Not Found"));
        //Get All Options
      List<OptionVote> options=poll.getOptions();
       //if index is not valid ,throw Error
      if(optionIndex<0||optionIndex>=options.size()){
          throw new IllegalArgumentException("Invalid Option Index");
      }
        //Get Selected Option
      OptionVote SelectedOption=options.get(optionIndex);
        //Increment the vote for slected for selected option
      SelectedOption.setVoteCount(SelectedOption.getVoteCount()+1);
        //save incremented vote option into the DB
          pollRepositories.save(poll);
  }
    public void deletePoll(Long id) {
        pollRepositories.deleteById(id);
    }

}
