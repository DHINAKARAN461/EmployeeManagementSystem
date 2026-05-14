package code.logic.tamil.emsbackend.dto;

import lombok.*;

//@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

}
