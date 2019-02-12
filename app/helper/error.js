export default class InputFormatError extends Error {
  constructor(args) {
    super(args);
    this.name = 'InputFormatError';
  }
}
