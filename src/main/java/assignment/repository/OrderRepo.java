package assignment.repository;

import assignment.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order, String>{
    List<Order> findAllByUseridContains(String user);
}
