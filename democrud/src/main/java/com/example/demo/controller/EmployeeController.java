package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.services.EmployeeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping
	public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO dto){
		EmployeeDTO savedEmployee = employeeService.createEmployee(dto);
		return new ResponseEntity<>(savedEmployee,HttpStatus.CREATED);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable("id") Long employeeId){
		EmployeeDTO employeeDTO = employeeService.getEmployeeById(employeeId);
		return ResponseEntity.ok(employeeDTO); 
	}
	
	@GetMapping
	public ResponseEntity<List<EmployeeDTO>> getEmployee(){
		List<EmployeeDTO> employeeDTO = employeeService.getAll();
		return ResponseEntity.ok(employeeDTO); 
	}
	@PutMapping("{id}")
	public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable("id") Long employeeId,@RequestBody EmployeeDTO updateEmployee){
		EmployeeDTO employeeDTO = employeeService.updateEmployee(employeeId,updateEmployee);
		return ResponseEntity.ok(employeeDTO);
	}
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
		employeeService.deleteEmployee(employeeId);
		return ResponseEntity.ok("Employee deleted successfully");
	}
}
