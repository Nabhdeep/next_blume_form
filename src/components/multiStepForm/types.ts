export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'password';
  required: boolean;
  placeholder?: string;
}

export interface FormStep {
  id: string;
  title: string;
  subtitle: string;
  type?: 'checkbox' | 'radio';
  fields?: FormField[];
  options?: string[];
}

export interface FormData {
  [stepId: string]: any;
}

export interface MultiStepFormProps {
  onComplete?: (data: FormData) => void;
  customSteps?: FormStep[];
  className?: string;
}