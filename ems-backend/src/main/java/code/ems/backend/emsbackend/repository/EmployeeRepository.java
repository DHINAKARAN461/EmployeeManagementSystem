package code.logic.tamil.emsbackend.repository;

import code.logic.tamil.emsbackend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
}
