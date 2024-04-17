/* eslint-disable no-unused-vars */
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export class TryCatchError {
  catchError(error: any, item: string, uniqueField: string, action: string) {
    // console error for development
    if (process.env.NODE_ENV === 'test') console.log(error);

    if (
      error instanceof QueryFailedError &&
      error.message.includes('duplicate key value')
    ) {
      throw new HttpException(
        `${item} with that ${uniqueField} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      error instanceof QueryFailedError &&
      error.message.includes('invalid input syntax for type uuid')
    ) {
      throw new HttpException(
        'Invalid Ids detected: One or more of the supplied ids does not exist or is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (error instanceof HttpException) throw error;

    if (error instanceof NotFoundException) throw error;

    throw new HttpException(
      `An error occured while ${action} ${item}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
