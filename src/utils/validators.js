// src/utils/validators.js
export function getErrorMessage(fieldName, errorType) {
  const messages = {
    required: `${fieldName} is required.`,
    numeric: `${fieldName} must be a number.`,
    float: `${fieldName} must be a positive float.`,
    invalidImageUrl: `${fieldName} must be a valid URL.`
  };
  return messages[errorType] || 'Invalid input.';
}
