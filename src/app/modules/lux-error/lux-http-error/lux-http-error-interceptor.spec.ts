import { LuxHttpErrorInterceptor } from './lux-http-error-interceptor';

describe('LuxHttpErrorInterceptor', () => {
  describe('extractErrors', () => {
    it('should return errors when error object has errors property', () => {
      const error = { errors: ['error1', 'error2'] };
      const result = LuxHttpErrorInterceptor.extractErrors(error);
      expect(result).toEqual(['error1', 'error2']);
    });

    it('should return violations when error object has violations property', () => {
      const error = { violations: ['violation1', 'violation2'] };
      const result = LuxHttpErrorInterceptor.extractErrors(error);
      expect(result).toEqual(['violation1', 'violation2']);
    });

    it('should return an empty array when error object has neither errors nor violations property', () => {
      const error = { message: 'Some error message' };
      const result = LuxHttpErrorInterceptor.extractErrors(error);
      expect(result).toEqual([]);
    });

    it('should return an empty array when error is not an object', () => {
      const error = 'Some error message';
      const result = LuxHttpErrorInterceptor.extractErrors(error);
      expect(result).toEqual([]);
    });

    it('should return an empty array when error is null', () => {
      const error = null;
      const result = LuxHttpErrorInterceptor.extractErrors(error);
      expect(result).toEqual([]);
    });

    it('should return an empty array when error is undefined', () => {
      const error = undefined;
      const result = LuxHttpErrorInterceptor.extractErrors(error);
      expect(result).toEqual([]);
    });
  });
});
