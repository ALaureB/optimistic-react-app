import React from "react";
import { Tweet } from "./Tweet";

const shouldFail = id => [2].includes(id);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [
        {
          id: 1,
          likes: 0,
          username: "Lifen",
          content: "Tweet like should success"
        },
        {
          id: 2,
          likes: 3,
          username: "Lifen",
          content: "Tweet like should fail"
        }
      ],
      likedTweets: [2],
      fetchStatus: ""
    };
  }

  likeTweetRequest(tweetId, like) {
    this.setState({
      fetchStatus: `HTTP /like_tweet/${tweetId}?like=${like} (begin)`
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldSucceed = !shouldFail(tweetId);

        this.setState({
          fetchStatus: `HTTP /like_tweet/${tweetId}?like=${like} (${
            shouldSucceed ? "success" : "failure"
          })`
        });
        shouldSucceed ? resolve() : reject();
      }, 1500);
    });
  }

  render() {
    const { likedTweets, fetchStatus } = this.state;
    return (
      <div>
        <h2 className="text-center mb-4">
          Simulating an API call (with a Promise)
        </h2>
        <div className="container">
          <div className="list-group">
            {this.state.tweets.map(tweet => (
              <Tweet
                key={tweet.id}
                tweet={tweet}
                isLiked={likedTweets.includes(tweet.id)}
                onClickLike={tweetId => this.likeTweetRequest(tweetId, true)}
              />
            ))}
          </div>
          <div className="text-center mt-4">{fetchStatus}</div>
        </div>
      </div>
    );
  }
}

export default Container;
