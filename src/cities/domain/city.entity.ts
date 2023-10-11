export class City {
  constructor(public name: string) {}
}

export class Resident {
  constructor(public firstName: string, public city: City) {}
}