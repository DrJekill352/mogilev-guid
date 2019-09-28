import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Accessible from '@material-ui/icons/Accessible';
import { app } from '../../firebase'
import './Home.css';


const propTypes = {}
const defaultProps = {}

export class HomeComponent extends React.Component {

    componentDidMount() {
        const firebaseRows = app.firestore().collection('test');
        firebaseRows.onSnapshot(snapshot => {
            snapshot.docs.forEach(d => console.log('TTT', d.data()))
        })
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
                <Accessible />
            </div>
        )
    }
}

HomeComponent.defaultProps = defaultProps
HomeComponent.propTypes = propTypes
HomeComponent.displayName = 'HomeComponent'
