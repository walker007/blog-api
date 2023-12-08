import * as bcrypt from "bcrypt";

export class PasswordEncoder {
  private readonly saltRounds = 16;

  async encode(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async matches(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
