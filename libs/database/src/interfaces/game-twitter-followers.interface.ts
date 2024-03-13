export interface IGameTwitterFollowersRawData {
  id: string;
  gameId: string;
  followerCount: number;
  followerList: string[];
  newList: string[];
  removeList: string[];
  updateAt:Date
}
