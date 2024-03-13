export interface IWallPost {
  id: string;
  title: string;
  description: string;
  assets: IWallPostAsset[];
  sourceType: string;
  gameId?: string;
  score: number;
  postedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWallPostAsset {
  assetType:
    | 'author'
    | 'thread'
    | 'referencedMessage'
    | 'component'
    | 'embed'
    | 'attachment'
    | 'media'
    | 'profile'
    | 'twitterSpace'
    | 'retweet'
    | 'link'
    | 'sourceLink';
  data: Author | Media | TwitterSpace | TwitterRetweet | Link | any;
}

export interface Author {
  id: string;
  username?: string;
  discriminator?: string;
  profileImageUrl?: string;
  displayName?: string;
  profileUrl?: string;
}

export interface TwitterSpace {
  id: string;
  scheduledStart: Date;
  state: 'live' | 'scheduled' | 'ended';
  participantCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  url?: string;
}

export interface TwitterRetweet {
  id: string;
  author: Author;
  description: string;
  media: Media[];
  url?: string;
}

export interface Media {
  url: string;
  type: 'image' | 'video';
  filename?: string;
  width?: number;
  height?: number;
  contentType?: string;
  previewUrl?: string;
  provider?: string; // youtube | twitch
}

export interface Link {
  url: string;
  previewImageUrl?: string;
  title?: string;
  description?: string;
}
