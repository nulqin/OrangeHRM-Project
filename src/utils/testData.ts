// Utility class for generating random and unique test data
export class TestDataGenerator {

  // Generate unique username with prefix and timestamp
  static generateUsername(prefix: string = 'testuser'): string {
    const timestamp = Date.now();
    return `${prefix}_${timestamp}`;
  }

  // Generate random uppercase string
  static generateRandomString(length: number = 8): string {
    return Math.random().toString(36).substring(2, length + 2).toUpperCase();
  }

  // Generate unique email address
  static generateEmail(): string {
    const timestamp = Date.now();
    return `testuser_${timestamp}@example.com`;
  }

  // Generate random password with mixed characters
  static generatePassword(length: number = 10): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '@#$%';
    
    let password = '';
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    
    const all = uppercase + lowercase + numbers + symbols;
    for (let i = password.length; i < length; i++) {
      password += all.charAt(Math.floor(Math.random() * all.length));
    }
    
    return password;
  }

  // Generate unique job title with timestamp
  static generateJobTitle(): string {
    const timestamp = Date.now();
    return `JobTitle_${timestamp}`;
  }
}
