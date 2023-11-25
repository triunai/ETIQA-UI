export interface UpdateUserModel{

  username: string;
  email: string;
  phoneNumber: string;
  hobby: string;
  registerDate: Date;
  isVisible: boolean;
  profileImageUrl: string;



  skillset: string[];
  //remmeber the dto model? this reflects that, it was an array of GUID, naturally corresponds to string
}
