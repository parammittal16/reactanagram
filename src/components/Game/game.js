import React, { Component } from 'react';
import Queue from './queue';
import axios from 'axios';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import logo from "../../images/iu.png";
import {connect } from 'react-redux';

class game extends Component {
    state = { 
        time: {},
        seconds: 30,
        cluster: [],
        score: 0,
        index: 0,
        moves: 0,
        flag: true
    }
    timer;
    startTimer;
    countDown;
    
    
    componentDidMount(){
        $(function () {
            $(".word").sortable();
        });   
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        
        axios.get('https://random-word-api.herokuapp.com/key').then(apiKey => {
        console.log(apiKey);
        axios.get(`https://random-word-api.herokuapp.com/word?key=${apiKey.data}&number=100` ).then(res => {
        var sortedData = this.arrangeInOrder(res.data);
        this.setState({cluster : this.prepareCluster(sortedData)});
        this.startTimer();
    })         
});

}
startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
    }
}

countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
        
        clearInterval(this.timer);
        this.end();
    }
}
secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));
    
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    
    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}
getMeaning(word)
{
    
    
}

arrangeInOrder(source)
{
    let res = [];
    source.sort(function(a, b){
        return a.length-b.length;
    });
    let len = [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5];
    res = source.filter(word => len[word.length] !== 0 && len[word.length]--);
    return res;
}

shuffle(word)
{
    let shuffled = "";
    do{
        shuffled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
    } while(shuffled === word);
    return shuffled;
}
swap(str, i, j)
{
    let res = str.split('');
    let t = res[i];
    res[i] = res[j];
    res[j] = t;
    return res.join('');
}
getMinMoves(word, shuffled)
{
    
    let q = new Queue();
    let len = word.length;
    let myWords = new Set();
    q.enqueue({first: shuffled, second: 0});
    while(!q.isEmpty())
    {
        
        let parent = q.peek();
        q.dequeue();
        if(parent.first === word)
        {
            return parent.second;
        }
        
        myWords.add(parent.first);
        
        for(let i=0; i<len; ++i)
        {
            
            for(let j=i+1; j<len; ++j)
            {
                // console.log("yha");
                let tmp = parent.first;
                tmp = this.swap(tmp, i, j);
                if(myWords.has(tmp) === false)
                {
                    q.enqueue({first: tmp, second: parent.second+1});
                }
            }
        }
    }
}
HandleEnd = (e) => {
    this.end();
}
HandleChange = (e) => {
    this.setState({moves: this.state.moves + 1});
    console.log(this.state.moves);
    var st = "";
    for(var i=0; i<document.getElementById('wordOuter').children.length; i++){
        st += document.getElementById('wordOuter').children[i].innerHTML;
    };
    if(st === this.state.cluster[this.state.index].word){
        if(this.state.cluster[this.state.index].moves >= this.state.moves){
            this.setState({score : this.state.score + 100});
            console.log(this.state.score);
            
        }
        else {
            this.setState({score : this.state.score +  (this.state.cluster[this.state.index].moves/this.state.moves) * 100});
            console.log(this.state.score);
        }
        this.setState({moves: 0});
        this.setState({score: this.state.score + 1});
        e.target.value = "";
        this.setState({index: this.state.index + 1});
    }
}
end() {
    alert();
}
prepareCluster(arr)
{
    let res = [];
    arr.map(str => res.push({
        word: str,
        // meaning: this.getMeaning(str),
        shuffled: this.shuffle(str),
        moves: str.length-1
    })
);
console.log(res);
return res;
}

render() {
    let jumbledWord = null, fl = {'display': 'inline', 'marginLeft': '1rem', 'marginRight':'1rem'};
    if(this.state.cluster.length !== 0 && this.state.flag){
        jumbledWord = this.state.cluster[this.state.index].shuffled.split("").map((ele, index) => {
            return (<div key={index} id={index} style={fl} onPointerDown={this.HandleChange}>{ele}</div>)
        });
    }
    return (
        <div className="App">
        <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
        <a class="navbar-brand" href="#"><img style={{'height': '50px'}} src={logo}/></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
        <a class="nav-link" href="#"><span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
        </li>
        </ul>
        <span class="navbar-text">
        {this.props.name.name}
        </span>
        </div>
        </nav>
        <header className="App-header">
        <div>
        <h2>Time - {this.state.time.m} min : {this.state.time.s} sec</h2>
        <h2>Score - {this.state.score}</h2>
        </div>
        <div style={{'fontSize': '9rem'}} class="word" id="wordOuter">
        {jumbledWord}
        </div>
        <button onClick={this.HandleEnd}>END GAME</button>
        </header>
        </div>
    )
}
}

const mapStateToProps = state => {
  console.log(state);
  return {
    name: state.name.name
  }
}

export default connect(mapStateToProps, null)(game);