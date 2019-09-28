import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import MapIcon from '@material-ui/icons/Map';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import './Main.css';

import { MapComponent } from '../Map/Map';
import TripSelector from '../TripSelector';

const propTypes = {}
const defaultProps = {}

const tileData = [
	{
		img: 'http://vandrouka.by/wp-content/uploads/2012/11/Mogilev.jpg',
		name: 'Ratusha',
		distance: 1250,
		likes: 46
	},
	{
		name: 'Maslennikov Museum',
    img: 'http://photos.wikimapia.org/p/00/01/89/87/00_big.jpg',
		distance: 390,
		likes: 19,
	},
	{
		name: 'The Skywatcher',
    img: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fbelarusfacts.by%2Fupload%2Fphotos%2Fphoto_about%2Fp7200004_1.jpg&f=1&nofb=1',
		distance: 180,
		likes: 28,
	}
]

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
                <div className="navigation-tabs">
                    <BottomNavigation
                        value={navigationTab}
                        onChange={this.handelNavigationTabChange}
                    >
                        <BottomNavigationAction value="FAVORITE" icon={<BookmarksIcon />} />
                        <BottomNavigationAction value="MAP" icon={<MapIcon />} />
                        <BottomNavigationAction value="ROUTER" icon={<SwapCallsIcon />} />
                    </BottomNavigation >
                </div>
                <div className={navigationTab === 'MAP' ? 'map-container' : ''}>
                    {navigationTab === 'MAP' && (
                        <MapComponent />
                    )}
										{navigationTab === 'FAVORITE' && (
												<TripSelector tripData={tileData} />
										)}
                </div>
            </div >
        )
    }
}

MainComponent.defaultProps = defaultProps
MainComponent.propTypes = propTypes
MainComponent.displayName = 'MainComponent'
