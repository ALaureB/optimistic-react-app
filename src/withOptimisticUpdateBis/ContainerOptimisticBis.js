import React from "react";
import { TweetOptimisticBis } from "./TweetOptimisticBis";

const shouldFail = id => [2].includes(id);

class ContainerOptimisticBis extends React.Component {
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
      fetchStatus: "no call",
      stateChange: ""
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

  onClickLike = tweetId => {
    const isLiked = this.state.likedTweets.includes(tweetId);
    this.setState(this.setTweetLiked(tweetId, !isLiked));
    this.likeTweetRequest(tweetId, true)
      .then(() => {
        this.setState({ stateChange: "UI updated" });
      })
      .catch(() => {
        this.setState({ stateChange: "UI updated" });
        this.setState(this.setTweetLiked(tweetId, isLiked));
      });
  };

  setTweetLiked(tweetId, newLiked) {
    return state => {
      return {
        tweets: state.tweets.map(
          tweet =>
            tweet.id === tweetId
              ? { ...tweet, likes: tweet.likes + (!newLiked ? -1 : 1) }
              : tweet
        ),
        likedTweets: !newLiked
          ? state.likedTweets.filter(id => id !== tweetId)
          : [...state.likedTweets, tweetId]
      };
    };
  }

  render() {
    const { likedTweets, fetchStatus, stateChange } = this.state;
    return (
      <div>
        <h2 className="text-center  mb-4">
          In case failure, getting back to precedent state / UI
        </h2>
        <div className="container">
          <div className="list-group">
            {this.state.tweets.map(tweet => (
              <TweetOptimisticBis
                key={tweet.id}
                tweet={tweet}
                isLiked={likedTweets.includes(tweet.id)}
                onClickLike={this.onClickLike}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <p>API call status : {fetchStatus}</p>
            <p>{stateChange}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ContainerOptimisticBis;
