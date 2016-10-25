/**
 * Created by chenjianhui on 16/10/24.
 */
import React from 'react';

const Article = ({article})=>{
    return <article key={article.id} style={{position:"relative",width:"100%",minHeight:"120px"}}>
        <img src={article.img} style={{position:"absolute"}}/>
        <div style={{marginLeft:"180px"}}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
        </div>
    </article>
}

export default Article;
