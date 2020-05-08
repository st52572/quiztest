package st52572.nnpia.quizer.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "test")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Test implements Serializable {
    @Id
    @GeneratedValue
    private int id;

    @Column
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "test", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Question> questions;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

}

