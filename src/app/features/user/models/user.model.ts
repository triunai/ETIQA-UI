import { Skillset } from "../../skillset/models/skillset.model";

export interface User {
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
  hobby: string;
  registerDate: Date;
  isVisible: boolean;
  profileImageUrl: string;

  // linking models together
  skillset: Skillset[];
}
