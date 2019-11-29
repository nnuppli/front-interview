import React, { Component } from 'react';
import { Post } from '../utils/types';
import WordingConstant from '../utils/wording.json';

const Wording = WordingConstant.Article;

interface IProps {
    data: Post;
}

interface IState {
    // TODO Meant for caching purposes
    //image: any | null;
}

class Article extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            //image: null
        }
    }
    render() {
        const { data } = this.props
        const {
            src,
            title,
            text,
            date
        } = data;
        return (
            <div>
                <h3>{title}</h3>
                <span>{date.toLocaleString()}</span>
                <p>{text}</p>
                <img src={src}/>
            </div>
        );
    }
}

export default Article;