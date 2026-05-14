package code.logic.tamil.emsbackend.service;

import code.logic.tamil.emsbackend.dto.EmployeeDto;
import code.logic.tamil.emsbackend.entity.Employee;
import code.logic.tamil.emsbackend.exception.ResourceNotFoundException;
import code.logic.tamil.emsbackend.mapper.EmployeeMapper;
import code.logic.tamil.emsbackend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceIMPL implements EmployeeService{

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee createEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(createEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee =employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee id not exists with given id: "+employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees =employeeRepository.findAll();
        return employees.stream().map((employee -> EmployeeMapper.mapToEmployeeDto(employee))).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
     Employee employee =employeeRepository.findById(employeeId).orElseThrow(
             ()->new ResourceNotFoundException("Not found can't update this id : "+employeeId));
     employee.setFirstName(updateEmployee.getFirstName());
     employee.setLastName(updateEmployee.getLastName());
     employee.setEmail(updateEmployee.getEmail());
     Employee updatedEmployee = employeeRepository.save(employee);
     return EmployeeMapper.mapToEmployeeDto(updatedEmployee);

    }

    @Override
    public void deleteEmployee(Long employeeId) {
        employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Id not matched "));
        employeeRepository.deleteById(employeeId);
    }
}
