import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import VideoDetail from './components/Video_detail';
import SearchBar from './components/Search_Bar';
import VideoList from './components/Video_list';

const API_KEY = 'AIzaSyB5Oi9WHUzazuwMAlBWorN11YVsh7RxVz0'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            videos: [],
            selectedVideo:null
        }

        this.videoSearch('surfboards')
    }

    onVideoSelect = selectedVideo => {
        this.setState ({ selectedVideo })
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term:term
        }, (videos) => {
            this.setState({ 
                videos:videos,
                selectedVideo: videos[0] 
            })
        });
    }

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

        return(
            <div>

                <SearchBar  onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                onVideoSelect= {this.onVideoSelect} 
                videos={this.state.videos}/>
                
            </div>
        )    
    };
}
    
ReactDOM.render(<App />,
    document.getElementById('container'))     