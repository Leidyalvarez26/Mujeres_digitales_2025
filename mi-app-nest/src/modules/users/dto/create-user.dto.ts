import { IsEmail, IsNotEmpty, IsString, IsInt, Min, MinLength, MaxLength, Matches } from 'class-validator'; // Importa los validadores necesarios

// Define la clase CreateUserDto con reglas de validación
export class CreateUserDto { // Clase para crear un nuevo usuario
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt() // Asegura que el campo sea un número entero
  @Min(0, { message: 'La edad no puede ser negativa' })
  @Min(18, { message: 'La edad debe ser mayor de 18 años' })// Asegura que la edad mínima sea 18
  age: number;

  @IsNotEmpty()
  @IsString()
  //@MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' }) // Asegura que la contraseña tenga al menos 6 caracteres
  //@MaxLength(10, { message: 'La contraseña no puede tener más de 10 caracteres' }) // Asegura que la contraseña no exceda los 10 caracteres
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/, {
  message:
    'La contraseña debe tener entre 6 y 10 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial',
})
  password: string;
}
