'use strict';

const { Device } = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');


class Vitrum1BSOnOffDevice extends ZwaveDevice {
  /**
   * onInit is called when the device is initialized.
   */
  async onNodeInit() {
    if (this.node.isMultiChannelNode) {
      await this.addCapability('onoff');
    }
    else {
      await this.removeCapability('onoff');
    }

    this.registerCapability('onoff', 'BASIC');
    this.registerReportListener('BASIC', 'BASIC_SET', ( rawReport, parsedReport ) => {
      if(rawReport.Value == 0)
        this.setCapabilityValue('onoff', false);
      else
        this.setCapabilityValue('onoff', true);
    });   


    this.log('Vitrum I OnOff BS has been initialized');
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    if (this.hasCapability('onoff')) {
      this.setCapabilityValue('onoff', false).catch(this.error);
    }
    this.log('Vitrum III has been added');
  }
}

module.exports = Vitrum1BSOnOffDevice;
