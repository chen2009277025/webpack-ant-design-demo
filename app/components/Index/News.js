import React,{Component} from 'react';
import {Spin,Icon,Card} from 'antd';

// class News extends Component{
//     constructor(){
//         super();
//     }
//     render(){
//         const renderNews = ()=>{
//             if(this.props.newlist){
//                 return this.props.newlist.newsList.map((item)=>(
//                     <li key={item.id}>
//                         <a>{item.text}</a>
//                     </li>
//                 ))
//             }else{
//                 return <Spin />
//             }
//         }
//
//         return (
//             <ul>
//                 {renderNews()}
//             </ul>
//         )
//     }
// }

const News = ({newlist})=>{
    const renderNews = ()=>{
            if(newlist){
                return newlist.newsList.map((item)=>(
                    <li key={item.id} style={{padding:"5px 10px"}}>
                        <a>{item.text}</a>
                    </li>
                ))
            }else{
                return <Spin />
            }
        }

        return (
            <Card title="最新消息"  extra={<a href="#">More</a>} style={{margin:"5px"}}>
                <ul style={{listStyleType:"decimal-leading-zero"}}>
                    {renderNews()}
                </ul>
            </Card>
        )
}

export default News;