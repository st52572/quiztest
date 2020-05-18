package st52572.nnpia.quizer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestDto {

    private int id;

    private String name;

    private String tag;

    private User user;

    private List<Question> questions;
}
