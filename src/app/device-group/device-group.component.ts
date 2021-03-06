import { Component, OnInit, Input } from '@angular/core';
import { Device_Group, Device } from 'model';
import { Action } from 'store/action';

@Component({
  selector: 'cb-device-group',
  templateUrl: './device-group.component.html',
  styleUrls: ['./device-group.component.scss']
})
export class DeviceGroupComponent implements OnInit {
  @Input() summaryMode: boolean;
  @Input() deviceGroup: Device_Group;
  showDownArrow: boolean;
  isGrpChecked: boolean;
  constructor(private action: Action) { }

  ngOnInit() {
    this.deviceGroup.active =+(this.deviceGroup.devices.find(i => i.active == 0) == null);this.deviceGroup.active =+(this.deviceGroup.devices.find(i => i.active == 0) == null);
  }

  get arrowClass() {
    return {
      'arrow-down': this.showDownArrow,
      'arrow-up': !this.showDownArrow,
    }
  }

  onGroupChk(checked: boolean, device_group: Device_Group) {
    this.deviceGroup.active = +checked;
    this.deviceGroup.devices.forEach(item => {
      this.onItemChk(checked, item, this.deviceGroup)
    })
    componentHandler.upgradeDom();
  }

  onItemChk(checked: Boolean, device: Device, device_group: Device_Group) {
    this.action.updateDevice(device, device_group, +checked)
    this.isGrpChecked = this.deviceGroup.devices.find(i => i.active == 0) == null;
    componentHandler.upgradeDom();
  }

}
