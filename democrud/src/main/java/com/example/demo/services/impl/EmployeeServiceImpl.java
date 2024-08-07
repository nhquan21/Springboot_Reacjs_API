package com.example.demo.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.mapper.EmployeeMapper;
import com.example.demo.models.Employee;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.services.EmployeeService;

import com.example.demo.exception.ResourceNotFoundException;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	@Autowired
	private EmployeeRepository employeeRepository;
	@Override
	public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
		Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEployeeDTO(savedEmployee);
	}
	@Override
	public EmployeeDTO getEmployeeById(Long id) {
		// TODO Auto-generated method stub
		Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given id : "+id));
		return EmployeeMapper.mapToEployeeDTO(employee);

	}
	@Override
	public List<EmployeeDTO> getAll() {
		List<Employee> employee = employeeRepository.findAll();
		return employee.stream().map((e)-> EmployeeMapper.mapToEployeeDTO(e)).collect(Collectors.toList());
		
	}

	@Override
	public EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO updaEmployeeDTO) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with given id:"+employeeId));
		employee.setFirstName(updaEmployeeDTO.getFirstName());
		employee.setLastName(updaEmployeeDTO.getLastName());
		employee.setEmail(updaEmployeeDTO.getEmail());
		Employee updaEmployeeObj = employeeRepository.save(employee);
		return EmployeeMapper.mapToEployeeDTO(updaEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with given id:"+employeeId));
		employeeRepository.deleteById(employeeId);
	}
}
	


