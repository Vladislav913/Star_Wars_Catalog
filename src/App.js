import {useEffect} from "react";
import CardList from "./Component/CardList/CardList";
import Header from "./Component/Header/Header";
import "./App.css"

function App() {

    var isOnIOS = navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPhone/i);
var eventName = isOnIOS ? "pagehide" : "beforeunload";

useEffect(() => {
    alert(1)
    window.addEventListener(eventName, function (event) { 
        alert(2)
        if(!isOnIOS){
            event.returnValue = true;
            return
        }
        window.event.cancelBubble = true; // Don't know if this works on iOS but it might!
        
    });
}, [eventName, isOnIOS])


    return (
        <div className="App">
            {isOnIOS}
            {eventName}
            <Header/>
            <CardList/>
        </div>
    );
}

export default App;
