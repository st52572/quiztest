package st52572.nnpia.quizer.service;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.testutil.Creator;



@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    /*@Autowired
    IssueService issueService;

    @Autowired
    IssueRepository issueRepository;*/

    @Autowired
    Creator creator;


    @Test
    public void testDeleteUsersIssues() {
        User assignee = (User) creator.saveEntity(new User());

/*
        Issue issue1 = new Issue();
        issue1.setAssignee(assignee);
        Issue issue2 = new Issue();
        issue2.setAssignee(assignee);

        creator.saveEntities(issue1, issue2);

        Assertions.assertEquals(2, issueRepository.findAll().size());

        Long assigneeId = issue1.getAssignee().id;
        issueService.deleteUsersIssues(assigneeId);
        Assertions.assertEquals(0, issueRepository.findAll().size());*/
    }
}
