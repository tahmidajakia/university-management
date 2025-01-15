import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethod,
  StudentModel,
  TUserName,
} from './student/student.interface';

// Define the schema for the user's name
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    maxlength: [20, 'First name cannot be more than 20 character'],
    required: [true, 'First name is required.'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capital format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
});

// Define the schema for the guardian's details
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

// Define the schema for the local guardian details
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  contact: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
});

// Define the schema for the student details
const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        'Gender must be one of the following values: male, female, or other.',
    },
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        'Blood group must be one of the following values: A+, A-, B+, B-, AB+, AB-, O+, O-.',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian details are required.'],
  },
  profileImg: {
    type: String,
    default: 'https://example.com/default-profile.png',
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: 'Status must be one of the following values: active, blocked.',
    },
    default: 'active',
  },
});

studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// Create the model for the student schema
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
