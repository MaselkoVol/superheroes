import { IsEmail } from 'class-validator';
import { ValidationErrorCode } from 'src/common/constants/error-codes.validation';
import { IsValidString } from 'src/common/decorators/is-valid-string.decorator';
import { validateOptions } from 'src/common/utils/validation.utils';
import { CreateDoctorCommand } from '../interfaces/create-doctor.command';

export class CreateDoctorDto implements CreateDoctorCommand {
  @IsValidString(2, 50, "Ім'я")
  firstName: string;

  @IsValidString(2, 50, 'Прізвище')
  lastName: string;

  @IsEmail(
    {},
    validateOptions({
      message: 'Некоректний формат електронної пошти',
      errorCode: ValidationErrorCode.INVALID_EMAIL,
    }),
  )
  email: string;

  @IsValidString(5, 50, 'Пароль')
  password: string;
}
