import React from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map } from 'react-yandex-maps';
import './Map.css';

const propTypes = {}
const defaultProps = {}

export class MapComponent extends React.Component {
    render() {
        return (
            <YMaps>
                <Map className="map" defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
            </YMaps>
        )
    }
}

MapComponent.defaultProps = defaultProps
MapComponent.propTypes = propTypes
MapComponent.displayName = 'MapComponent'
