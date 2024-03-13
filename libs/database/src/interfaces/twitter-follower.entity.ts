export interface ITwitterFollower {
  id: number;
  gameId: string,
  followerCount: number,
  followerList: Array<string>,
  newList: Array<string>,
  removedList: Array<string>,
  updateAt: Date;
}
