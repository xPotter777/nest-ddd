export class ResidentDTO {
  city: string;
  count: number;
  members?: { first_name: string; count: number }[];
}
