'use server';

import { IFormStatusState } from './interface';

export async function handleSubmit(
  prevState: IFormStatusState,
  formData: FormData
): Promise<IFormStatusState> {
  // Initialize an error object to collect validation errors
  const errors: IFormStatusState['error'] = {};

  const email = formData.get('email');
  const gmailRegex =
    /^[a-zA-Z0-9]+([\.{1}])?[a-zA-Z0-9]+@(?:gmail|GMAIL)\.(?:com|COM)$/g;
  if (!email || !gmailRegex.test(email.toString())) {
    errors.email = 'Please enter a valid Gmail address';
  }

  const fname = formData.get('fname');
  if (!fname || fname.toString().length < 3) {
    errors.fname = 'First name must be at least 3 characters long';
  }

  const phone = formData.get('phone')?.toString();
  const phoneRegex = /^\+?[0-9]\d{1,11}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  const password = formData.get('password')?.toString();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    errors.password =
      'Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter';
  }

  const jobLocation = formData.get('jobLocation');
  if (
    !jobLocation ||
    (jobLocation !== 'remote' && jobLocation !== 'in-office')
  ) {
    errors.jobLocation = 'Please select a preferred job location';
  }

  const languages = formData.getAll('languages');
  if (!languages || languages.length === 0) {
    errors.languages = 'Please select at least one language';
  }

  const jobRole = formData.get('jobRole');
  if (!jobRole || jobRole.toString().trim() === '') {
    errors.jobRole = 'Please select your job role';
  }

  const interest = formData.get('interested');
  if (!interest) {
    errors.interest = 'Please enable your interest';
  }

  // If there are any validation errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Form values are not valid',
      error: errors,
    };
  }

  // If validation passes, proceed with form processing
  return {
    success: true,
    message: 'Form successfully submitted',
  };
}
