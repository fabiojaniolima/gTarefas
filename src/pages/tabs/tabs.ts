import { Component } from '@angular/core';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  allTasksRoot = 'AllTasksPage';
  settingsRoot = 'SettingsPage';

  constructor() {}

}
