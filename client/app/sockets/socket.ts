export class Socket {
  _id: string;
  name: string;
  status: boolean;
  numbering: string;

  constructor(
    _id: string,
    name: string = "",
    status: boolean = false,
    numbering: string = ""
  ) {
    this._id = _id;
    this.name = name;
    this.status = status;
    this. numbering = numbering;
  }
}
