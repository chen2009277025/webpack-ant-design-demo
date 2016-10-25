import React,{Component} from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Articles from './Articles/Articles'
import {BlogService} from "../services/blogService"

class Blog extends Component{

    constructor(props) {
        super(props);
        let {location} = props;
        this.state = {
            location: location,
            articles: []
        }
    }

    componentDidMount(){
        BlogService.getAll().then(({jsonResult})=>{
            this.setState({
                articles: jsonResult.data
            })
        })
    }

    render(){
        return (
            <MainLayout>
                <Articles articles={this.state.articles} />
            </MainLayout>
        )
    }
}

export default Blog;