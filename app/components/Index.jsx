import React, { Component, PropTypes } from 'react';
import News from './Index/News';
import MainLayout from '../layouts/MainLayout/MainLayout';
import {IndexService} from '../services/IndexService'
import HotArticles from './Index/HotArticles'

class Index extends Component{
    constructor(props) {
        super(props);
        let {location} = props;
        this.state = {
            location: location,
            newList: [],
            hotArticles:[]
        }
    }

    componentDidMount(){
        IndexService.getAll()
            .then(({jsonResult})=>{
                let {newList,hotArticles} = jsonResult.data;
                this.setState({
                    newList:newList,
                    hotArticles:hotArticles
                })
            })
    }

    render(){
        return (
            <MainLayout>
                <News newlist={{newsList:this.state.newList}} />
                <HotArticles hotlist={this.state.hotArticles}/>
            </MainLayout>
        );
    }
}

Index.propTypes = {
};

export default Index;
