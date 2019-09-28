import React from 'react';
import Button from '@material-ui/core/Button';
import { app } from '../../firebase'
import './Home.css';
import logo from './logo.jpg';
import { BubblesComponent } from '../Bubbles/Bubbles';
import { Link } from 'react-router-dom'

const propTypes = {}
const defaultProps = {}

export class HomeComponent extends React.Component {
    state = {
        language: "en",
        tags: {},
        redirect: false,
        selsctedTags: []
    }

    constructor(props) {
        super(props);
        const firebaseRows = app.firestore().collection('tags');
        firebaseRows.onSnapshot(snapshot => {
            const res = snapshot.docs.map(d => d.data())[0];
            if (this.state.language === "en") {
                const tags = res.en.map((d) => {
                    return ({ label: d, state: false })
                })
                this.setState({ tags: tags });
            } else if (this.state.language === "ru") {
                const tags = res.ru.map((d) => {
                    return ({ label: d, state: false })
                })
                this.setState({ tags: tags });
            }
        })
    }

    componentDidMount() {

    }

    getLogoText = () => {
        if (this.state.language === "en") {
            return ('Choose the most interesrring place you want to visit:');
        } else if (this.state.language === "ru") {
            return ('Выберите места, которые вы хотите посетить:');
        }
    }

    resetTags = () => {
        let data = this.state.tags;
        data.map((d) => {
            d.state = false;
            return (d);
        })
        this.setState({ tags: data });
    }

    sendTagsToMap = () => {
        let selectedTags = [];
        this.state.tags.forEach((d) => {
            if (d.state === true) {
                selectedTags.push(d.label);
            }
        });
        this.setState({ selsctedTags: selectedTags });
    }

    updateTagsState = (label) => {
        let data = this.state.tags;
        let selectedTags = [];

        data.map((d) => {
            if (d.label === label) {
                d.state = d.state ? false : true;
                d.color = d.state ? 'lightgreen' : 'lightblue';
            }
            return (d);
        });

        this.state.tags.forEach((d) => {
            if (d.state === true) {
                selectedTags.push(d.label);
            }
        });

        this.setState({ tags: data, selectedTags: selectedTags });
    }

    render() {
        const { tags } = this.state;
        return (
            <div className="home__wrap">
                <div className="home__language">

                </div>
                <div className="home__logo">
                    <div className="home__logoImgWrap"><img src={logo} alt={"logo"} className="home_logoImg" /></div>
                    <div className="home__logoText">{this.getLogoText()} </div>
                </div>
                <div className="home__tags">
                    <BubblesComponent tags={tags} tagStateCallback={this.updateTagsState}> </BubblesComponent>
                </div>
                <div className="home__buttons">
                    <Button color="primary" onClick={this.resetTags}>Reset</Button>
                    <Button color="primary"><Link to={{ pathname: '/map', state: { tags: this.state.selectedTags } }}>Next</Link></Button>
                </div>
            </div>
        )
    }
}

HomeComponent.defaultProps = defaultProps
HomeComponent.displayName = 'HomeComponent'
