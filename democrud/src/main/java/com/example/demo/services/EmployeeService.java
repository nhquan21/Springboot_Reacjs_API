package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.EmployeeDTO;

public interface EmployeeService {
	EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
	
	EmployeeDTO getEmployeeById(Long id);
	
	List<EmployeeDTO> getAll();

	EmployeeDTO updateEmployee(Long employeeId,EmployeeDTO updaEmployeeDTO);

	void deleteEmployee(Long employeeId);
}
