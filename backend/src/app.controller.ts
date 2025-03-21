import { Controller, Get } from '@nestjs/common';
import { Api, IApi } from './api';
import { ApiOperation } from '@nestjs/swagger';

@Controller('')
export class AppController {
  constructor() {}
  @ApiOperation({
    summary: 'Get API properties',
  })
  @Get()
  getHello(): IApi {
    return Api;
  }
}
