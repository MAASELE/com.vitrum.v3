'use strict';

const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class Vitrum4OnOffDevice extends ZwaveDevice {
  /**
   * onNodeInit is called when the device is initialized.
   */
  async onNodeInit() {
    if (this.node.isMultiChannelNode) {
      await this.addCapability('onoff');
      this.registerCapability('onoff', 'BASIC');
      this.registerReportListener('BASIC', 'BASIC_SET', ( rawReport, parsedReport ) => {
        if(rawReport.Value == 0)
          this.setCapabilityValue('onoff', false);
        else
          this.setCapabilityValue('onoff', true);
      });   
    }
    else {
      await this.removeCapability('onoff');
    }
    
    this.log('Vitrum IV Device has been initialized');
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

module.exports = Vitrum4OnOffDevice;
