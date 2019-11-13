import { observable, computed, action } from 'mobx';
import Launch from './Launch';
import { API_URL } from '../../cfg';
import { STATES } from '../constants';

export class LaunchesStore {
  @observable
  launches: Launch[] = [];

  @observable
  state = STATES.IDLE;

  @computed
  get upcomingLaunch() {
    return this.launches.length > 0 && this.launches[0];
  }

  @computed
  get numberOfLaunches() {
    return this.launches.length || 0;
  }

  @action
  loadNextLaunches = (numberOfLaunches = 10) => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}launches/upcoming?limit=${numberOfLaunches}`)
      .then(data => data.json())
      .then(data => {
        this.launches = data;
        this.state = STATES.SUCCESS;
      })
      .catch(() => {
        this.state = STATES.ERROR;
      });
  };

  @action
  loadMoreLaunches = (numberOfLaunches = 10) => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}launches/upcoming?limit=${numberOfLaunches}&offset=${this.launches.length}`)
      .then(data => data.json())
      .then(data => {
        this.launches = this.launches.concat(data);
        this.state = STATES.SUCCESS;
      })
      .catch(err => {
        this.state = STATES.ERROR;
      });
  };
}

export default new LaunchesStore();
