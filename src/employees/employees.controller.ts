import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
// import { request } from 'http';
import { EmployeesService } from './employees.service';
import { Employee, EmployeeTier } from './Employee.model';
import { EmployeeSearchDto } from './EmployeeSearch.dto';
import { EmployeeUpdateDto } from './EmployeeUpdate.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  getAllEmployees(@Query() param: EmployeeSearchDto) {
    if (Object.keys(param).length) {
      // console.log(param);
      // console.log('Filter');
      return this.employeeService.employeeSearch(param);
    } else {
      // console.log('No Filter');
      return this.employeeService.getAllEmployees();
    }
  }

  @Post()
  createEmployee(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('designation') designation: string,
    @Body('nearestCity') nearestCity: string,
    @Body('tier') tier: EmployeeTier,
  ) {
    return this.employeeService.createEmployee(
      firstName,
      lastName,
      designation,
      nearestCity,
      tier,
    );
  }

  @Get('/:id')
  getEmplpoyeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(id);
  }

  @Put('/:id/city')
  updateEmployee(
    @Param('id') id: string,
    @Body() employeeUpdateDto: EmployeeUpdateDto,
  ) {
    employeeUpdateDto.id = id;
    return this.employeeService.updateEmployee(employeeUpdateDto);
  }

  @Delete('/:id')
  deleteEmployee(@Param('id') id: string) {
    this.employeeService.deleteEmployee(id);
  }
}
