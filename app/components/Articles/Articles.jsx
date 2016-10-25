/**
 * Created by chenjianhui on 16/10/24.
 */
import React,{Component} from 'react';
import {Spin,Icon,Card} from 'antd';
import Article from '../comm/Article'


class Articles extends Component{
    constructor(){
        super();
    }
    
    render(){
        const renderNews = ()=>{
            if(this.props.articles){
                return this.props.articles.map((item)=>(<Article article={item}/>))
            }else{
                return <Spin />
            }
        }

        return <div>
                {renderNews()}
               </div>
    }
}


export default Articles;