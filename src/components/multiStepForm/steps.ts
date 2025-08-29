import { FormStep } from './types';

export const defaultFormSteps: FormStep[] = [
  {
    id: 'contact',
    title: "What's your contact info?",
    subtitle: "We'll use this info to get in touch",
    fields: [
      { name: 'firstName', label: 'First name', type: 'text', required: true },
      { name: 'lastName', label: 'Last name', type: 'text', required: true },
      { name: 'phone', label: 'Phone number', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true }
    ]
  },
  {
    id: 'specialties',
    title: 'What are your specialties?',
    subtitle: 'Select the services you provide',
    type: 'checkbox',
    options: [
      'Mental Health',
      'Weight Loss',
      'Primary Care',
      'Dermatology',
      'Other'
    ]
  },
  {
    id: 'practice',
    title: 'Can you see patients independently?',
    subtitle: 'Tell us about your practice autonomy',
    type: 'radio',
    options: [
      'Yes, I have full practice autonomy and can see patients independently',
      'Yes, I can see patients independently but in collaboration with a supervising physician',
      'No, I do not have the authorization to see patients independently'
    ]
  },
  {
    id: 'experience',
    title: 'Tell us about your experience',
    subtitle: 'Help us understand your background',
    fields: [
      { name: 'yearsExperience', label: 'Years of Experience', type: 'number', required: true },
      { name: 'specialization', label: 'Primary Specialization', type: 'text', required: true }
    ]
  },
  {
    id: 'model',
    title: 'Are you interested in our pay-per-appointment model?',
    subtitle: 'Choose your preferred engagement model',
    type: 'radio',
    options: [
      'Yes, I\'m interested in joining',
      'Maybe, I need more information',
      'No, this model doesn\'t work for me'
    ]
  }
];