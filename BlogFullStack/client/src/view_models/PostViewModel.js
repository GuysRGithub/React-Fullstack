import {getSrcFromPostContent, removePostImageFromPostContent} from "../helpers/data_process_helper.ts";
class PostViewModel {
    constructor(post) {
        const date = new Date(parseInt(post._id.toString().substring(0, 8), 16) * 1000);
        this._id = post._id;
        this.title = post.title;
        this.authorId = post.author;
        this.contentText = removePostImageFromPostContent(post.content);
        this.content = post.content;
        this.src = getSrcFromPostContent(post.content);
        // noinspection JSCheckFunctionSignatures
        this.createdAt = date.toString('dd MMM yyyy')
    }
}

export default PostViewModel