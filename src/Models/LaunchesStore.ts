import { observable, computed, action } from 'mobx';
import Launch from './Launch';
import { API_URL } from '../../cfg';
import { STATES } from '../constants';

export class LaunchesStore {
  @observable
  upcomingLaunches: Launch[] = [];

  @observable
  pastLaunches: Launch[] = [];

  @observable
  state = STATES.IDLE;

  @computed
  get upcomingLaunch() {
    return this.upcomingLaunches.length > 0 && this.upcomingLaunches[0];
  }

  @computed
  get numberOfUpcomingLaunches() {
    return this.upcomingLaunches.length || 0;
  }

  @computed
  get numberOfPastLaunches() {
    return this.pastLaunches.length || 0;
  }

  @action
  loadLaunches = (numberOfLaunches = 10, upcoming = true) => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}launches/${upcoming ? 'upcoming' : 'past'}?limit=${numberOfLaunches}`)
      .then(data => data.json())
      .then(data => {
        if (upcoming) {
          this.upcomingLaunches = data;
        } else {
          this.pastLaunches = data;
        }
        this.state = STATES.SUCCESS;
      })
      .catch(() => {
        this.state = STATES.ERROR;
      });
  };

  @action
  loadMoreLaunches = (numberOfLaunches = 10, upcoming = true) => {
    this.state = STATES.LOADING;
    const offset = upcoming ? this.upcomingLaunches.length : this.pastLaunches.length;
    fetch(`${API_URL}launches/${upcoming ? 'upcoming' : 'past'}?limit=${numberOfLaunches}&offset=${offset}`)
      .then(data => data.json())
      .then(data => {
        if (upcoming) {
          this.upcomingLaunches = this.upcomingLaunches.concat(data);
        } else {
          this.pastLaunches = this.pastLaunches.concat(data);
        }
        this.state = STATES.SUCCESS;
      })
      .catch(() => {
        this.state = STATES.ERROR;
      });
  };
}

export default new LaunchesStore();
