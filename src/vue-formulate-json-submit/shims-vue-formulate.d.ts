export interface IVueFormulate {
  /**
   * Used to submit a form programmatically.
   * @param formName
   */
  submit(formName: string);

  /**
   * Reset all validation and error messages.
   * @param formName
   */
  resetValidation(formName);
}
