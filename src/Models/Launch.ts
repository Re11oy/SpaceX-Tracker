export default class Launch {
  mission_name: string;
  details: string;
  launch_date_unix?: number;
  rocket: {
    rocket_name: string;
  };
  launch_site: {
    site_name: string;
  };
  links: {
    mission_patch_small: string;
  };
}
