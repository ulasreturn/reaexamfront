import { User } from "../user.model";

export class ContactRequest{
  subject?: string;
  body?: string;
  recepients?: string;
}