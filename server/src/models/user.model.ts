export default class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly role: 'USER'|'ADMIN'|'SUBADMIN',
    public readonly password: string,
    public readonly profileImg?: string|null,
    public readonly mobile?: string|null
  ) {}
}
