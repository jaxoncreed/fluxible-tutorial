var React = require('react');
var connectToStores = require('fluxible/addons/connectToStores');
var FeedStore = require('../stores/FeedStore');

var Feed = React.createClass({
    render() {
        return (
            <div>
                <h2>Your Constant Feed of Content</h2>
                {
                    this.props.posts.map(function(post) {
                        var content;
                        if (post.type === "text") {
                            content = (
                                <span>
                                    <p>{post.message}</p>
                                </span>
                            )
                        } else if (post.type === "image") {
                            content = (
                                <span>
                                    <img src={post.url} />
                                    <p>{post.message}</p>
                                </span>
                            )
                        }
                        return (
                            <span>
                                <hr />
                                <p><strong>Post by: {post.user}</strong></p>
                                {content}
                            </span>
                        )
                    })
                }
            </div>
        );
    }
});

module.exports = connectToStores(
    Feed,
    [FeedStore],
    {
        FeedStore: function (store) {
            return {
                posts: store.getPosts()
            };
        },
    }
);