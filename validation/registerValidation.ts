type RegisterData = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  countryOfBirth?: string;
  cityOfResidence?: string;
  career?: string;
  university?: string;
  dateOfBirth?: string; // en formato ISO (ej. '1995-04-20')
};

type ValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof RegisterData, string>>;
};

export function validateRegisterData(data: RegisterData): ValidationResult {
  const errors: Partial<Record<keyof RegisterData, string>> = {};

  // Email
  if (!data.email) {
    errors.email = 'El email es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'El email no tiene un formato válido.';
  }

  // Password
  if (!data.password) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (data.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  // Name
  if (!data.name?.trim()) {
    errors.name = 'El nombre es obligatorio.';
  }

  // Last Name
  if (!data.lastName?.trim()) {
    errors.lastName = 'El apellido es obligatorio.';
  }

  // Optional strings
  if (data.countryOfBirth !== undefined && !data.countryOfBirth.trim()) {
    errors.countryOfBirth = 'El país de nacimiento no puede estar vacío.';
  }

  if (data.cityOfResidence !== undefined && !data.cityOfResidence.trim()) {
    errors.cityOfResidence = 'La ciudad de residencia no puede estar vacía.';
  }

  if (data.career !== undefined && !data.career.trim()) {
    errors.career = 'La carrera no puede estar vacía.';
  }

  if (data.university !== undefined && !data.university.trim()) {
    errors.university = 'La universidad no puede estar vacía.';
  }

  // Date of birth (opcional)
  if (data.dateOfBirth !== undefined) {
    const date = new Date(data.dateOfBirth);
    if (isNaN(date.getTime())) {
      errors.dateOfBirth = 'La fecha de nacimiento no es válida.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}