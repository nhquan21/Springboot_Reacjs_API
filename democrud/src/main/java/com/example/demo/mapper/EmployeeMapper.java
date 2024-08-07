package com.example.demo.mapper;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.models.Employee;

public class EmployeeMapper{
	public static EmployeeDTO mapToEployeeDTO(Employee employee) {
		return new EmployeeDTO(
			employee.getId(),
			employee.getFirstName(),
			employee.getLastName(),
			employee.getEmail()
		);
	}
	
	public static Employee mapToEmployee(EmployeeDTO dto) {
		return new Employee(
			dto.getId(),
			dto.getFirstName(),
			dto.getLastName(),
			dto.getEmail()
		);
	}

}
