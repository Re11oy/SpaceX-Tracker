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

  @action
  loadNextLaunches = () => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}launches/past?limit=10&order=desc`)
      .then(data => data.json())
      .then(data => {
        this.launches = data;
        this.state = STATES.SUCCESS;
      })
      .catch(() => {
        this.state = STATES.ERROR;
      });
  };
}

export default new LaunchesStore();
