import { LaunchesStore } from './LaunchesStore';
import { NewsStore } from './NewsStore';

export interface IObservableStoreProps {
  launches: LaunchesStore;
  news: NewsStore;
}
