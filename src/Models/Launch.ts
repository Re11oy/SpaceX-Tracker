export default class Launch {
  mission_name: string;
  details: string;
  launch_date_unix?: number;
  rocket: {
    rocket_name: string;
  };
  launch_site: {
    site_name_long: string;
    site_name: string;
  };
  links: {
    video_link: string;
    mission_patch_small: string;
  };
  launch_date_utc: string;
  launch_success: boolean;
  static_fire_date_utc: string;
  launch_date_local: string;
}
