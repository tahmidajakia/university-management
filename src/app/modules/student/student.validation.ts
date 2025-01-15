import { z } from 'zod';

// User Name Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: '{VALUE} is not in capital format',
      },
    ),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required."),
  fatherOccupation: z.string().min(1, "Father's occupation is required."),
  fatherContactNo: z.string().min(1, "Father's contact number is required."),
  motherName: z.string().min(1, "Mother's name is required."),
  motherOccupation: z.string().min(1, "Mother's occupation is required."),
  motherContactNo: z.string().min(1, "Mother's contact number is required."),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required."),
  occupation: z.string().min(1, "Local guardian's occupation is required."),
  contact: z.string().min(1, "Local guardian's contact number is required."),
  address: z.string().min(1, "Local guardian's address is required."),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z
    .string()
    .min(1, 'Student ID is required')
    .max(100, 'Student ID cannot exceed 100 characters'),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({
      message:
        'Gender must be one of the following values: male, female, or other.',
    }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email('Please provide a valid email address')
    .min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact number is required.'),
  emergencyContactNo: z
    .string()
    .min(1, 'Emergency contact number is required.'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({
      message:
        'Blood group must be one of the following values: A+, A-, B+, B-, AB+, AB-, O+, O-.',
    }),
  }),
  presentAddress: z.string().min(1, 'Present address is required.'),
  permanentAddress: z.string().min(1, 'Permanent address is required.'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z
    .string()
    .url()
    .optional()
    .default('https://example.com/default-profile.png'),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({
        message: 'Status must be one of the following values: active, blocked.',
      }),
    })
    .default('active'),
});

export default studentValidationSchema;
