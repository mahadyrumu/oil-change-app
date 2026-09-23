import { submitContactForm } from '@/lib/actions/contact';

describe('Contact Actions', () => {
  it('returns errors on invalid input', async () => {
    const formData = new FormData();
    const result = await submitContactForm(null, formData);
    
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('returns success on valid input', async () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('subject', 'Hello world');
    formData.append('message', 'This is a long enough message to pass validation');

    const result = await submitContactForm(null, formData);
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('Thank you');
  });
});
