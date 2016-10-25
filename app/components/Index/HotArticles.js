/**
 * Created by chenjianhui on 16/10/24.
 */
import React,{Component} from 'react';
import {Spin,Icon,Card} from 'antd';
import Article from '../comm/Article';

class HotArticles extends Component{
    constructor(){
        super();
    }
    render(){
        const renderNews = ()=>{
            if(this.props.hotlist){
                return this.props.hotlist.map((item)=> {
                    return <Article article={item}/>
                })
            }else{
                return <Spin />
            }
        }

        return (
            <Card title="热门文章" extra={<a href="#">more</a>} style={{margin:"0 5px"}}>
                {renderNews()}
            </Card>

        )
    }
}


export default HotArticles;