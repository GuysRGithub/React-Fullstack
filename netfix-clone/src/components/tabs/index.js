import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TabDoor from "../tabs_nav/TabDoor";
import "../../puplicStyle/TabsNav.css";
import TabDevice from "../tabs_nav/TabDevice";
import TabPrice from "../tabs_nav/TabPrice";
import TabDoorContent from "../tab_content/TabDoorContent";
import TabDeviceContent from "../tab_content/TabDeviceContent/TabDeviceContent";
import TabPriceContent from "../tab_content/TabPriceContent/TabPriceContent";
class TabComponent extends Component {
  state = {
    tabIndex: 0,
  };
  render() {
    return (
      <div>
        <Tabs
          className="tabs"
          selectedIndex={this.state.tabIndex}
          onSelect={(tabIndex) => this.setState({ tabIndex })}
        >
          <TabList className="tab-nav-list">
            <Tab className={this.state.tabIndex === 0 ? "active" : null}>
              <TabDoor />
              <p>
                <strong>
                  No commitments <br />
                  Cancel anywhere
                </strong>
              </p>
              <span className="mdScreen">Cancel</span>
            </Tab>
            <Tab className={this.state.tabIndex === 1 ? "active" : null}>
              <TabDevice />
              <p style={{ marginTop: "-5.3125rem" }}>
                <strong>Watch anywhere</strong>
              </p>
              <span className="mdScreen">Devices</span>
            </Tab>
            <Tab className={this.state.tabIndex === 2 ? "active" : null}>
              <TabPrice />
              <p>
                <strong>Pick Your Price</strong>
              </p>
              <span className="mdScreen">Prices</span>
            </Tab>
          </TabList>
          <TabPanel>
            <TabDoorContent />
          </TabPanel>
          <TabPanel>
            <TabDeviceContent />
          </TabPanel>
          <TabPanel>
            <TabPriceContent />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default TabComponent;
