import React, { Component, ChangeEvent } from 'react';
import {
    fetchPosts,
    parsePosts
} from '../network/requests';
import { Post } from '../utils/types';
import Loader from '../components/Loader';
import Article from '../components/Article';
import WordingConstant from '../utils/wording.json';

const Wording = WordingConstant.Blog;

type IProps = {};

interface IState {
    filter: string;
    loading: boolean;
    posts: Post[];
    sort: boolean;
}

class Blog extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            filter: '',
            loading: true,
            posts: null,
            sort: false
        };
        this.onFilterInputChange = this.onFilterInputChange.bind(this);
        this.onSortToggle = this.onSortToggle.bind(this);
    }
    componentDidMount() {
        this.fetchPosts();
    }
    async fetchPosts() {
        this.setState({ loading: true });
        const posts = await fetchPosts();
        let nextState: any = { loading: false };
        if (!(posts instanceof Error)) nextState.posts = parsePosts(posts); 
        this.setState({ ...nextState });
    }
    onFilterInputChange(e: ChangeEvent<HTMLInputElement>) {
        let nextFilter: string = '';
        try {
            nextFilter = e.target.value;
        } catch (err) {
            console.error(err);
        }
        this.setState({ filter: nextFilter });
    }
    onSortToggle() {
        const { sort } = this.state;
        this.setState({ sort: !sort });
    }
    render() {
        const { filter, loading, posts, sort } = this.state;
        return (
            <div>
                <label>{Wording.nameFilter}</label>
                <input
                    type="text"
                    name="filter"
                    onChange={this.onFilterInputChange}
                />
                <br/>
                <input
                    type="submit"
                    value={sort ? 'Ascending' : 'Descending'}
                    onClick={this.onSortToggle}
                />
                {loading && (<Loader/>)}
                {!!posts && posts.filter((post: Post) => {
                    return (filter === '') || post.title.includes(filter)
                }).sort((a: Post, b: Post) => {
                    if (a.title > b.title) {
                        return (sort) ? 1 : -1;
                    } else if (a.title < b.title) {
                        return (sort) ? 1 : -1;
                    } else {
                        return 0;
                    }
                    return 0;
                }).map(
                    (post: Post, i) => <Article key={i} data={post}/>
                )}
            </div>
        );
    }
}

export default Blog;