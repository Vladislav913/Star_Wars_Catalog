import {useState, useEffect, useRef} from "react";
import CardList from "./Component/CardList/CardList";
import Header from "./Component/Header/Header";
import "./App.css"

function App() {

    var isOnIOS = navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPhone/i);
var eventName = isOnIOS ? "pagehide" : "beforeunload";

const [data, setState] = useState(null)

useEffect(() => {
    alert(1)
    window.addEventListener(eventName, function (event) { 
        alert(2)
        if(!isOnIOS){
            event.returnValue = true;
            return
        }
        setState('data')
        window.event.cancelBubble = true; // Don't know if this works on iOS but it might!
        
    });
}, [eventName, isOnIOS])


const InfiniteScrollLoop = () => {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const blocks = Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      onDragStart={(e) => e.preventDefault()}
      style={{
        minWidth: '200px',
        height: '150px',
        margin: '10px',
        background: `hsl(${index * 36}, 70%, 70%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#333',
        borderRadius: '8px',
        userSelect: 'none',
      }}
    >
      Block {index + 1}
    </div>
  ));

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth / 2;

    const scroll = () => {
      if (!isPaused && !isDragging) {
        scrollContainer.scrollLeft += 1;

        if (scrollContainer.scrollLeft >= totalWidth) {
          scrollContainer.scrollLeft = 0;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = totalWidth;
        }
      }
    };

    const scrollInterval = setInterval(scroll, 1);

    return () => clearInterval(scrollInterval);
  }, [isPaused, isDragging]);


  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    updateScrollPosition(walk);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!isHovered) setIsPaused(false); 
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    updateScrollPosition(walk);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!isHovered) setIsPaused(false);
  };

  const updateScrollPosition = (walk) => {
    const newScrollLeft = scrollLeftRef.current - walk;
    const scrollContainer = scrollContainerRef.current;
    const totalWidth = scrollContainer.scrollWidth / 2;

    if (newScrollLeft <= 0) {
      scrollContainer.scrollLeft = totalWidth + newScrollLeft;
    } else if (newScrollLeft >= totalWidth) {
      scrollContainer.scrollLeft = newScrollLeft - totalWidth;
    } else {
      scrollContainer.scrollLeft = newScrollLeft;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      style={{
        display: 'flex',
        overflowX: 'hidden',
        width: '100%',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsPaused(true); 
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isDragging) setIsPaused(false); 
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {blocks}
      {blocks}
    </div>
  );
};


    return (
        <div className="App">
            {isOnIOS}
            {eventName}
            {data}
            <Header/>
            <CardList/>
            <InfiniteScrollLoop />
        </div>
    );
}

export default App;
