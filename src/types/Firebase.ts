export class FirebaseData {
  ctimestamp!: number;
  utimestamp!: number;
  dtimestamp!: number;
  requestCount!: number;
  updateCount!: number;
  creatorId!: string;
  ownerId!: string;
  constructor(
    ctimestamp = Date.now(),
    utimestamp = 0,
    dtimestamp = 0,
    requestCount = 0,
    updateCount = 0,
    creatorId = "",
    ownerId = ""
  ) {
    this.ctimestamp = ctimestamp;
    this.utimestamp = utimestamp;
    this.dtimestamp = dtimestamp;
    this.requestCount = requestCount;
    this.updateCount = updateCount;
    this.creatorId = creatorId;
    this.ownerId = ownerId;
  }
}
export class FirebasePageData {}
