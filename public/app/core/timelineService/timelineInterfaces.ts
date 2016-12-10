import { GroupedTracks } from '@timeline/tracks';

export interface TimelineConfig {
  proximity: { days: number }
}

export interface Timeline {
  groups: GroupedTracks
}
