import { Post } from '../utils/types';

function sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function fetchPosts(): Promise<any | Error> {
    // TODO The following line can be removed
    await sleep(1000);
    const res = await fetch(
        'https://upply-interview.herokuapp.com/'
    ).then((response) => {
        return response.json();
    }).catch((err) => {
        console.error(err);
        return new Error('Could not fetch posts');
    });
    return res;
}

function parsePosts(posts: any): Post[] {
    const fmtPosts: Post[] = [];
    for (let post of posts) {
        try {
            // TODO Hanlde cast error
            let id = Number(post.id);
            let date = new Date(post.date);
            fmtPosts.push({
                id,
                src: post.src,
                title: post.title,
                text: post.text,
                date
            });
        } catch (err) {
            console.error(err);
        }
    }
    return fmtPosts;
}

export {
    fetchPosts,
    parsePosts
}