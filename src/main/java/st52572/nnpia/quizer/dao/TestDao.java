package st52572.nnpia.quizer.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import st52572.nnpia.quizer.model.Test;

@Repository
public interface TestDao extends PagingAndSortingRepository<Test, Long> {

    //Page<Test> findByName(String name, Pageable pageable);

    Page<Test> findByNameIsLike(String name, Pageable pageable);

    Page<Test> findByUser_Id(int id, Pageable pageable);

    Page<Test> findByUser_IdAndNameIsLike(int id, String name, Pageable pageable);

    void deleteById(int id);
}
