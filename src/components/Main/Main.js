import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import MapIcon from '@material-ui/icons/Map';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import './Main.css';
import { MapComponent } from '../Map/Map';

const propTypes = {}
const defaultProps = {}

export class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            navigationTab: 'MAP'
        }
    }

    handelNavigationTabChange = (event, newValue) => {
        this.setState({ navigationTab: newValue });
    }

    render() {
        const { navigationTab } = this.state

        return (
            <div className="main">
                <div>
                    <BottomNavigation
                        value={navigationTab}
                        onChange={this.handelNavigationTabChange}
                        className="navigation-tabs"
                    >
                        <BottomNavigationAction value="FAVORITE" icon={<BookmarksIcon />} />
                        <BottomNavigationAction value="MAP" icon={<MapIcon />} />
                        <BottomNavigationAction value="ROUTER" icon={<SwapCallsIcon />} />
                    </BottomNavigation >
                </div>
                <div>
                    {navigationTab === 'MAP' && (
                        <MapComponent />
                    )}
                </div>
            </div >
        )
    }
}

MainComponent.defaultProps = defaultProps
MainComponent.propTypes = propTypes
MainComponent.displayName = 'MainComponent'
