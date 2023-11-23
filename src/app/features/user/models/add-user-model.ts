export interface AddUserModel{

  username: string;
  email: string;
  phoneNumber: string;
  hobby: string;
  registerDate: Date;
  isVisible: boolean;


  skillset: string[];
  //remmeber the dto model? this reflects that, it was an array of GUID, naturally corresponds to string
}
