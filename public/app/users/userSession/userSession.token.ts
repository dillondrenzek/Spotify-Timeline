export class UserSessionToken {
  constructor(
    public access: string,
	  public refresh: string
  ) {}

  static access_token_key: string = "access_token";
  static refresh_token_key: string = "refresh_token";


  get valid(): boolean {
    return (!!this.access && !!this.refresh);
  }
}
