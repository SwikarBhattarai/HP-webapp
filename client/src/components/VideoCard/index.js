import React, { Component } from 'react';
import VideoPlayer from 'react-video-js-player';
 
class VideoCard extends Component {
    player = {}
    state = {
        video: {
            src: "",
            poster: "http://www.example.com/path/to/video_poster.jpg"
        }
    }
 
    onPlayerReady(player){
        console.log("Player is ready: ", player);
        if(this.props.preload){
            this.player = player;
            player.reload()
            // console.log('load', player.currentSrc())
            // this.setState({
            //     video:{
            //         src:player.currentSrc()
            //     }
            // })

        }
      
    
    }
 
    onVideoPlay(duration){
        console.log("Video played at: ", duration);
    }
 
    onVideoPause(duration){
        console.log("Video paused at: ", duration);
    }
 
    onVideoTimeUpdate(duration){
        console.log("Time updated: ", duration);
    }
 
    onVideoSeeking(duration){
        console.log("Video seeking: ", duration);
    }
 
    onVideoSeeked(from, to){
        console.log(`Video seeked from ${from} to ${to}`);
    }
 
    onVideoEnd(){
        console.log("Video ended");
    }
    render() {
        return (
            <div>
                <VideoPlayer
                    controls={true}
                    src={this.props.src}
                    load={this.props.preload}
                    poster={this.state.video.poster}
                    width="800"
                    height="420"
                    onReady={this.onPlayerReady.bind(this)}
                    onPlay={this.onVideoPlay.bind(this)}
                    onPause={this.onVideoPause.bind(this)}
                    onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                    onSeeking={this.onVideoSeeking.bind(this)}
                    onSeeked={this.onVideoSeeked.bind(this)}
                    onEnd={this.onVideoEnd.bind(this)}
                />
            </div>
        );
    }
}
export default VideoCard;