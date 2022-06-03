import React from 'react'
import appCore from '../../appCore'
import Tweet from '../../library/models/Tweet'
import randomColor from '../../library/randomColor'

export default function MainPage(): React.ReactElement {
  const [newTweetContent, setNewTweetContent] = React.useState('')
  const [tweets, setTweets] = React.useState([])

  React.useEffect((): void => {
    appCore.api.getTweets().then(setTweets)
  }, [])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTweetContent(event.target.value)
  }

  const handleNewTweet = async (): Promise<void> => {
    const newTweet = await appCore.api.createTweet(newTweetContent)

    setTweets((tweets: Tweet[]): Tweet[] => {
      tweets.unshift(newTweet)
      return [...tweets]
    })

    setNewTweetContent('')
  }

  const handleRetweet = async (tweet: Tweet): Promise<void> => {
    const newTweet = await appCore.api.createTweet(null, tweet.id)

    tweet.retweets = tweet.retweets + 1
    tweet.retweeted = true

    setTweets((tweets: Tweet[]): Tweet[] => {
      tweets.unshift(newTweet)
      return [...tweets]
    })
  }

  const handleLogOut = (): void => appCore.logOut()

  const handleDeleteTweet = async (tweet: Tweet): Promise<void> => {
    await appCore.api.destroyTweet(tweet.id)

    setTweets((tweets: Tweet[]): Tweet[] => {
      const index = tweets.indexOf(tweet)
      tweets.splice(index, 1)

      return [...tweets]
    })
  }

  const handleLike = async (tweet: Tweet): Promise<void> => {
    await appCore.api.likeTweet(tweet.id)

    tweet.liked = true
    tweet.likes = tweet.likes + 1

    setTweets([...tweets])
  }

  const handleUnlike = async (tweet: Tweet): Promise<void> => {
    await appCore.api.unlikeTweet(tweet.id)

    tweet.liked = false
    tweet.likes = tweet.likes - 1

    setTweets([...tweets])
  }

  const renderTweets = (): React.ReactNode => {
    return tweets.map((tweet: Tweet): React.ReactNode => {
      return (
        <div className="tweet" key={tweet.id}>
          <div className="top">
            <div className="left">
              <div className="circle" style={{ backgroundColor: randomColor(tweet.user.id) }}></div>
              <span>{tweet.user.name}</span>
            </div>
            <div className="right">{tweet.user.id === appCore.currentUser.id ? <button onClick={handleDeleteTweet.bind(this, tweet)}>Delete</button> : null}</div>
          </div>
          <div className="middle">
            <span className="content">{tweet.content}</span>
            {tweet.quotedTweet ? (
              <div className="quoted">
                <div className="top">
                  <div className="left">
                    <div className="circle" style={{ backgroundColor: randomColor(tweet.quotedTweet.user.id) }}></div>
                    <span>{tweet.quotedTweet.user.name}</span>
                  </div>
                </div>
                <span className="content">{tweet.quotedTweet.content}</span>
              </div>
            ) : null}
          </div>
          <div className="bottom">
            <button onClick={handleRetweet.bind(this, tweet)} disabled={tweet.user.id === appCore.currentUser.id || tweet.retweeted}>
              {tweet.retweets} Retweet
            </button>
            {tweet.liked ? (
              <button onClick={handleUnlike.bind(this, tweet)}>{tweet.likes} Unlike</button>
            ) : (
              <button onClick={handleLike.bind(this, tweet)}>{tweet.likes} Like</button>
            )}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="main-page">
      <div className="top-bar">
        <div className="left">
          <div className="circle" style={{ backgroundColor: randomColor(appCore.currentUser.id) }}></div>
          <span>{appCore.currentUser.name}</span>
        </div>
        <div className="right">
          <button onClick={handleLogOut}>Log out</button>
        </div>
      </div>

      <div className="new-form">
        <h2>What's in your mind?</h2>
        <input type="text" name="content" value={newTweetContent} onChange={onChange}></input>
        <button onClick={handleNewTweet}>Publish</button>
      </div>

      <div className="tweets">{renderTweets()}</div>
    </div>
  )
}
